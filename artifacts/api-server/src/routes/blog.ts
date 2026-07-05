import { Router } from "express";

const router = Router();

const posts = [
  {
    id: 1,
    slug: "accompagnement-prefecture-france",
    title: "Comment préparer un dossier de titre de séjour avec sérieux",
    excerpt: "Un guide pratique pour réduire les risques d’erreur de procédure auprès des préfectures.",
    content: "La préparation d’un dossier administratif exige une compréhension fine des exigences préfectorales. Le meilleur accompagnement consiste à anticiper les pièces demandées et à organiser les documents de façon claire.",
    publishedAt: "2026-06-01T09:00:00.000Z",
    tags: ["préfecture", "titre de séjour", "dossier"],
  },
  {
    id: 2,
    slug: "suivi-dossier-administratif",
    title: "Pourquoi le suivi de dossier fait toute la différence",
    excerpt: "Le suivi personnalisé permet de répondre rapidement aux demandes de l’administration et d’éviter les délais inutiles.",
    content: "Le suivi d’un dossier est l’assurance d’un traitement fluide. Chaque relance et chaque document supplémentaire est enregistré pour rassurer le demandeur.",
    publishedAt: "2026-06-15T09:00:00.000Z",
    tags: ["suivi", "administratif", "conseil"],
  },
];

router.get("/blog", async (_req, res) => {
  res.json(posts);
});

router.get("/blog/:slug", async (req, res) => {
  const post = posts.find((item) => item.slug === req.params.slug);
  if (!post) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(post);
});

export default router;
