// Vercel serverless function for F-Droid API
import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { search, category, sort = 'latest', page = '1', limit = '24', id } = req.query || {};

  try {
    const featuredPath = path.join(process.cwd(), 'src/data/fdroid-featured.json');
    const appsPath = path.join(process.cwd(), 'src/data/fdroid-apps.json');

    if (id) {
      if (fs.existsSync(appsPath)) {
        const allApps = JSON.parse(fs.readFileSync(appsPath, 'utf8'));
        const found = allApps.find((a: any) => a.id.toLowerCase() === String(id).toLowerCase());
        if (found) {
          return res.status(200).json(found);
        }
      }
      return res.status(404).json({ error: 'Application not found' });
    }

    if (!search && !category && fs.existsSync(featuredPath)) {
      const featured = JSON.parse(fs.readFileSync(featuredPath, 'utf8'));
      return res.status(200).json(featured);
    }

    if (fs.existsSync(appsPath)) {
      const allApps = JSON.parse(fs.readFileSync(appsPath, 'utf8'));
      let results = [...allApps];

      if (category) {
        if (category === 'games' || category === 'android-games') {
          results = results.filter((a: any) => a.isGame);
        } else if (category === 'apps' || category === 'android-apps') {
          results = results.filter((a: any) => !a.isGame);
        } else {
          results = results.filter((a: any) =>
            a.categories.some((c: string) => c.toLowerCase() === String(category).toLowerCase())
          );
        }
      }

      if (search) {
        const q = String(search).toLowerCase().trim();
        results = results.filter(
          (a: any) =>
            (a.name && a.name.toLowerCase().includes(q)) ||
            (a.summary && a.summary.toLowerCase().includes(q)) ||
            (a.id && a.id.toLowerCase().includes(q))
        );
      }

      const p = Math.max(1, parseInt(String(page), 10) || 1);
      const l = Math.min(100, Math.max(1, parseInt(String(limit), 10) || 24));
      const total = results.length;
      const totalPages = Math.ceil(total / l);
      const start = (p - 1) * l;

      return res.status(200).json({
        total,
        page: p,
        limit: l,
        totalPages,
        apps: results.slice(start, start + l),
      });
    }

    return res.status(200).json({ total: 0, apps: [] });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
