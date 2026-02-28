import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Pastella Daemon RPC API',
  tagline: 'Complete REST and JSON-RPC API documentation',
  favicon: 'logo.png',

  future: {
    v4: true,
  },

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'pastella',
  projectName: 'pastella-api-docs',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          id: 'default',
          path: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/PastellaOrg/pastella-api-docs/tree/main/',
          sidebarCollapsible: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Pastella Daemon API',
      logo: {
        alt: 'Pastella Logo',
        src: 'logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'about/about-pastella',
          position: 'left',
          label: 'Documentation',
        },
        {href: '/api.html', label: 'API Reference', position: 'left'},
        {
          href: 'https://github.com/PastellaOrg/pastella-api-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/about/about-pastella',
            },
            {
              label: 'API Reference',
              href: '/api.html',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/PastellaOrg/pastella-api-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Pastella Development Team.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
