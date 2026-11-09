// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { remarkReadingTime } from './remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  // Deployed site URL for sitemap, canonical, and RSS links.
  site: process.env.SITE_URL || 'https://jichangtuijian.pics',
  base: '/',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/blog/tags/'),
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
    }),
    // Dual Shiki themes; `defaultColor: false` emits CSS variables
    // (--shiki-light / --shiki-dark) so global.css can switch with the theme.
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
      wrap: true,
    },
  },
});
