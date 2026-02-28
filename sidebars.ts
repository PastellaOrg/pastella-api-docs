import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  main: [
    // About
    {
      type: 'category',
      label: 'About',
      items: [
        'about/about-pastella',
        'about/contributing',
        'about/contributors',
        'about/community',
      ],
    },
    // Developer
    {
      type: 'category',
      label: 'Developer',
      items: [
        'developer/compiling-source',
        'developer/running-node',
        'developer/help-support',
      ],
    },
    // API
    {
      type: 'category',
      label: 'API',
      items: [
        {
          type: 'link',
          label: 'Pastellad API ↗',
          href: '/api.html',
        },
        {
          type: 'link',
          label: 'Pastella Wallet API ↗',
          href: '/wallet-api.html',
        },
      ],
    },
    // Guides
    {
      type: 'category',
      label: 'Guides',
      items: [
        {
          type: 'category',
          label: 'Wallets',
          items: [
            'guides/paper-wallet',
            'guides/cli-wallet',
            'guides/mobile-wallet',
          ],
        },
      ],
    },
    // Mining
    {
      type: 'category',
      label: 'Mining',
      items: [
        'mining/getting-started',
        'mining/solo-mining',
        'mining/sbc-mining',
        'mining/mining-pool',
      ],
    },
  ],
};

export default sidebars;
