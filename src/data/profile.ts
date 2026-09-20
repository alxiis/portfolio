/**
 * Source unique du contenu du portfolio — issue du CV (CV-Fievet_Alexis_2026_2.pdf).
 * Modifie uniquement ce fichier pour mettre à jour le site.
 */

export const profile = {
  firstName: 'Alexis',
  lastName: 'Fievet',
  monogram: 'AF',
  role: 'Alternant Technicien IT',
  degree: 'Bachelor 3 Infrastructures Réseaux & Cybersécurité',
  domain: 'Infrastructures · Réseaux · Cybersécurité',
  seeking: 'Alternance en Master Cybersécurité / Informatique',
  seekingSince: 'Rentrée septembre 2027',
  city: 'Colomiers (31)',
  email: 'fvt.alexiis@gmail.com',
  phone: '06 52 14 41 77',
  cvFile: '/CV-Fievet_Alexis.pdf',
  // Le CV indique seulement « Alexis Fievet » sans URL.
  // Colle ici l'URL complète de ton profil : le lien apparaît alors automatiquement (laisse vide pour le masquer).
  linkedin: 'https://www.linkedin.com/in/alexis-fievet/',
  github: 'https://github.com/alxiis',
  year: 2026,
};

export const intro =
  "Étudiant en 3ᵉ année de Bachelor, passionné par l'administration systèmes et réseaux, la virtualisation et l'automatisation.";

export const about = [
  "Je suis en 3ᵉ année de Bachelor Infrastructures Réseaux & Cybersécurité à l'IPI (Igensia, Blagnac), en alternance. Ce qui m'attire : l'administration systèmes et réseaux, la virtualisation et l'automatisation.",
  "Chez NOOUS, à Labège, j'ai commencé par un stage de technicien IT avant d'y poursuivre en alternance : support utilisateurs de niveau 1, gestion du parc, Microsoft 365, masterisation des postes et automatisation de tâches d'administration avec n8n, PowerShell et Python.",
  "Côté projets, j'ai monté une infrastructure pour un environnement CTF, simulé une attaque DHCP spoofing pour comprendre les risques réseau, et écrit un outil Python qui synchronise supervision et inventaire.",
  "Je souhaite poursuivre en Master pour me spécialiser en cybersécurité. Je cherche une alternance à la rentrée de septembre 2027. Je travaille volontiers en équipe, je sais avancer seul et j'apprends en continu.",
];

export const qualities = [
  { name: 'Esprit d’équipe', text: "J'apprécie le travail collaboratif et je m'adapte au groupe." },
  { name: 'Autonome', text: 'Capable de travailler efficacement sans supervision constante.' },
  { name: 'Curieux', text: "J'aime apprendre de nouvelles choses et me former en continu." },
];

export type Experience = {
  period: string;
  status?: string;
  company: string;
  role: string;
  place: string;
  missions: { label: string; text: string }[];
  tags: string[];
};

export const experiences: Experience[] = [
  {
    period: 'Sept. 2026 — Sept. 2027',
    status: 'En cours',
    company: 'NOOUS',
    role: 'Alternant Technicien IT',
    place: 'Labège',
    missions: [
      { label: 'Support & parc', text: 'assistance aux utilisateurs (niveau 1) et gestion du parc informatique.' },
      { label: 'Automatisation', text: "conception de workflows n8n et de scripts pour automatiser des tâches d'administration." },
      { label: 'Microsoft 365', text: "administration des comptes, licences et services de l'écosystème Microsoft." },
      { label: 'Déploiement', text: 'préparation et masterisation (imaging) des postes de travail.' },
    ],
    tags: ['n8n', 'Scripts', 'Microsoft 365', 'Imaging', 'Support N1'],
  },
  {
    period: 'Févr. — Avr. 2026',
    status: '2 mois',
    company: 'NOOUS',
    role: 'Stagiaire Technicien IT',
    place: 'Labège',
    missions: [
      { label: 'Support', text: 'assistance aux utilisateurs (niveau 1) et participation à la gestion du parc.' },
      { label: 'Déploiement', text: 'préparation et masterisation (imaging) des postes de travail.' },
      { label: 'Automatisation', text: "scripts PowerShell / Python pour automatiser des tâches d'administration." },
      { label: 'Microsoft 365', text: 'administration des environnements, comptes utilisateurs et services associés.' },
    ],
    tags: ['PowerShell', 'Python', 'Microsoft 365', 'Imaging', 'Support N1'],
  },
];

