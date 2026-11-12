import type { APIRoute } from 'astro';
import { site, reviewMode } from '../config/site';

// Na versão de revisão o site pede para não ser indexado.
export const GET: APIRoute = () => {
  const lines = reviewMode
    ? ['User-agent: *', 'Disallow: /']
    : ['User-agent: *', 'Allow: /', ...(site.url ? [`Sitemap: ${site.url}/sitemap-index.xml`] : [])];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
