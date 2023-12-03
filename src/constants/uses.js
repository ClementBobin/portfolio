// Array of categories with associated items
const categories = [
  {
    name: 'Desk',
    items: [
      // Items related to the desk category
      {
        title: 'Lenovo ThinkPad T560',
        description:
          'My laptop',
        url: 'https://amzn.eu/d/gzeiIK2',
      },
      {
        title: 'Herman Miller Sayl Chair',
        description: 'I sit all day, so I might as well get a good chair.',
        url: 'https://store.hermanmiller.com/home-office-chairs/sayl-chair/2294.html',
      },
    ],
  },
  {
    name: 'OS',
    items: [
      // Items related to the OS category
      {
        title: 'Windows',
        description:
          'Basic!',
        url: 'https://www.microsoft.com/fr-fr/windows?r=1',
      },
      {
        title: 'NixOS',
        description:
          'My favorite linux distribution',
        url: 'https://nixos.org/',
      },
    ],
  },
  {
    name: 'Coding',
    items: [
      // Items related to the Coding category
      {
        title: 'VSCode',
        description:
          'I moved to VSCode like everybody else.',
        url: 'https://code.visualstudio.com',
      },
      {
        title: '2077 theme',
        description:
          'This is the theme I use in vscode.',
        url: 'https://marketplace.visualstudio.com/items?itemName=Endormi.2077-theme',
      },
    ],
  },
  {
    name: 'Apps',
    items: [
      // Items related to the Apps category
      {
        title: '1Password',
        description: 'The first thing I install on any new device.',
        url: 'https://1password.com',
      },
      {
        title: 'Figma',
        description:
          'I never thought something would replace the Adobe suite for me. Figma did.',
        url: 'https://figma.com',
      },
      {
        title: 'Grammarly',
        description:
          'A must-have tool for non-native English speakers like me.',
        url: 'https://grammarly.com/',
      },
      {
        title: 'Linear',
        description: 'A totally gorgeous issue tracker. Jira no more.',
        url: 'https://linear.app/',
      },
      {
        title: 'Obsidian',
        description: 'My personal note taking with all the notes from all my projects.',
        url: 'https://obsidian.md/',
      },
      {
        title: 'Portmaster',
        description:
          'Wonderful SPN and Firewall app that I use to access content from other countries.',
        url: 'https://safing.io/',
      },
      {
        title: 'Superhuman',
        description:
          'I never thought I would pay to use email until I found this.',
        url: 'https://superhuman.com/',
      },
    ],
  },
  {
    name: 'Services',
    items: [
      // Items related to the Services category
      {
        title: 'Cloudflare',
        description:
          'The DNS service I use with all my domains. Amazing product.',
        url: 'https://www.cloudflare.com',
      },
      {
        title: 'Firebase',
        description:
          'A no-brainer database and auth solution for side projects.',
        url: 'https://firebase.google.com',
      },
      {
        title: 'Google Domains',
        description: 'I buy and renew all my domains here.',
        url: 'https://domains.google',
      },
      {
        title: 'Vercel',
        description:
          'Here is where I host all my websites. By far the best developer experience.',
        url: 'https://vercel.com',
      },
    ],
  },
  {
    name: 'Audio',
    items: [
      // Items related to the Audio category
      {
        title: 'JBL Tune 230NC TWS',
        description: 'The best portable Headphones, immerse in crystal-clear audio, featuring powerful sound, active noise cancellation, and touch controls for seamless wireless experience.',
        url: 'https://a.co/d/fjHRCEd',
      },
      {
        title: 'Razer BlackShark V2 Pro',
        description:
          'By far the best headphones I ever had. Premium quality, solid build.',
        url: 'https://amzn.eu/d/88Fxta9',
      },
    ],
  },
  {
    name: 'Finance',
    items: [
      // Items related to the Finance category
      {
        title: 'Betterment',
        description:
          'My favorite investing platform, which consistently returns ~16% earnings.',
        url: 'http://betterment.com/',
      },
      {
        title: 'Mint',
        description:
          'All my accounts are connected in one place, so I can see a big picture of everything.',
        url: 'https://mint.com',
      },
      {
        title: 'Coinbase',
        description:
          "I'm not obsessed with crypto, but I still have some small investments there. My portfolio is made of ETH, BTC, SOL, DOGE, and SHIB.",
        url: 'https://coinbase.com/',
      },
    ],
  },
  {
    name: 'Reading',
    items: [
      // Items related to the Reading category
      {
        title: 'Audible',
        description:
          'The perfect choice to listen to a book while running outside.',
        url: 'https://www.audible.com/',
      },
    ],
  },
]

export default categories
