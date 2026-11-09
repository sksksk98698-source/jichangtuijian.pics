// Site-wide settings. Edit this file to rebrand the theme — every page,
// the RSS feed, and Open Graph tags read from here.

import type { UIKey } from './i18n/en';

export const SITE = {
  /** BCP 47 language tag. */
  locale: 'zh-CN',
  /** Site URL */
  url: 'https://jichangtuijian.pics',
  /** Site name — used in the header brand, <title>, and og:site_name. */
  title: '机场pics',
  /** Default meta description for pages that don't set their own. */
  description: '机场pics (jichangtuijian.pics) - 专注高端机场评测、IPLC/IEPL专线节点实测与流媒体/AI解锁能力全方位可观测性数据分析。',
  /** Description of the RSS feed at /rss.xml. */
  rssDescription: '最新机场推荐评测、使用指南与网络加速技术精选。',
  /** Default social share image, relative to the site root (see public/). */
  ogImage: '/og.jpg',
  /** Post author, emitted in JSON-LD BlogPosting structured data. */
  author: '机场pics',
  /** Footer credit line. */
  footerText: `© ${new Date().getFullYear()} 机场pics (jichangtuijian.pics). 保留所有权利。含推广赞助链接。`,
} as const;

/** Search engine verification tokens (Google Search Console, Bing Webmaster Tools, Baidu, Shenma).
 *  Populate directly or through environment variables. If left empty, tags will not be rendered. */
export const VERIFICATION = {
  google: process.env.GOOGLE_SITE_VERIFICATION || '',
  bing: process.env.BING_SITE_VERIFICATION || '',
  baidu: process.env.BAIDU_SITE_VERIFICATION || '',
  shenma: process.env.SHENMA_SITE_VERIFICATION || '',
};

/** Icons bundled with the theme — see `src/components/SocialLinks.astro`. */
export type SocialIcon = 'github' | 'x' | 'linkedin' | 'rss' | 'email';

export interface SocialLink {
  /** Accessible name announced on the icon-only link. */
  label: string;
  /** Full URL, `mailto:` address, or site-root path (gets `base` applied). */
  href: string;
  icon: SocialIcon;
}

/** Social profiles rendered as inline SVG icons in the footer.
 *  Add or remove entries here — no template edits needed. */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'RSS Feed', href: '/rss.xml', icon: 'rss' },
];

/** Giscus — GitHub Discussions-backed comments on blog posts.
 *  See `GISCUS` below; values come from https://giscus.app. */
export interface GiscusConfig {
  /** Master switch. While `false`, no Giscus markup, CSS, or script is emitted. */
  enabled: boolean;
  /** Target repository, `owner/name`. Needs public Discussions and the
   *  giscus GitHub App installed. */
  repo: string;
  /** Repository ID from giscus.app (starts with `R_`). */
  repoId: string;
  /** Discussion category name, e.g. `Announcements`. */
  category: string;
  /** Category ID from giscus.app (starts with `DIC_`). */
  categoryId: string;
  /** How a post maps to its discussion. `pathname` is the safest default —
   *  it survives retitling, unlike `title`. */
  mapping: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
  /** Use a strict title match when looking up the discussion. */
  strict: boolean;
  /** Show the reaction bar above the comment list. */
  reactionsEnabled: boolean;
  /** Put the comment box above (`top`) or below (`bottom`) the thread. */
  inputPosition: 'top' | 'bottom';
  /** Giscus UI language, e.g. `en`, `ja`, `fr`. */
  lang: string;
  /** Giscus theme used while the site is in light mode. */
  lightTheme: string;
  /** Giscus theme used while the site is in dark mode. The widget is told to
   *  switch live when the header toggle flips. */
  darkTheme: string;
}

/** Comments are **off by default** — the theme ships no third-party JavaScript
 *  unless you ask for it. To turn them on: enable Discussions on your repo,
 *  install the giscus app (https://github.com/apps/giscus), fill in the IDs
 *  from https://giscus.app, and set `enabled: true`. */
export const GISCUS: GiscusConfig = {
  enabled: false,
  repo: '',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
  mapping: 'pathname',
  strict: true,
  reactionsEnabled: true,
  inputPosition: 'bottom',
  lang: 'en',
  // Other options include `preferred_color_scheme`, `transparent_dark`,
  // `noborder_light`, `cobalt`, or a URL to your own theme CSS.
  lightTheme: 'light',
  darkTheme: 'dark',
};

export type NavItem =
  | { href: string; label: string; labelKey?: never }
  | { href: string; labelKey: UIKey; label?: never };

/** Header navigation. `href` is relative to the site root; the configured
 *  `base` is applied automatically via `withBase()`. The bundled entries
 *  localize through the UI dictionary; give a page you add yourself a literal
 *  `label` instead — one of the two is required. */
export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/', label: '首页' },
  { href: '/works/', label: '精选推荐' },
  { href: '/brands/', label: '品牌库' },
  { href: '/free-nodes/', label: '免费节点' },
  { href: '/trial/', label: '免费试用' },
  { href: '/blacklist/', label: '跑路预警' },
  { href: '/faq/', label: '问答百科' },
  { href: '/clients/', label: '客户端' },
  { href: '/blog/', label: '专栏指南' },
  { href: '/search/', label: '搜索' },
  { href: '/about/', label: '测速准则' },
];
