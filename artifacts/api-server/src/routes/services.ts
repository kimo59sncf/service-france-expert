import { Router } from "express";

const router = Router();

const services = [
  {
    id: 1,
    title: "Première demande de titre de séjour",
    description:
      "Accompagnement complet pour votre première demande de titre de séjour : constitution du dossier, vérification des pièces justificatives, rédaction des motivos, suivi administratif jusqu'à l'obtention.",
    featured: true,
    category: "Titre de séjour",
  },
  {
    id: 2,
    title: "Renouvellement de titre de séjour",
    description:
      "Dossier de renouvellement sans erreur : timing optimal, pièces à jour, suivi rigoureux pour éviter la rupture de séjour.",
    featured: false,
    category: "Titre de séjour",
  },
  {
    id: 3,
    title: "Changement de statut",
    description:
      "Changement de statut (étudiant, salarié, indépendant, etc.) : expertise sur les procédures spécifiques, accompagnement dans les démarches administratives.",
    featured: false,
    category: "Titre de séjour",
  },
  {
    id: 4,
    title: "Duplicata de titre de séjour",
    description:
      "Demande de duplicata en cas de perte, vol ou détérioration de votre titre de séjour : démarches rapides et accompagnement administratif.",
    featured: false,
    category: "Titre de séjour",
  },
  {
    id: 5,
    title: "Changement d'adresse ou d'état civil",
    description:
      "Déclaration de changement d'adresse, de situation familiale (mariage, divorce, naissance) à l'OFII/Préfecture avec suivi administratif.",
    featured: false,
    category: "Titre de séjour",
  },
  {
    id: 6,
    title: "Autorisation de travail",
    description:
      "Demande d'autorisation de travail (carte de séjour avec APS, APE, ACT, etc.) : accompagnement pour les candidatures employeurs et démarches administratives.",
    featured: false,
    category: "Travail",
  },
  {
    id: 7,
    title: "DCEM (Délivrance en Centre d'Accueil)",
    description:
      "Accompagnement pour la délivrance du titre de séjour au guichet de la préfecture ou sous réserve de délivrance en centre d'accueil.",
    featured: false,
    category: "Titre de séjour",
  },
  {
    id: 8,
    title: "Titre de voyage pour étranger",
    description:
      "Demande de titre de voyage (passeport ou carte de séjour pour voyage) : constitution du dossier, délais estimés, suivi administratif.",
    featured: false,
    category: "Titre de séjour",
  },
  {
    id: 9,
    title: "Naturalisation",
    description:
      "Accompagnement pour la demande de naturalisation française : contrôle des conditions de résidence, rédaction de la lettre de motivation, suivi administratif.",
    featured: true,
    category: "Nationalité",
  },
  {
    id: 10,
    title: "Réintégration dans la nationalité française",
    description:
      "Démarches pour la réintégration française : expertise sur les procédures, constitution du dossier, accompagnement juridique.",
    featured: false,
    category: "Nationalité",
  },
  {
    id: 11,
    title: "Régularisation / admission exceptionnelle au séjour",
    description:
      "Dossier de régularisation ou admission exceptionnelle : étude de votre situation, recherche des solutions adaptées, accompagnement administratif.",
    featured: true,
    category: "Régularisation",
  },
  {
    id: 12,
    title:
      "Demandes liées au mariage, à la famille, au travail ou à la maladie",
    description:
      "Accompagnement pour les demandes spécifiques : vie privée, vie professionnelle, situation médicale, vie familiale. Solutions sur-mesure pour chaque situation.",
    featured: false,
    category: "Démarches particulières",
  },
];

router.get("/services", async (_req, res) => {
  res.json(services);
});

export default router;
