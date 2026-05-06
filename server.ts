import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Proxy Route for Coptic Readings
  app.get('/api/katamars', async (req, res) => {
    const urls = [
      'https://api.coptic.io/api/readings?detailed=true&lang=ar'
    ];

    let lastError = null;
    for (const url of urls) {
      try {
        console.log(`Trying proxy to: ${url}`);
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          return res.json(data);
        }
        console.error(`Failed ${url}: ${response.status}`);
      } catch (error) {
        console.error(`Error ${url}:`, error);
        lastError = error;
      }
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch readings from all sources',
      details: String(lastError)
    });
  });

  // YouTube Live/Top Video Cache
  let youtubeCache: { data: any, timestamp: number } | null = null;
  let searchFallback: { data: any, timestamp: number } | null = null;
  const CACHE_TTL = 30 * 1000; // 30 seconds for live check (as in PHP)
  const SEARCH_FALLBACK_TTL = 60 * 60 * 1000; // 1 hour for expensive searches

  app.get('/api/youtube/live', async (req, res) => {
    const apiKey = process.env.YOUTUBE_API_KEY || 'AIzaSyDS5n1rigofPHyGLvCf1CpO7UVlgUceKXM';
    const channelId = 'UCmx-ea92VQN0Sv9haqEpceQ'; // Returning to PHP's channel ID

    const finalApiKey = (apiKey.includes('YOUR_') || apiKey.length < 20) 
      ? 'AIzaSyDS5n1rigofPHyGLvCf1CpO7UVlgUceKXM' 
      : apiKey;

    // Check if we have a very fresh cache (less than 30s)
    if (youtubeCache && (Date.now() - youtubeCache.timestamp < CACHE_TTL)) {
      // If the cache is live, return it.
      if (youtubeCache.data.isLive) {
        return res.json(youtubeCache.data);
      }
      // If it's not live, we might want to check RSS again frequently but avoid search.
    }

    const cleanTitle = (title: string) => {
      let t = (title || '').trim();
      t = t.replace(/^\s*(البث\s*المباشر|بث\s*مباشر)[\s:_\-–—|]*/u, '');
      return t.trim();
    };

    const isGeneric = (title: string) => {
      if (!title) return true;
      return /(البث\s*المباشر|بث\s*مباشر|كنيسة)/u.test(title);
    };

    try {
      /* ============================================================
         STEP 1 — RSS CHECK (NO QUOTA)
         ============================================================ */
      let liveIdFromRss = null;
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const rssRes = await fetch(rssUrl, { signal: AbortSignal.timeout(10000) });
        if (rssRes.ok) {
          const rssText = await rssRes.text();
          const match = rssText.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
          if (match && match[1]) {
            liveIdFromRss = match[1];
          }
        }
      } catch (rssErr) {
        console.error('RSS Feed error:', rssErr);
      }

      /* ============================================================
         STEP 2 — API CONFIRMATION (CHEAP: 1 unit)
         ============================================================ */
      if (liveIdFromRss) {
        const vUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails,status&id=${liveIdFromRss}&key=${finalApiKey}`;
        const vRes = await fetch(vUrl);
        const vData = await vRes.json();

        if (vData.items && vData.items.length > 0) {
          const item = vData.items[0];
          const isLive = item.snippet.liveBroadcastContent === 'live' || 
                        (item.liveStreamingDetails?.actualStartTime && !item.liveStreamingDetails?.actualEndTime);

          if (isLive) {
            let title = cleanTitle(item.snippet.title);
            if (isGeneric(title)) title = '';

            const result = {
              videoId: liveIdFromRss,
              title: title,
              isLive: true,
              status: 'بث مباشر الآن'
            };
            youtubeCache = { data: result, timestamp: Date.now() };
            return res.json(result);
          }
        }
      }

      /* ============================================================
         STEP 3 — SEARCH FALLBACK (EXPENSIVE: 100 units)
         ============================================================ */
      // Only do this if we don't have a recent searchFallback
      if (searchFallback && (Date.now() - searchFallback.timestamp < SEARCH_FALLBACK_TTL)) {
        return res.json(searchFallback.data);
      }

      // If we reach here, we either don't have a fallback or it's old.
      console.log('Performing expensive search fallback...');
      
      // Calculate first day of last month
      const firstDayLastMonth = new Date();
      firstDayLastMonth.setDate(1);
      firstDayLastMonth.setMonth(firstDayLastMonth.getMonth() - 1);
      const publishedAfter = firstDayLastMonth.toISOString();

      const topUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=viewCount&type=video&maxResults=10&publishedAfter=${publishedAfter}&videoEmbeddable=true&key=${finalApiKey}`;
      const topRes = await fetch(topUrl);
      const topData = await topRes.json();

      if (topData.items && topData.items.length > 0) {
        // Randomly pick one like the PHP code
        const pick = topData.items[Math.floor(Math.random() * topData.items.length)];
        let title = cleanTitle(pick.snippet.title);
        if (isGeneric(title)) title = '';

        const result = {
          videoId: pick.id.videoId,
          title: title,
          isLive: false,
          status: 'لا يوجد بث مباشر الآن'
        };
        searchFallback = { data: result, timestamp: Date.now() };
        youtubeCache = { data: result, timestamp: Date.now() };
        return res.json(result);
      }

      // If search failed or returned nothing, return absolute fallback
      const finalFallback = {
        videoId: 'K1pW99T6M-E',
        title: 'ألحان كنيسة مارمرقس بشبرا',
        isLive: false,
        status: 'لا يوجد بث مباشر حالياً'
      };
      return res.json(finalFallback);

    } catch (error) {
      console.error('YouTube API Error:', error);
      // Return dummy data instead of error to keep app running
      return res.json({
        videoId: 'K1pW99T6M-E',
        title: 'كنيسة مارمرقس بشبرا',
        isLive: false,
        status: 'خطأ في الاتصال باليوتيوب'
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
