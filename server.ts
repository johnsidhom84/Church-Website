import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Root health checks for Cloud Run - Must be FIRST
app.all('/healthz', (req, res) => res.status(200).send('OK'));
app.head('/', (req, res) => res.status(200).end());
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// YouTube Live Status Route - Using RSS Feed and Page Scraping for reliability
app.get('/api/youtube/live', async (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  const channelId = 'UCmx-ea92VQN0Sv9haqEpceQ';
  const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

  try {
    // 1. Check if actually live first
    const livePageUrl = `https://www.youtube.com/channel/${channelId}/live`;
    const liveResponse = await fetch(livePageUrl, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(5000)
    });
    const liveHtml = await liveResponse.text();
    const isLive = liveHtml.includes('"isLive":true') && !liveHtml.includes('"isUpcoming":true');
    
    if (isLive) {
      const match = liveHtml.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
      if (match) {
        console.log(`Live stream detected: ${match[1]}`);
        return res.json({
          videoId: match[1],
          isLive: true,
          title: 'بث مباشر من كنيسة مارمرقس بشبرا',
          status: 'بث مباشر الآن'
        });
      }
    }
    
    // 2. If not live, get latest UPLOADS (avoiding upcoming live streams)
    // We fetch the videos page to distinguish between uploads and upcoming
    const videosPageUrl = `https://www.youtube.com/channel/${channelId}/videos`;
    const videosResponse = await fetch(videosPageUrl, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(5000)
    });
    const videosHtml = await videosResponse.text();
    
    // Extract video IDs and check for upcoming status
    const videoIdPattern = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
    const matches = Array.from(videosHtml.matchAll(videoIdPattern));
    
    let latestVideoId = 'yG8g9H-q6I0'; // Deep fallback (Choir video)
    
    for (let i = 0; i < Math.min(matches.length, 10); i++) {
      const id = matches[i][1];
      const index = videosHtml.indexOf(`"videoId":"${id}"`);
      // Look at the context around this video ID (roughly one videoRenderer object)
      const context = videosHtml.substring(Math.max(0, index - 500), Math.min(videosHtml.length, index + 1500));
      
      // If it doesn't have "upcomingEventData" or "UPCOMING" badge near it, it's a past video
      if (!context.includes('upcomingEventData') && !context.includes('"style":"UPCOMING"')) {
        latestVideoId = id;
        console.log(`Latest upload found: ${id}`);
        break;
      } else {
        console.log(`Skipping upcoming video: ${id}`);
      }
    }

    // If still nothing found from scraper, try RSS as a second layer of fallback
    if (latestVideoId === 'yG8g9H-q6I0') {
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      const rssResponse = await fetch(rssUrl, { signal: AbortSignal.timeout(4000) });
      const rssText = await rssResponse.text();
      const videoIdMatches = rssText.match(/<yt:videoId>([^<]+)<\/yt:videoId>/g);
      if (videoIdMatches && videoIdMatches.length > 0) {
        // In RSS, upcoming ones are often first. We might have to guess or just pick the second if the first looks like it failed in scraper
        latestVideoId = videoIdMatches[0].replace(/<\/?yt:videoId>/g, '');
      }
    }

    return res.json({
      videoId: latestVideoId,
      isLive: false,
      title: 'من أرشيف الكنيسة',
      status: 'لا يوجد بث مباشر الآن'
    });
  } catch (error) {
    console.error('YouTube Proxy Error:', error);
    res.json({ videoId: 'yG8g9H-q6I0', isLive: false, status: 'لا يوجد بث مباشر الآن' });
  }
});

// Gallery API
app.get('/api/gallery', (req, res) => {
  const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV !== 'development';
  const galleryPath = isProd
    ? path.join(process.cwd(), 'dist', 'gallery')
    : path.join(process.cwd(), 'public', 'gallery');
  
  try {
    if (!fs.existsSync(galleryPath)) return res.json([]);
    const images = fs.readdirSync(galleryPath).filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list gallery files' });
  }
});

// Katamars Proxy
app.get('/api/katamars', async (req, res) => {
  try {
    const response = await fetch('https://api.coptic.io/api/readings?detailed=true&lang=ar', {
      signal: AbortSignal.timeout(8000)
    });
    if (response.ok) return res.json(await response.json());
    res.status(response.status).send('API Error');
  } catch (error) {
    res.status(500).send('Network Error');
  }
});

// Global Error Listeners
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Give the server a moment to log before exiting
  setTimeout(() => process.exit(1), 100);
});

async function setupApp() {
  // Force production mode if not explicitly set to development
  const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV !== 'development';
  process.env.NODE_ENV = isProd ? 'production' : 'development';
  const distPath = path.resolve(process.cwd(), 'dist');

  console.log(`[${new Date().toISOString()}] Server environment: ${process.env.NODE_ENV || 'undefined'} (isProd: ${isProd})`);
  console.log(`[${new Date().toISOString()}] Dist path: ${distPath}`);

  if (!isProd) {
    console.log('Starting in development mode with Vite...');
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.error('Failed to load Vite middleware:', e);
      // Fallback: search for dist anyway
      if (fs.existsSync(distPath)) {
        app.use(express.static(distPath));
        app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
      } else {
        process.exit(1);
      }
    }
  } else {
    console.log('Starting in production mode...');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        const indexPath = path.join(distPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          console.error(`Index file not found at: ${indexPath}`);
          res.status(404).send('Application assets missing.');
        }
      });
    } else {
      console.error(`CRITICAL: Static assets directory missing: ${distPath}`);
      // Handle the error by serving a simple message for any request
      app.get('*', (req, res) => {
        res.status(500).send('Server configuration error: Static assets missing.');
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[${new Date().toISOString()}] Server listening on http://0.0.0.0:${PORT}`);
  });
}

setupApp().catch(err => {
  console.error('SERVER SETUP FATAL ERROR:', err);
  process.exit(1);
});