export type Project = {
  number: string;
  name: string;
  year: string;
  summary: string;
  goal: string;
  done: string;
  stack: string[];
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    number: '01',
    name: 'Projet LABO',
    year: 'Janv. 2026',
    summary: 'Infrastructure pour environnement CTF',
    goal: "Disposer d'une infrastructure pour un environnement Capture The Flag (CTF).",
    done: "Conception et déploiement de l'infrastructure complète, de la virtualisation à la supervision, avec l'annuaire, l'accès distant et le déploiement automatisé.",
    stack: ['Proxmox', 'OPNsense', 'Active Directory', 'Guacamole', 'Zabbix', 'Terraform', 'Ansible'],
  },
  {
    number: '02',
    name: 'Attaque DHCP spoofing',
    year: 'Simulation',
    summary: 'Sécurité réseau',
    goal: 'Analyser les risques associés à cette attaque et approfondir mes compétences en sécurité réseau.',
    done: "Mise en œuvre d'une attaque DHCP spoofing.",
    stack: ['DHCP', 'Sécurité réseau'],
  },
  {
    number: '03',
    name: "Réconciliation d'inventaire",
    year: 'Outil Python',
    summary: 'Supervision ↔ inventaire matériel',
    goal: "Faire correspondre les données de supervision avec l'inventaire matériel.",
    done: 'Script Python exploitant des API REST pour comparer et synchroniser les données Atera avec Snipe-IT.',
    stack: ['Python', 'API REST', 'Atera', 'Snipe-IT'],
  },
];

export type SkillGroup = { title: string; items: string[]; featured?: string[] };

export const skills: SkillGroup[] = [
  {
    title: 'Systèmes & réseaux',
    items: ['Windows Server', 'AD DS', 'DNS', 'DHCP', 'WSUS', 'Linux', 'Routage', 'NAT', 'VPN', "Installation d'OS"],
    featured: ['Windows Server', 'Linux', 'AD DS'],
  },
  {
    title: 'Virtualisation',
    items: ['VMware ESXi', 'Hyper-V', 'Proxmox', 'Déploiement de VM'],
    featured: ['Proxmox'],
  },
  {
    title: 'Automatisation & code',
    items: ['n8n', 'PowerShell', 'Bash', 'Python', 'Java', 'C', 'Shell', 'SQL'],
    featured: ['n8n', 'PowerShell', 'Python'],
  },
  {
    title: 'Cloud & Microsoft 365',
    items: ['Microsoft 365', 'Azure AD (Entra ID)', 'Gestion des comptes', 'Gestion des licences'],
    featured: ['Microsoft 365'],
  },
  {
    title: 'Support & déploiement',
    items: ['Ticketing N1', 'WDS / MDT', 'Déploiement de postes', 'Périphériques', 'RustDesk', 'Atera'],
  },
  {
    title: 'Documentation',
    items: ['Procédures', 'Documentation technique'],
  },
];

export const languages = [
  { name: 'Anglais', level: 'B2' },
  { name: 'Espagnol', level: 'A2' },
];

export const education = [
  {
    period: '2024 — En cours',
    note: 'Diplôme prévu en 2027',
    title: 'Bachelor Infrastructures Réseaux & Cybersécurité',
    school: 'École IPI – Igensia, Blagnac',
    detail: '3ᵉ année en alternance',
  },
  {
    period: '2021 — 2023',
    title: 'Baccalauréat Général',
    school: 'Lycée International Victor Hugo, Colomiers',
  },
];

export const extras = {
  mobility: 'Permis B',
  interests: ['Lecture : romans, mangas', 'Dessin : passionné par la créativité'],
};

export const nav = [
  { href: '#about', label: 'À propos' },
  { href: '#experience', label: 'Expérience' },
  { href: '#projects', label: 'Projets' },
  { href: '#skills', label: 'Compétences' },
  { href: '#contact', label: 'Contact' },
];
