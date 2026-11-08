// All homepage copy, English and French. Edit text here, not in the components.
export type Lang = "en" | "fr";

const dict = {
    en:{
      a_top:"Chady Mouawad, back to top", a_main:"Main", a_lang:"Language", a_mobile:"Mobile menu", a_footer:"Footer", a_logo_an:"Atelier N logo", a_logo_wm:"Wminded logo", a_logo_pl:"Protolabs logo", a_portrait:"Chady Mouawad, GTM Engineer", m_title:"Chady Mouawad · GTM Engineer", m_desc:"Chady Mouawad, GTM Engineer. I build go-to-market systems that connect marketing and sales around the accounts most likely to buy.",
      skip:"Skip to content", nav_method:"Methodology", nav_exp:"Experience", nav_pb:"GTM Playbooks", nav_about:"About",
      cta_connect:"Connect on LinkedIn",
      hero_lead:"I build go-to-market systems that connect marketing and sales around the accounts most likely to buy.",
      sys_title:"How I build go‑to‑market systems",
      sys_intro:"Six capabilities that work as one engine, from choosing the market to handing sales a qualified conversation.",
      view_framework:"View Framework",
      think_a:"Growth isn’t a channel problem.", think_b:"It’s a system problem.",
      think_p1:"Most marketing underperforms not because of its channels, but because of the structure behind them. Ads, campaigns, and ABM run in isolation create activity. They rarely create pipeline.",
      think_p2:"So I start with the structure: who to target, how accounts are prioritized, how marketing and sales share signals, and how results are measured. Then the channels have something to scale.",
      think_link:"The thinking behind this",
      exp_title:"Where I apply this thinking", exp_link:"See how it’s applied", pl_stat:"Pipeline influenced",
      an_t:"Building a brand and its growth engine from scratch",
      an_d:"Built a brand from zero, owning positioning, acquisition, and retention end to end, in a real business rather than a single channel.",
      wm_t:"Running and improving acquisition and conversion systems",
      wm_d:"Managed SEO, paid acquisition, and email marketing, while continuously improving conversion and the customer experience.",
      pl_t:"Designing multi-market GTM systems across Europe",
      pl_d:"Combined paid media, ABM, and outbound into one structured approach across Europe to improve sales alignment and pipeline.",
      pb_feat:"Featured GTM playbook",
      pb_sum:"How to turn anonymous website visits into sales opportunities: spot high-intent behavior, prioritize the right accounts, and alert sales while interest is still live.",
      pb_read:"Read the playbook", pb_more:"More GTM playbooks", pb_how:"How the engine works",
      c_title:"Some conversations are worth having.",
      c_body:"If you are building or scaling a go-to-market engine and want a sparring partner on its structure, I’m always open to a conversation.",
      c_btn:"Connect on LinkedIn", draft:"Draft preview", rights:"All rights reserved.",
      menu_open:"Open menu", menu_close:"Close menu", f_site:"Site", f_connect:"Connect", cv:"Download CV", cv_note:"The CV will be available here once the site is hosted.",
      caps:[
        ["GTM|Architecture","Connecting channels, teams, data, and process into one revenue engine with shared goals."],
        ["Market|Segmentation","Defining the markets, accounts, and buyer profiles worth the budget, and saying no to the rest."],
        ["Demand|Generation","Building awareness with the right accounts before they are in market, so you are on the shortlist."],
        ["Channel|Orchestration","Running paid media, outreach, and ABM as one coordinated play instead of separate campaigns."],
        ["Intent &|Buying Signals","Reading behavioral and account-level data to see which companies are actively evaluating."],
        ["Sales|Activation","Turning buying signals into timely, relevant outreach and qualified sales conversations."]
      ],
      pb:["Intent taxonomy","Website signal analysis","Account matching","Buying committee mapping","Signal scoring","Automated activation","Sales routing"],
      pl_big:"Multimillion"
    },
    fr:{
      a_top:"Chady Mouawad, retour en haut", a_main:"Navigation principale", a_lang:"Langue", a_mobile:"Menu mobile", a_footer:"Pied de page", a_logo_an:"Logo Atelier N", a_logo_wm:"Logo Wminded", a_logo_pl:"Logo Protolabs", a_portrait:"Chady Mouawad, GTM Engineer", m_title:"Chady Mouawad · GTM Engineer", m_desc:"Chady Mouawad, GTM Engineer. Je conçois des systèmes go-to-market qui alignent marketing et sales sur les comptes les plus susceptibles d’acheter.",
      skip:"Aller au contenu", nav_method:"Méthodologie", nav_exp:"Parcours", nav_pb:"Playbooks GTM", nav_about:"À propos",
      cta_connect:"Échangeons sur LinkedIn",
      hero_lead:"Je conçois des systèmes go-to-market qui alignent marketing et sales sur les comptes les plus susceptibles d’acheter.",
      sys_title:"Comment je construis un système go‑to‑market",
      sys_intro:"Six briques qui fonctionnent comme un seul moteur, du choix du marché jusqu’à la conversation qualifiée remise aux sales.",
      view_framework:"Voir la méthode",
      think_a:"La croissance n’est pas un problème de canal.", think_b:"C’est un problème de système.",
      think_p1:"Le marketing sous-performe rarement à cause de ses canaux, mais à cause de la structure qui les relie. Ads, campagnes et ABM menés en silo créent de l’activité. Rarement du pipeline.",
      think_p2:"Je commence donc par la structure : qui cibler, comment prioriser les comptes, comment marketing et sales partagent les signaux, et comment mesurer les résultats. Les canaux ont alors quelque chose à faire passer à l’échelle.",
      think_link:"Ma vision en détail",
      exp_title:"Là où je mets cette approche en pratique", exp_link:"Voir mon parcours", pl_stat:"de pipeline influencé",
      an_t:"Construire une marque et son moteur de croissance de zéro",
      an_d:"Création d’une marque de A à Z, du positionnement à l’acquisition et à la fidélisation, dans une vraie entreprise et pas sur un seul canal.",
      wm_t:"Piloter et améliorer les leviers d’acquisition et de conversion",
      wm_d:"SEO, acquisition payante et emailing, avec une optimisation continue de la conversion et de l’expérience client.",
      pl_t:"Concevoir des systèmes GTM multi-pays en Europe",
      pl_d:"Paid media, ABM et outbound réunis dans une approche structurée à l’échelle européenne, pour mieux aligner les sales et générer du pipeline.",
      pb_feat:"Playbook GTM à la une",
      pb_sum:"Comment transformer des visites anonymes sur votre site en opportunités commerciales : repérer les comportements à forte intention, prioriser les bons comptes et alerter les sales tant que l’intérêt est là.",
      pb_read:"Lire le playbook", pb_more:"Les autres playbooks GTM", pb_how:"Comment fonctionne le moteur",
      c_title:"Il y a des conversations qui font avancer les choses.",
      c_body:"Vous construisez ou faites évoluer un moteur go-to-market et cherchez un sparring partner pour en challenger la structure ? Je suis toujours partant pour en discuter.",
      c_btn:"Échangeons sur LinkedIn", draft:"Version de travail", rights:"Tous droits réservés.",
      menu_open:"Ouvrir le menu", menu_close:"Fermer le menu", f_site:"Navigation", f_connect:"Contact", cv:"Télécharger mon CV", cv_note:"Le CV sera disponible ici dès la mise en ligne du site.",
      caps:[
        ["Architecture|GTM","Relier canaux, équipes, data et process dans un seul moteur de revenus, avec des objectifs communs."],
        ["Segmentation|de marché","Définir les marchés, comptes et profils d’acheteurs qui méritent le budget, et renoncer au reste."],
        ["Génération|de demande","Installer la notoriété auprès des bons comptes avant qu’ils n’achètent, pour figurer dans leur shortlist."],
        ["Orchestration|des canaux","Piloter paid media, outreach et ABM comme un seul dispositif coordonné, plutôt que des campagnes séparées."],
        ["Intention &|signaux d’achat","Lire la data comportementale et account-level pour voir quelles entreprises sont en phase d’évaluation."],
        ["Activation|commerciale","Transformer les signaux d’achat en prises de contact pertinentes et en conversations commerciales qualifiées."]
      ],
      pb:["Taxonomie de l’intention","Analyse des signaux web","Matching des comptes","Cartographie du comité d’achat","Scoring des signaux","Activation automatisée","Routage vers l’équipe sales"],
      pl_big:"Plusieurs millions"
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
  methodology: "/methodology",
  experience: "/experience",
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
