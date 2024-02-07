// Array of items representing projects organized by year
const items = [
  {
    year: '2023',
    projects: [
      // Project details for the year 2023
      {
        title: 'Snippets repo',
        description: 'My custom repo snippets for vscode',
        url: 'https://github.com/ClementBobin/snippets',
        active: true,
      },
      {
        title: 'noteMarkdown',
        description: 'A website to be able to create, edit and remove markdown note',
        url: 'https://github.com/ClementBobin/noteMarkdown',
        active: true,
        icon: 'dark',
        stats: '15k user',
      },
      {
        title: 'Obsidian repo',
        description: 'My TechNote Repo',
        url: 'https://github.com/ClementBobin/obsidian-markdown-SIO2023-2024',
        active: true,
      },
      {
        title: 'Portfolio',
        description: 'My portfolio',
        url: 'https://github.com/ClementBobin/portfolio',
        active: true,
        icon: 'bug',
        stats: '',
      },
      {
        title: 'Ai image website',
        description: 'A website to be able to create and view image generate by AI',
        url: 'https://github.com/ClementBobin/ai_image_generation',
        active: true,
      },
    ],
  },
  {
    year: '2022',
    projects: [
      // Project details for the year 2022
      {
        title: 'RobotCarriste',
        description: 'My final project for college and first project ever',
        url: 'https://github.com/ClementBobin/RobotCarriste',
        icon: 'OS',
        stats: '',
      },
    ],
  },
]

export default items
