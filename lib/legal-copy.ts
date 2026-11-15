import type { Lang } from "./i18n";

/** Legal notice and privacy copy (EN / FR). Host details from vercel.com/legal/privacy-policy;
    analytics wording from Vercel's Web Analytics and Speed Insights privacy docs (checked 15 Nov 2026). */
const nb = " "; // narrow no-break space before French : ; ? !

export type LegalSection = { h: string; p: string[] };
export type LegalCopy = {
  m_title: string; m_desc: string; kicker: string; h1a: string; h1b: string; lead: string;
  sections: LegalSection[]; updated: string; contact: string;
};

export const legalCopy: Record<Lang, LegalCopy> = {
  en: {
    m_title: "Legal notice · Chady Mouawad",
    m_desc: "Who publishes and hosts chadymouawad.com, and what data the site collects.",
    kicker: "Legal",
    h1a: "Legal",
    h1b: "notice",
    lead: "Who publishes this site, who hosts it, and what data it collects.",
    contact: "Contact:",
    sections: [
      { h: "Publisher", p: ["This website is published by Chady Mouawad, in a personal capacity.", "Publication director: Chady Mouawad.", "{contact}"] },
      { h: "Hosting", p: ["Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United States. vercel.com", "Page content and images are managed with Sanity, and images are delivered from Sanity’s image service."] },
      {
        h: "Privacy",
        p: [
          "This site sets no cookies and has no forms.",
          "It uses Vercel Web Analytics and Vercel Speed Insights to count visits and measure page speed. Both are anonymous: they record details such as the page viewed, the referring site, the country, the browser and the device type, without cookies and without identifying you.",
          "Images are loaded from Sanity’s image service, which, like any web server, receives your IP address in order to deliver them.",
          "For any question about your data, write to the address above.",
        ],
      },
      {
        h: "Intellectual property",
        p: ["Texts, playbooks, visuals and the CM logo are © Chady Mouawad unless stated otherwise. Company names and logos (Protolabs, Wminded, Atelier N) belong to their respective owners."],
      },
    ],
    updated: "Last updated: November 15, 2026",
  },
  fr: {
    m_title: "Mentions légales · Chady Mouawad",
    m_desc: "Qui édite et héberge chadymouawad.com, et quelles données le site collecte.",
    kicker: "Informations légales",
    h1a: "Mentions",
    h1b: "légales",
    lead: "Qui édite ce site, qui l’héberge, et quelles données il collecte.",
    contact: `Contact${nb}:`,
    sections: [
      { h: "Éditeur", p: ["Ce site est édité par Chady Mouawad, à titre personnel.", `Directeur de la publication${nb}: Chady Mouawad.`, "{contact}"] },
      { h: "Hébergement", p: ["Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis. vercel.com", "Les contenus et les images du site sont gérés avec Sanity, et les images sont diffusées par le service d’images de Sanity."] },
      {
        h: "Données personnelles",
        p: [
          "Ce site ne dépose aucun cookie et ne comporte aucun formulaire.",
          `Il utilise Vercel Web Analytics et Vercel Speed Insights pour mesurer l’audience et la vitesse des pages. Ces mesures sont anonymes${nb}: elles enregistrent notamment la page consultée, le site d’origine, le pays, le navigateur et le type d’appareil, sans cookie et sans vous identifier.`,
          "Les images sont chargées depuis le service d’images de Sanity qui, comme tout serveur web, reçoit votre adresse IP pour pouvoir les afficher.",
          "Pour toute question sur vos données, écrivez à l’adresse ci-dessus.",
        ],
      },
      {
        h: "Propriété intellectuelle",
        p: ["Les textes, playbooks, visuels et le logo CM sont la propriété de Chady Mouawad, sauf mention contraire. Les noms et logos d’entreprises (Protolabs, Wminded, Atelier N) appartiennent à leurs propriétaires respectifs."],
      },
    ],
    updated: `Dernière mise à jour${nb}: 15 novembre 2026`,
  },
};
