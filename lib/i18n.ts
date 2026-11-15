// All homepage copy, English and French. Edit text here, not in the components.
export type Lang = "en" | "fr";

const dict = {
    en:{
      a_top:"Chady Mouawad, back to top", a_main:"Main", a_lang:"Language", a_mobile:"Mobile menu", a_footer:"Footer", a_logo_an:"Atelier N logo", a_logo_wm:"Wminded logo", a_logo_pl:"Protolabs logo", a_portrait:"Chady Mouawad, GTM Engineer", m_title:"Chady Mouawad · GTM Engineer", m_desc:"Chady Mouawad, GTM Engineer in France. Full-funnel B2B marketing: strategy, digital advertising, ABM and sales activation, run as one system for pipeline.",
      hero_role:"GTM Engineer · Full-funnel B2B marketing", skip:"Skip to content", nav_method:"Methodology", nav_exp:"Experience", nav_pb:"GTM Playbooks", nav_pb_menu:"Show the five GTM playbooks", nav_about:"About", nf_k:"Page not found", nf_a:"This page", nf_b:"doesn’t exist.", nf_sub:"The link may be out of date, or the page has moved.", nf_home:"Back to home", nf_pb:"See the GTM playbooks", f_legal:"Legal notice", kw_part_a:"This playbook is one part of my", kw_part_b:"B2B account-based marketing strategy", kw_practice:"Put it into practice:", kw_pb:["Identify companies visiting your website","Win customers from competitors","Trade show and event lead follow-up","Grow existing customer accounts","Reactivate inactive B2B customers"],
      cta_connect:"Connect on LinkedIn",
      hero_lead:"I design full-funnel B2B marketing: the strategy, the digital advertising, the ABM programs and the sales activation that turn target accounts into pipeline.",
      sys_title:"How I run full-funnel B2B marketing",
      sys_intro:"Six disciplines I run as one system, so every campaign, every channel and every sales conversation moves the same accounts forward.",
      view_framework:"View Framework",
      think_a:"Growth isn’t a channel problem.", think_b:"It’s a system problem.",
      think_p1:"Most B2B marketing underperforms not because of its channels, but because nothing connects them. Ads, ABM, events and outbound each report their own wins, and sales still doesn’t know which accounts to call.",
      think_p2:"So I start with the strategy: which markets and accounts to win, what each channel is there to do, and how marketing hands sales the right accounts at the right time. Then the advertising has something to scale, and the results show up in pipeline.",
      think_link:"The thinking behind this",
      exp_title:"Where I’ve led this work", exp_link:"See how it’s applied", pl_stat:"Pipeline influenced",
      an_t:"Building a brand and its growth from zero",
      an_d:"Owned positioning, product, acquisition and retention end to end, leading a team of eight across production, marketing and sales.",
      wm_t:"Growing e-commerce with paid acquisition and conversion",
      wm_d:"Ran paid search and social, SEO and email marketing, and kept improving conversion from first visit to repeat purchase.",
      pl_t:"Leading full-funnel B2B marketing across Europe",
      pl_d:"Paid media, ABM programs and sales activation run as one go-to-market strategy across European markets, to put marketing and sales on the same accounts.",
      pb_feat:"Featured GTM playbook",
      pb_sum:"How to turn anonymous website visits into sales opportunities: spot high-intent behavior, prioritize the right accounts, and alert sales while interest is still live.",
      pb_read:"Read the playbook", pb_more:"More GTM playbooks", pb_how:"How the engine works",
      c_title:"Some conversations are worth having.",
      c_body:"If you’re shaping a B2B go-to-market strategy, from advertising and ABM to sales activation, and want a sparring partner on it, I’m always open to a conversation.",
      c_btn:"Connect on LinkedIn", draft:"Draft preview", rights:"All rights reserved.",
      menu_open:"Open menu", menu_close:"Close menu", f_site:"Site", f_connect:"Connect", cv:"Download CV", cv_note:"The CV will be available here once the site is hosted.",
      caps:[["Marketing|Strategy", "Choosing the markets, accounts and buyers worth the budget, and the plan to win them."], ["Digital|Advertising", "Running paid media across LinkedIn, Meta, Google, Reddit and CTV as one full-funnel program, from awareness to retargeting."], ["Account-Based|Marketing", "Focusing marketing and sales on the accounts that matter, with programs built around their buying committee."], ["Demand|Generation", "Building awareness and demand with the right accounts before they’re in market, so you’re on the shortlist."], ["Sales|Activation", "Giving sales the right accounts, the context and the next step, while interest is still live."], ["Full-Funnel|Measurement", "Measuring pipeline, meetings and revenue, not clicks, and moving budget to what works."]],
      pb:["Define real buying interest", "Read website behavior", "Identify the company", "Map the buying committee", "Prioritize the accounts", "Trigger the right outreach", "Hand off to sales"],
      pl_big:"Multimillion"
    },
    fr:{
      a_top:"Chady Mouawad, retour en haut", a_main:"Navigation principale", a_lang:"Langue", a_mobile:"Menu mobile", a_footer:"Pied de page", a_logo_an:"Logo Atelier N", a_logo_wm:"Logo Wminded", a_logo_pl:"Logo Protolabs", a_portrait:"Chady Mouawad, GTM Engineer", m_title:"Chady Mouawad · GTM Engineer", m_desc:"Chady Mouawad, GTM Engineer en France. Marketing B2B full-funnel : stratégie, publicité digitale, ABM et activation commerciale, pilotés comme un seul système.",
      hero_role:"GTM Engineer · Marketing B2B full-funnel", skip:"Aller au contenu", nav_method:"Méthodologie", nav_exp:"Parcours", nav_pb:"Playbooks GTM", nav_pb_menu:"Afficher les cinq playbooks GTM", nav_about:"À propos", nf_k:"Page introuvable", nf_a:"Cette page", nf_b:"n’existe pas.", nf_sub:"Le lien est peut-être ancien, ou la page a été déplacée.", nf_home:"Retour à l’accueil", nf_pb:"Voir les playbooks GTM", f_legal:"Mentions légales", kw_part_a:"Ce playbook s’inscrit dans ma", kw_part_b:"stratégie ABM B2B", kw_practice:"Pour passer à la pratique :", kw_pb:["Identifier les entreprises qui visitent votre site","Conquérir les clients de vos concurrents","Suivi des leads après un salon","Développer les comptes clients existants","Relancer les clients inactifs"],
      cta_connect:"Échangeons sur LinkedIn",
      hero_lead:"Je conçois un marketing B2B full-funnel : la stratégie, la publicité digitale, les programmes ABM et l’activation commerciale qui transforment les comptes cibles en pipeline.",
      sys_title:"Comment je pilote un marketing B2B full-funnel",
      sys_intro:"Six disciplines pilotées comme un seul système, pour que chaque campagne, chaque canal et chaque échange commercial fasse avancer les mêmes comptes.",
      view_framework:"Voir la méthode",
      think_a:"La croissance n’est pas un problème de canal.", think_b:"C’est un problème de système.",
      think_p1:"Le marketing B2B sous-performe rarement à cause de ses canaux, mais parce que rien ne les relie. Publicité, ABM, événements et outbound revendiquent chacun leurs résultats, et les sales ne savent toujours pas quels comptes appeler.",
      think_p2:"Je commence donc par la stratégie : quels marchés et quels comptes gagner, quel rôle pour chaque canal, et comment le marketing transmet aux sales les bons comptes au bon moment. La publicité a alors quelque chose à faire passer à l’échelle, et les résultats se voient dans le pipeline.",
      think_link:"Ma vision en détail",
      exp_title:"Là où j’ai mené ce travail", exp_link:"Voir mon parcours", pl_stat:"de pipeline influencé",
      an_t:"Construire une marque et sa croissance de zéro",
      an_d:"Positionnement, produit, acquisition et fidélisation de bout en bout, à la tête d’une équipe de huit personnes entre production, marketing et ventes.",
      wm_t:"Développer un e-commerce par l’acquisition payante et la conversion",
      wm_d:"Paid search et social, SEO et emailing, avec une amélioration continue de la conversion, de la première visite au réachat.",
      pl_t:"Piloter un marketing B2B full-funnel en Europe",
      pl_d:"Paid media, programmes ABM et activation commerciale pilotés comme une seule stratégie go-to-market sur les marchés européens, pour aligner marketing et sales sur les mêmes comptes.",
      pb_feat:"Playbook GTM à la une",
      pb_sum:"Comment transformer des visites anonymes sur votre site en opportunités commerciales : repérer les comportements à forte intention, prioriser les bons comptes et alerter les sales tant que l’intérêt est là.",
      pb_read:"Lire le playbook", pb_more:"Les autres playbooks GTM", pb_how:"Comment fonctionne le moteur",
      c_title:"Il y a des conversations qui font avancer les choses.",
      c_body:"Vous construisez une stratégie go-to-market B2B, de la publicité et l’ABM jusqu’à l’activation commerciale, et cherchez un sparring partner pour la challenger ? Je suis toujours partant pour en discuter.",
      c_btn:"Échangeons sur LinkedIn", draft:"Version de travail", rights:"Tous droits réservés.",
      menu_open:"Ouvrir le menu", menu_close:"Fermer le menu", f_site:"Navigation", f_connect:"Contact", cv:"Télécharger mon CV", cv_note:"Le CV sera disponible ici dès la mise en ligne du site.",
      caps:[["Stratégie|marketing", "Choisir les marchés, comptes et acheteurs qui méritent le budget, et le plan pour les gagner."], ["Publicité|digitale", "Piloter le paid media sur LinkedIn, Meta, Google, Reddit et la CTV comme un seul programme full-funnel, de la notoriété au retargeting."], ["Account-Based|Marketing", "Concentrer marketing et sales sur les comptes qui comptent, avec des programmes construits autour de leur comité d’achat."], ["Génération|de demande", "Installer la notoriété et la demande auprès des bons comptes avant qu’ils n’achètent, pour figurer dans leur shortlist."], ["Activation|commerciale", "Donner aux sales les bons comptes, le contexte et la prochaine étape, tant que l’intérêt est là."], ["Mesure|full-funnel", "Mesurer le pipeline, les rendez-vous et le chiffre d’affaires, pas les clics, et déplacer le budget vers ce qui marche."]],
      pb:["Définir l’intérêt d’achat réel", "Lire le comportement sur le site", "Identifier l’entreprise", "Cartographier le comité d’achat", "Prioriser les comptes", "Déclencher la bonne prise de contact", "Passer la main aux sales"],
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
  playbooks: "/gtm-playbooks",
  about: "/about",
  featured: "/gtm-playbooks/high-intent-website-visitor-engine",
  more: [
    ["The Account Manager Expansion Engine", "/gtm-playbooks/account-manager-expansion-engine"],
    ["The Dormant Customer Reactivation Engine", "/gtm-playbooks/dormant-customer-reactivation-engine"],
    ["The Competitor Takeout Engine", "/gtm-playbooks/competitor-takeout-engine"],
    ["The Event & Webinar-to-Pipeline Engine", "/gtm-playbooks/event-webinar-to-pipeline-engine"],
  ] as const,
  // Hosted CV per language (files in /public/cv). A cvUrl set in Sanity overrides both.
  cv: "/cv/Chady-Mouawad-CV-EN.pdf",
  cvFr: "/cv/Chady-Mouawad-CV-FR.pdf",
};
