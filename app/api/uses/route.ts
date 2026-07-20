export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;

  if (apiUrl) {
    try {
    //   const res = await fetch(`${apiUrl}/cv`, { next: { revalidate: 3600 } });
    //   if (res.ok) {
    //     const raw = await res.json();
    //     const data: PortfolioData = {
    //       seo: raw.seo,
    //     };
    //     return Response.json(data);
    //   }
        const data = {
            "Desk": [
                {
                    "label": "Lenovo ThinkPad T560",
                    "description": "My laptop",
                    "href": "https://amzn.eu/d/gzeiIK2"
                },
                {
                    "label": "Herman Miller Sayl Chair",
                    "description": {"en": "I sit all day, so I might as well get a good chair.", "fr": "Je passe mes journées assis, autant avoir une bonne chaise."},
                    "href": "https://store.hermanmiller.com/home-office-chairs/sayl-chair/2294.html"
                }
            ],
            "OS": [
                {
                    "label": "Windows",
                    "description": {"en": "Basic!", "fr": "Basique !"},
                    "href": "https://www.microsoft.com/fr-fr/windows?r=1"
                },
                {
                    "label": "NixOS",
                    "description": {"en": "My favorite linux distribution", "fr": "Ma distribution linux préférée"},
                    "href": "https://nixos.org/"
                }
            ],
            "Coding": [
                {
                    "label": "VSCode",
                    "description": {"en": "I moved to VSCode like everybody else.", "fr": "Je suis passé à VSCode comme tout le monde."},
                    "href": "https://code.visualstudio.com"
                }
            ],
            "Apps": [
                {
                    "label": "Figma",
                    "description": {"en": "I never thought something would replace the Adobe suite for me. Figma did.", "fr": "Je ne pensais pas qu'un outil pourrait remplacer le suite Adobe pour moi. Figma l'a fait."},
                    "href": "https://figma.com"
                },
                {
                    "label": "Linear",
                    "description": {"en": "A totally gorgeous issue tracker. Jira no more.", "fr": "Un suivi des problèmes totalement magnifique. Plus de Jira."},
                    "href": "https://linear.app/"
                },
                {
                    "label": "Obsidian",
                    "description": {"en": "My personal note taking with all the notes from all my projects.", "fr": "Ma prise de notes personnelle avec toutes les notes de tous mes projets."},
                    "href": "https://obsidian.md/"
                }
            ],
            "Services": [
                {
                    "label": "Cloudflare",
                    "description": {"en": "The DNS service I use with all my domains. Amazing product.", "fr": "Le service DNS que j'utilise avec tous mes domaines. Produit incroyable."},
                    "href": "https://www.cloudflare.com"
                },
                {
                    "label": "Firebase",
                    "description": {"en": "A no-brainer database and auth solution for side projects.", "fr": "Une solution de base de données et d'authentification évidente pour les projets annexes."},
                    "href": "https://firebase.google.com"
                },
                {
                    "label": "Google Domains",
                    "description": {"en": "I buy and renew all my domains here.", "fr": "J'achète et renouvelle tous mes domaines ici."},
                    "href": "https://domains.google"
                },
                {
                    "label": "Vercel",
                    "description": {"en": "Here is where I host all my websites. By far the best developer experience.", "fr": "C'est ici que j'héberge tous mes sites web. De loin la meilleure expérience de développeur."},
                    "href": "https://vercel.com"
                }
            ]
        }
        return Response.json(data);
    } catch {
      /* fall through */
    }
  }
}