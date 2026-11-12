// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Defina SITE_URL (ex.: https://www.drapaulamoura.com.br) no build de produção
// para gerar canonical, sitemap e links absolutos de compartilhamento.
const SITE_URL = process.env.SITE_URL || undefined;

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: SITE_URL ? [sitemap({ filter: (page) => !page.includes('/404') })] : [],
});
