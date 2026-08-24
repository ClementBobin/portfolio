import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Bob1",
  description:
    "Politique de confidentialité de l'application Bob1 — coordination des arbitres et du staff pour le Club Bob1.",
};

const sections = [
  {
    id: "collecte",
    title: "Données collectées",
    content: [
      {
        subtitle: "Informations de compte",
        text: "Lors de votre inscription, nous collectons votre nom, prénom, adresse e-mail et votre rôle au sein du club (arbitre, coach, staff administratif). Ces informations sont nécessaires pour vous identifier et vous attribuer les bons accès.",
      },
      {
        subtitle: "Données de planification",
        text: "L'application enregistre vos disponibilités, vos affectations aux matchs et vos préférences de notification afin de faciliter la coordination des rencontres.",
      },
      {
        subtitle: "Données de l'appareil",
        text: "Nous ne collectons pas de données personnelles sensibles. Cependant, des informations techniques anonymisées (type d'appareil, version de l'application, erreurs) peuvent être demandées à des fins de diagnostic et d'amélioration du service.",
      },
    ],
  },
  {
    id: "utilisation",
    title: "Utilisation des données",
    content: [
      {
        subtitle: "Coordination des matchs",
        text: "Vos données sont utilisées pour organiser les affectations des arbitres et du staff, envoyer des notifications de match et faciliter la communication interne au club.",
      },
      {
        subtitle: "Amélioration du service",
        text: "Les données techniques anonymisées nous permettent d'identifier et de corriger les bugs, d'améliorer les performances et de développer de nouvelles fonctionnalités.",
      },
      {
        subtitle: "Aucune vente à des tiers",
        text: "Vos données personnelles ne sont jamais vendues, louées ou partagées à des fins commerciales avec des tiers. Elles restent strictement utilisées dans le cadre du fonctionnement du Club Bob1.",
      },
    ],
  },
  {
    id: "partage",
    title: "Partage des données",
    content: [
      {
        subtitle: "Au sein du club",
        text: "Les informations nécessaires à la coordination (nom, disponibilités d'un match, affectations à un match) sont visibles par les membres du club.",
      },
      {
        subtitle: "Prestataires techniques",
        text: "Nous ne faisons appel à aucun prestataire externe pour le traitement de vos données. L'application est hébergée sur des serveurs sécurisés et nous gérons directement l'ensemble des données.",
      },
      {
        subtitle: "Obligations légales",
        text: "Nous pouvons divulguer vos données si la loi l'exige ou en réponse à une demande légale valide des autorités compétentes.",
      },
    ],
  },
  {
    id: "conservation",
    title: "Conservation et sécurité",
    content: [
      {
        subtitle: "Durée de conservation",
        text: "Vos données sont conservées pendant toute la durée de votre activité au sein du club, puis supprimées dans un délai de 12 mois suivant la fin de votre collaboration, sauf obligation légale contraire.",
      },
      {
        subtitle: "Sécurité",
        text: "Nous mettons en œuvre des mesures techniques appropriées (chiffrement en transit et au repos, accès restreints) pour protéger vos données contre tout accès non autorisé, perte ou divulgation.",
      },
    ],
  },
  {
    id: "droits",
    title: "Vos droits",
    content: [
      {
        subtitle: "Accès et rectification",
        text: "Vous pouvez à tout moment consulter et corriger vos informations personnelles directement dans les paramètres de l'application.",
      },
      {
        subtitle: "Suppression",
        text: "Vous pouvez demander la suppression de votre compte et de l'ensemble de vos données en contactant l'administrateur du club. La demande sera traitée dans un délai de 30 jours.",
      },
      {
        subtitle: "Opposition et portabilité",
        text: "Conformément au RGPD, vous disposez d'un droit d'opposition au traitement de vos données et d'un droit à la portabilité. Pour exercer ces droits, contactez-nous à l'adresse indiquée ci-dessous.",
      },
    ],
  },
];

export default async function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0D1B2A] text-[#F8F9FA]">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6 py-8 flex items-center gap-4">
          {/* Basketball icon */}
          <div className="w-10 h-10 rounded-full bg-[#E8620A] flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
              <path
                d="M12 2C12 2 8 7 8 12C8 17 12 22 12 22"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M12 2C12 2 16 7 16 12C16 17 12 22 12 22"
                stroke="white"
                strokeWidth="1.5"
              />
              <path d="M2 12H22" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#8B9AAD] font-medium">
              Club Bob1
            </p>
            <h1
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Politique de confidentialité
            </h1>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-6 pt-12 pb-10">
        <p className="text-[#8B9AAD] text-sm uppercase tracking-widest mb-3 font-medium">
          En vigueur depuis le 1er janvier 2025
        </p>
        <p className="text-lg text-[#F8F9FA]/80 leading-relaxed">
          L'application Bob1 est développée pour les arbitres et le staff du
          Club Bob1. Cette politique explique quelles données nous collectons,
          pourquoi, et comment vous pouvez les contrôler.
        </p>

        {/* Court line divider */}
        <div className="mt-10 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-[#E8620A]" />
          <div className="h-px w-8 bg-[#E8620A]/40" />
          <div className="w-2 h-2 rounded-full border border-[#E8620A]/60" />
          <div className="h-px flex-1 bg-white/10" />
        </div>
      </section>

      {/* Table of contents */}
      <nav className="max-w-3xl mx-auto px-6 pb-12">
        <p className="text-xs uppercase tracking-widest text-[#8B9AAD] mb-4 font-medium">
          Sommaire
        </p>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="flex items-center gap-3 group text-sm text-[#F8F9FA]/60 hover:text-[#C8A96E] transition-colors duration-150"
              >
                <span className="text-[#E8620A] font-mono text-xs w-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Sections */}
      <div className="max-w-3xl mx-auto px-6 pb-20 space-y-16">
        {sections.map((section, i) => (
          <section key={section.id} id={section.id}>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-[#E8620A] font-mono text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2
                className="text-2xl font-bold tracking-tight text-[#F8F9FA]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {section.title}
              </h2>
            </div>

            <div className="space-y-6 pl-9">
              {section.content.map((item) => (
                <div key={item.subtitle}>
                  <h3 className="text-[#C8A96E] font-semibold text-sm uppercase tracking-wider mb-2">
                    {item.subtitle}
                  </h3>
                  <p className="text-[#F8F9FA]/70 leading-relaxed text-[0.95rem]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {i < sections.length - 1 && (
              <div className="mt-12 flex items-center gap-2">
                <div className="h-px flex-1 bg-white/[0.07]" />
                <div className="w-1 h-1 rounded-full bg-white/20" />
              </div>
            )}
          </section>
        ))}

        {/* Contact block */}
        <section
          id="contact"
          className="rounded-2xl border border-[#E8620A]/20 bg-[#E8620A]/5 px-8 py-8"
        >
          <h2
            className="text-xl font-bold tracking-tight mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Nous contacter
          </h2>
          <p className="text-[#F8F9FA]/70 text-sm leading-relaxed mb-6">
            Pour toute question relative à cette politique ou pour exercer vos
            droits, contactez l'administrateur du club :
          </p>
          <a
            href="mailto:mirage.liaison@gmail.com"
            className="inline-flex items-center gap-2 text-[#C8A96E] font-medium text-sm hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            mirage.liaison@gmail.com
          </a>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#8B9AAD] text-xs">
            © {new Date().getFullYear()} Club Bob1 · Tous droits réservés
          </p>
          <p className="text-[#8B9AAD] text-xs">
            Dernière mise à jour : 24 août 2026
          </p>
        </div>
      </footer>
    </main>
  );
}