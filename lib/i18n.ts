// All homepage copy, English and French. Edit text here, not in the components.
export type Lang = "en" | "fr";

const dict = {
    en:{
      a_top:"Chady Mouawad, back to top", a_main:"Main", a_lang:"Language", a_mobile:"Mobile menu", a_footer:"Footer", a_logo_an:"Atelier N logo", a_logo_wm:"Wminded logo", a_logo_pl:"Protolabs logo", a_portrait:"Chady Mouawad, GTM Engineer", m_title:"Chady Mouawad · GTM Engineer", m_desc:"Chady Mouawad, GTM Engineer. I build go-to-market systems that connect strategy, execution, and revenue generation.",
      skip:"Skip to content", nav_method:"Methodology", nav_exp:"Experience", nav_pb:"GTM Playbooks", nav_about:"About",
      cta_connect:"Connect on LinkedIn",
      hero_lead:"I build go-to-market systems that connect strategy, execution, and revenue generation.",
      sys_title:"How I build go‑to‑market systems",
      sys_intro:"Six capabilities, designed to work as one system rather than as separate channels.",
      view_framework:"View Framework",
      think_a:"Growth isn’t a channel problem.", think_b:"It’s a system problem.",
      think_p1:"Most marketing efforts fail because they optimize isolated channels instead of fixing the structure behind them. Running ads, launching campaigns, or doing ABM in isolation doesn’t create growth. It creates activity.",
      think_p2:"From defining ideal customer profiles and segmentation to structuring marketing systems, aligning targeting, messaging, channels, and data, I focus on building systems that scale.",
      think_link:"The thinking behind this",
      exp_title:"Where I apply this thinking", exp_link:"See how it’s applied", pl_stat:"Pipeline influenced",
      an_t:"Building brand and growth foundations from scratch",
      an_d:"Built a brand from scratch, shaping positioning, acquisition, and retention in a real business, not just marketing channels.",
      wm_t:"Enhancing and managing acquisition and conversion systems",
      wm_d:"Worked across SEO, paid acquisition, and email marketing, while continuously improving conversion and the user experience.",
      pl_t:"Designing multi-market GTM systems across Europe",
      pl_d:"Applied structured multi-channel approaches across paid media, ABM, and outbound to improve alignment and pipeline generation.",
      pb_feat:"Featured GTM playbook",
      pb_sum:"A framework for transforming website buying signals into sales opportunities. It explains how to identify high-intent behavior, prioritize accounts, score intent, and trigger timely sales engagement.",
      pb_read:"Read the playbook", pb_more:"More GTM playbooks", pb_how:"How the engine works",
      c_title:"Some conversations are worth having.",
      c_body:"If you are building or scaling a go-to-market engine and want a sparring partner on how it is structured, I am always open to a conversation.",
      c_btn:"Connect on LinkedIn", draft:"Draft preview", rights:"All rights reserved.",
      menu_open:"Open menu", menu_close:"Close menu", f_site:"Site", f_connect:"Connect", cv:"Download CV", cv_note:"The CV will be available here once the site is hosted.",
      caps:[
        ["GTM|Architecture","Designing & connecting channels, teams, data, and processes into a single revenue engine."],
        ["Market|Segmentation","Identifying high-value markets, accounts, and ideal customer profiles to focus resources where they create the greatest impact."],
        ["Demand|Generation","Building awareness and demand through coordinated campaigns that create visibility before buying intent appears."],
        ["Channel|Orchestration","Aligning paid media, outreach, and ABM into coordinated plays where channels operate as one tactic."],
        ["Intent &|Buying Signals","Identifying where interest is developing through behavioral data, engagement patterns, and account-level intelligence."],
        ["Sales|Activation","Using automated outreach and account-based engagement to turn buying signals into qualified conversations."]
      ],
      pb:["Intent taxonomy","Website signal analysis","Account matching","Buying committee mapping","Signal scoring","Automated activation","Sales routing"]
    },
    fr:{
      a_top:"Chady Mouawad, retour en haut", a_main:"Navigation principale", a_lang:"Langue", a_mobile:"Menu mobile", a_footer:"Pied de page", a_logo_an:"Logo Atelier N", a_logo_wm:"Logo Wminded", a_logo_pl:"Logo Protolabs", a_portrait:"Chady Mouawad, GTM Engineer", m_title:"Chady Mouawad · GTM Engineer", m_desc:"Chady Mouawad, GTM Engineer. Je conçois des systèmes go-to-market qui relient stratégie, exécution et génération de revenus.",
      skip:"Aller au contenu", nav_method:"Méthodologie", nav_exp:"Parcours", nav_pb:"Playbooks GTM", nav_about:"À propos",
      cta_connect:"Échangeons sur LinkedIn",
      hero_lead:"Je conçois des systèmes go-to-market qui relient stratégie, exécution et génération de revenus.",
      sys_title:"Comment je construis un système go‑to‑market",
      sys_intro:"Six briques complémentaires, pensées pour fonctionner comme un seul système plutôt que comme des canaux en silo.",
      view_framework:"Voir la méthode",
      think_a:"La croissance n’est pas un problème de canal.", think_b:"C’est un problème de système.",
      think_p1:"La plupart des actions marketing échouent parce qu’elles optimisent des canaux en silo au lieu de corriger la structure qui les relie. Multiplier les campagnes et les ads, ou faire de l’ABM en vase clos, ne crée pas de croissance. Cela crée de l’activité.",
      think_p2:"De la définition de l’ICP et de la segmentation jusqu’à la structuration du dispositif marketing, en alignant ciblage, messages, canaux et data, je construis des systèmes qui passent à l’échelle.",
      think_link:"Ma vision en détail",
      exp_title:"Là où je mets cette approche en pratique", exp_link:"Voir mon parcours", pl_stat:"de pipeline influencé",
      an_t:"Construire de zéro les fondations d’une marque et de sa croissance",
      an_d:"Création d’une marque de A à Z\u202f: positionnement, acquisition et fidélisation, en conditions réelles et pas seulement sur les canaux marketing.",
      wm_t:"Optimiser et piloter les leviers d’acquisition et de conversion",
      wm_d:"SEO, acquisition payante et emailing, avec une optimisation continue de la conversion et de l’expérience utilisateur.",
      pl_t:"Concevoir des systèmes GTM multi-pays en Europe",
      pl_d:"Déploiement d’approches multicanales structurées (paid media, ABM, outbound) pour renforcer l’alignement marketing-sales et la génération de pipeline.",
      pb_feat:"Playbook GTM à la une",
      pb_sum:"Un framework pour transformer les signaux d’intention captés sur votre site en opportunités commerciales\u202f: repérer les comportements à forte intention, prioriser les comptes, scorer l’intention et déclencher la bonne action commerciale au bon moment.",
      pb_read:"Lire le playbook", pb_more:"Les autres playbooks GTM", pb_how:"Comment fonctionne le moteur",
      c_title:"Il y a des conversations qui font avancer les choses.",
      c_body:"Vous construisez ou faites évoluer un moteur go-to-market et cherchez un sparring partner pour en challenger la structure\u202f? Je suis toujours partant pour en discuter.",
      c_btn:"Échangeons sur LinkedIn", draft:"Version de travail", rights:"Tous droits réservés.",
      menu_open:"Ouvrir le menu", menu_close:"Fermer le menu", f_site:"Navigation", f_connect:"Contact", cv:"Télécharger mon CV", cv_note:"Le CV sera disponible ici dès la mise en ligne du site.",
      caps:[
        ["Architecture|GTM","Concevoir et connecter canaux, équipes, data et process au sein d’un seul moteur de revenus."],
        ["Segmentation|de marché","Identifier les marchés, comptes et ICP à plus forte valeur pour concentrer les ressources là où l’impact est maximal."],
        ["Génération|de demande","Créer notoriété et demande avec des campagnes coordonnées, pour être visible avant même que l’intention d’achat n’apparaisse."],
        ["Orchestration|des canaux","Aligner paid media, outreach et ABM dans des plays coordonnés, où les canaux agissent comme une seule tactique."],
        ["Intention &|signaux d’achat","Repérer où l’intérêt émerge grâce à la data comportementale, aux signaux d’engagement et à l’account intelligence."],
        ["Activation|commerciale","S’appuyer sur l’outreach automatisé et l’engagement account-based pour transformer les signaux d’achat en conversations qualifiées."]
      ],
      pb:["Taxonomie de l’intention","Analyse des signaux web","Matching des comptes","Cartographie du comité d’achat","Scoring des signaux","Activation automatisée","Routage vers l’équipe sales"]
    }
  
} as const;

