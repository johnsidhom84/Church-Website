import express from 'express';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// Portable __dirname equivalent for ESM/CJS compatibility
const getDirname = () => {
  try {
    return path.dirname(fileURLToPath(import.meta.url));
  } catch {
    return __dirname;
  }
};

const _dirname = getDirname();

// Root health checks for Cloud Run - Must be FIRST
app.all('/healthz', (req, res) => res.status(200).send('OK'));
app.head('/', (req, res) => res.status(200).end());
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// In-memory cache for YouTube data
let youtubeCache: { data: any, timestamp: number } | null = null;
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

const FALLBACK_VIDEO_ID = 'R-2C2-dG-xY'; // Known recent video from St. Mark Shoubra

// YouTube Live Status Route - Using RSS Feed and Page Scraping for reliability
app.get('/api/youtube/live', async (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=60'); // Allow 1m browser cache
  
  // Check memory cache first
  if (youtubeCache && (Date.now() - youtubeCache.timestamp < CACHE_TTL)) {
    return res.json(youtubeCache.data);
  }

  const channelId = 'UCmx-ea92VQN0Sv9haqEpceQ';
  const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';

  try {
    let result = null;
    
    // 1. Check if actually live first - faster check
    const livePageUrl = `https://www.youtube.com/channel/${channelId}/live`;
    const liveResponse = await fetch(livePageUrl, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(3000) // Shorter timeout for faster response
    });
    
    if (liveResponse.ok) {
      const liveHtml = await liveResponse.text();
      const isLive = liveHtml.includes('"isLive":true') && !liveHtml.includes('"isUpcoming":true');
      
      if (isLive) {
        const match = liveHtml.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
        if (match) {
          result = {
            videoId: match[1],
            isLive: true,
            title: 'بث مباشر من كنيسة مارمرقس بشبرا',
            status: 'بث مباشر الآن'
          };
        }
      }
    }
    
    if (!result) {
      // 2. Get latest upload
      const videosPageUrl = `https://www.youtube.com/channel/${channelId}/videos`;
      const videosResponse = await fetch(videosPageUrl, {
        headers: { 'User-Agent': USER_AGENT },
        signal: AbortSignal.timeout(4000)
      });
      
      if (videosResponse.ok) {
        const videosHtml = await videosResponse.text();
        const videoIdPattern = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
        const matches = Array.from(videosHtml.matchAll(videoIdPattern));
        
        for (let i = 0; i < Math.min(matches.length, 10); i++) {
          const id = matches[i][1];
          const index = videosHtml.indexOf(`"videoId":"${id}"`);
          const context = videosHtml.substring(Math.max(0, index - 500), Math.min(videosHtml.length, index + 1500));
          
          if (!context.includes('upcomingEventData') && !context.includes('"style":"UPCOMING"')) {
            result = {
              videoId: id,
              isLive: false,
              title: 'من أرشيف الكنيسة',
              status: 'لا يوجد بث مباشر الآن'
            };
            break;
          }
        }
      }
    }

    if (!result) {
      result = {
        videoId: FALLBACK_VIDEO_ID,
        isLive: false,
        title: 'من أرشيف الكنيسة',
        status: 'لا يوجد بث مباشر الآن'
      };
    }

    youtubeCache = { data: result, timestamp: Date.now() };
    return res.json(result);
  } catch (error) {
    console.warn(`[YouTube] Error fetching live status: ${error instanceof Error ? error.message : String(error)}`);
    if (youtubeCache) return res.json(youtubeCache.data);
    return res.json({ videoId: FALLBACK_VIDEO_ID, isLive: false, status: 'لا يوجد بث مباشر الآن' });
  }
});

// Gallery API
app.get('/api/gallery', (req, res) => {
  const isBundled = fs.existsSync(path.join(_dirname, 'index.html'));
  const staticPath = isBundled ? _dirname : path.resolve(process.cwd(), 'dist');
  const galleryPath = path.join(staticPath, 'gallery');
  
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
  const isProd = process.env.NODE_ENV === 'production';
  // Check if we are running the bundled version in dist
  const isBundled = fs.existsSync(path.join(_dirname, 'index.html'));
  const staticPath = isBundled ? _dirname : path.resolve(process.cwd(), 'dist');

  console.log(`[${new Date().toISOString()}] Server env: ${process.env.NODE_ENV}, Bundled: ${isBundled}`);
  console.log(`[${new Date().toISOString()}] Root static path: ${staticPath}`);

  // Logger for assets to debug 404s
  app.use((req, res, next) => {
    if (req.url.startsWith('/images/') || req.url.startsWith('/assets/')) {
      const filePath = path.join(staticPath, req.url.split('?')[0]);
      if (!fs.existsSync(filePath)) {
        console.warn(`[ASSET 404] ${req.url} -> ${filePath}`);
      }
    }
    next();
  });

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
      if (fs.existsSync(staticPath)) {
        app.use(express.static(staticPath));
        app.get('*', (req, res) => res.sendFile(path.join(staticPath, 'index.html')));
      } else {
        console.error('No static files found and Vite failed to start.');
        process.exit(1);
      }
    }
  } else {
    console.log('Starting in production mode...');
    if (fs.existsSync(staticPath)) {
      app.use(express.static(staticPath));
      app.get('*', (req, res) => {
        const indexPath = path.join(staticPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          console.error(`Index file not found at: ${indexPath}`);
          res.status(404).send('Application assets missing.');
        }
      });
    } else {
      console.error(`CRITICAL: Static assets directory missing: ${staticPath}`);
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