type Widen<T> = {
  -readonly [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends readonly (readonly [string, string])[]
      ? [string, string][]
      : T[K] extends readonly string[]
        ? string[]
        : T[K];
};
export type Dict = Widen<(typeof dict)["en"]>;

/** Built-in copy, used as a fallback when a field is empty in Sanity. */
export function getDict(lang: Lang): Dict {
  return JSON.parse(JSON.stringify(dict[lang])) as Dict;
}

export const LINKS = {
  linkedin: "https://www.linkedin.com/in/chady-mouawad-marketing/",
  methodology: "https://chadymouawad.com/methodology/",
  experience: "https://chadymouawad.com/experience/",
  playbooks: "https://chadymouawad.com/gtm-playbooks/",
  about: "https://chadymouawad.com/about/",
  featured: "https://chadymouawad.com/gtm-playbooks/high-intent-website-visitor-engine/",
  more: [
    ["The Account Manager Expansion Engine", "https://chadymouawad.com/gtm-playbooks/account-manager-expansion-engine/"],
    ["The Dormant Customer Reactivation Engine", "https://chadymouawad.com/gtm-playbooks/dormant-customer-reactivation-engine/"],
    ["The Competitor Takeout Engine", "https://chadymouawad.com/gtm-playbooks/competitor-takeout-engine/"],
    ["The Event & Webinar-to-Pipeline Engine", "https://chadymouawad.com/gtm-playbooks/event-webinar-to-pipeline-engine/"],
  ] as const,
  // Set to the hosted PDF address (e.g. "/cv/chady-mouawad-cv.pdf") when the CV is ready.
  cv: "",
};
