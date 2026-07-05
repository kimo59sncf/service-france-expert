import { Router } from "express";

const router = Router();

const items = [
  {
    id: 1,
    question: "Qui doit faire une première demande de titre de séjour ?",
    answer:
      "Tout étranger non européen qui souhaite rester en France plus de 90 jours doit demander un titre de séjour, sauf exceptions prévues pour certains ressortissants de l'UE/EEE.",
    category: "Première demande de titre de séjour",
    order: 1,
  },
  {
    id: 2,
    question: "Quand déposer une première demande de titre de séjour ?",
    answer:
      "La demande doit en général être déposée dans les deux mois suivant l'arrivée en France ou avant l'expiration du visa long séjour, selon le type de titre visé.",
    category: "Première demande de titre de séjour",
    order: 2,
  },
  {
    id: 3,
    question: "Où déposer la première demande de titre de séjour ?",
    answer:
      "La demande se fait soit en ligne via le portail ANEF (Administration numérique des étrangers en France), soit auprès de la préfecture du lieu de résidence, selon la situation.",
    category: "Première demande de titre de séjour",
    order: 3,
  },
  {
    id: 4,
    question:
      "Quels documents sont souvent demandés pour une première demande ?",
    answer:
      "Passeport valide, visa long séjour le cas échéant, justificatif de domicile récent, preuves de ressources, photos d'identité, ainsi que les pièces spécifiques liées au motif du séjour (contrat de travail, certificat médical OFII, attestation d'inscription, etc.).",
    category: "Première demande de titre de séjour",
    order: 4,
  },
  {
    id: 5,
    question: "Combien de temps dure l'instruction d'une première demande ?",
    answer:
      "Le délai moyen est souvent de 2 à 4 mois entre le dépôt du dossier et la remise du titre, mais il peut varier selon les préfectures et la complexité de la situation.",
    category: "Première demande de titre de séjour",
    order: 5,
  },
  {
    id: 6,
    question:
      "Puis-je travailler pendant l'instruction de ma première demande ?",
    answer:
      "Le droit au travail dépend du type de visa ou de titre provisoire que vous détenez, ainsi que des mentions figurant sur le récépissé éventuellement délivré.",
    category: "Première demande de titre de séjour",
    order: 6,
  },
  {
    id: 7,
    question:
      "Quand dois-je demander le renouvellement de mon titre de séjour ?",
    answer:
      "Le renouvellement doit être demandé en général entre 2 et 4 mois avant la date d'expiration du titre pour éviter une interruption de droit au séjour.",
    category: "Renouvellement de titre de séjour",
    order: 7,
  },
  {
    id: 8,
    question: "Comment faire une demande de renouvellement ?",
    answer:
      "La plupart des renouvellements se font en ligne via le portail ANEF. Certains titres nécessitent toutefois un dépôt sur rendez-vous ou au guichet de la préfecture.",
    category: "Renouvellement de titre de séjour",
    order: 8,
  },
  {
    id: 9,
    question: "Que se passe-t-il si je dépasse la date de renouvellement ?",
    answer:
      "Vous pouvez vous retrouver en situation irrégulière, perdre temporairement certains droits (travail, aides) et devoir engager une procédure de régularisation plus complexe.",
    category: "Renouvellement de titre de séjour",
    order: 9,
  },
  {
    id: 10,
    question: "Faut-il fournir les mêmes documents qu'en première demande ?",
    answer:
      "Une partie des documents est identique (identité, domicile, ressources), mais il faut aussi prouver la continuité de la situation : contrat de travail, fiches de paie, relevés scolaires, etc.",
    category: "Renouvellement de titre de séjour",
    order: 10,
  },
  {
    id: 11,
    question: "Puis-je changer de préfecture pour le renouvellement ?",
    answer:
      "Le dossier doit être déposé dans la préfecture correspondant à votre domicile actuel. Changer de département implique en principe de saisir la nouvelle préfecture.",
    category: "Renouvellement de titre de séjour",
    order: 11,
  },
  {
    id: 12,
    question: "Qu'est-ce qu'un changement de statut ?",
    answer:
      "Le changement de statut consiste à passer d'un type de titre de séjour à un autre, par exemple d'étudiant à salarié, ou d'étudiant à vie privée et familiale.",
    category: "Changement de statut",
    order: 12,
  },
  {
    id: 13,
    question: "Quand dois-je demander un changement de statut ?",
    answer:
      "La demande doit être faite avant l'expiration du titre en cours, en respectant les délais indiqués par la préfecture, souvent plusieurs mois à l'avance.",
    category: "Changement de statut",
    order: 13,
  },
  {
    id: 14,
    question:
      "Puis-je travailler pendant un changement de statut vers « salarié » ?",
    answer:
      "Le droit au travail dépend du titre de séjour actuel, de l'autorisation de travail et des mentions figurant sur le récépissé qui pourra être délivré pendant l'instruction.",
    category: "Changement de statut",
    order: 14,
  },
  {
    id: 15,
    question:
      "Quels documents sont nécessaires pour un changement de statut vers salarié ?",
    answer:
      "Contrat de travail ou promesse d'embauche, justificatifs de l'employeur (URSSAF, situation fiscale), formulaire Cerfa d'autorisation de travail, ainsi que les pièces d'identité et de séjour habituelles.",
    category: "Changement de statut",
    order: 15,
  },
  {
    id: 16,
    question: "Un refus de changement de statut est-il possible ?",
    answer:
      "Oui, la préfecture peut refuser si les conditions légales ne sont pas remplies, notamment en termes de ressources, de nature du contrat, de cohérence du projet ou de la situation personnelle.",
    category: "Changement de statut",
    order: 16,
  },
  {
    id: 17,
    question: "Quand demander un duplicata de titre de séjour ?",
    answer:
      "Vous devez demander un duplicata en cas de perte, vol ou détérioration de votre titre de séjour.",
    category: "Duplicata de titre de séjour",
    order: 17,
  },
  {
    id: 18,
    question: "Comment déclarer la perte ou le vol du titre ?",
    answer:
      "Il faut en général faire une déclaration de perte ou de vol auprès des autorités compétentes (police ou gendarmerie) et fournir la preuve lors de la demande de duplicata.",
    category: "Duplicata de titre de séjour",
    order: 18,
  },
  {
    id: 19,
    question: "La demande de duplicata se fait-elle en ligne ?",
    answer:
      "Certaines préfectures permettent une demande de duplicata via le portail ANEF ou un téléservice, tandis que d'autres exigent un dépôt au guichet.",
    category: "Duplicata de titre de séjour",
    order: 19,
  },
  {
    id: 20,
    question: "Puis-je voyager avec un récépissé en attendant le duplicata ?",
    answer:
      "Le récépissé autorise le séjour en France, mais les possibilités de voyager à l'étranger, notamment hors espace Schengen, sont limitées.",
    category: "Duplicata de titre de séjour",
    order: 20,
  },
  {
    id: 21,
    question: "Dois-je signaler un changement d'adresse à la préfecture ?",
    answer:
      "Oui, il est obligatoire de signaler tout changement d'adresse afin de mettre à jour votre dossier et de recevoir correctement les convocations et décisions.",
    category: "Changement d'adresse ou d'état civil",
    order: 21,
  },
  {
    id: 22,
    question: "Comment déclarer un changement d'adresse ?",
    answer:
      "La déclaration se fait le plus souvent en ligne via le portail ANEF, ou, selon les préfectures, par formulaire ou courrier.",
    category: "Changement d'adresse ou d'état civil",
    order: 22,
  },
  {
    id: 23,
    question:
      "Que se passe-t-il si je ne déclare pas mon changement d'adresse ?",
    answer:
      "Vous risquez de ne pas recevoir les courriers importants, ce qui peut compliquer vos renouvellements et procédures en cours.",
    category: "Changement d'adresse ou d'état civil",
    order: 23,
  },
  {
    id: 24,
    question: "Quels changements d'état civil doivent être déclarés ?",
    answer:
      "Mariage, divorce, naissance d'un enfant, changement de nom ou de prénom, adoption, doivent être signalés lorsque ces événements affectent votre situation administrative.",
    category: "Changement d'adresse ou d'état civil",
    order: 24,
  },
  {
    id: 25,
    question: "Faut-il fournir des actes d'état civil originaux ?",
    answer:
      "La préfecture demande généralement des actes récents, parfois traduits par un traducteur assermenté, et pour certains pays des formats spécifiques.",
    category: "Changement d'adresse ou d'état civil",
    order: 25,
  },
  {
    id: 26,
    question: "Qui doit demander une autorisation de travail ?",
    answer:
      "Les étrangers dont le titre de séjour ne confère pas automatiquement le droit au travail doivent obtenir une autorisation de travail, le plus souvent via leur employeur.",
    category: "Autorisation de travail",
    order: 26,
  },
  {
    id: 27,
    question: "Comment se fait la demande d'autorisation de travail ?",
    answer:
      "La demande se fait en général en ligne via un téléservice dédié ou au moyen d'un formulaire Cerfa rempli par l'employeur.",
    category: "Autorisation de travail",
    order: 27,
  },
  {
    id: 28,
    question:
      "Quels documents sont nécessaires pour une autorisation de travail ?",
    answer:
      "Contrat de travail ou promesse d'embauche, justificatifs de cotisations et de régularité fiscale de l'employeur, pièces d'identité du salarié, et formulaire Cerfa.",
    category: "Autorisation de travail",
    order: 28,
  },
  {
    id: 29,
    question:
      "Puis-je changer d'employeur avec la même autorisation de travail ?",
    answer:
      "Selon le type de titre et les mentions, certaines autorisations sont liées à un employeur précis, d'autres permettent plus de mobilité.",
    category: "Autorisation de travail",
    order: 29,
  },
  {
    id: 30,
    question: "Qu'est-ce que le DCEM ?",
    answer:
      "Le DCEM est un document qui facilite les déplacements d'un enfant étranger mineur résidant en France, notamment pour les voyages à l'étranger.",
    category: "DCEM (Document de circulation pour étranger mineur)",
    order: 30,
  },
  {
    id: 31,
    question: "Qui peut demander un DCEM ?",
    answer:
      "Les parents ou les représentants légaux d'un enfant étranger mineur résidant de manière habituelle en France peuvent demander ce document.",
    category: "DCEM (Document de circulation pour étranger mineur)",
    order: 31,
  },
  {
    id: 32,
    question: "Le DCEM est-il obligatoire ?",
    answer:
      "Il n'est pas obligatoire, mais il est fortement recommandé pour éviter des difficultés de retour en France lors des déplacements internationaux.",
    category: "DCEM (Document de circulation pour étranger mineur)",
    order: 32,
  },
  {
    id: 33,
    question: "Qu'est-ce qu'un titre de voyage pour étranger ?",
    answer:
      "Le titre de voyage pour étranger est un document délivré notamment aux personnes protégées (réfugiés, bénéficiaires de protection subsidiaire) pour leur permettre de voyager hors de France.",
    category: "Titre de voyage pour étranger",
    order: 33,
  },
  {
    id: 34,
    question: "Qui peut obtenir un titre de voyage ?",
    answer:
      "Les étrangers qui ne peuvent pas obtenir de passeport auprès de leur pays d'origine, mais disposent d'un statut de séjour particulier, peuvent en principe demander ce titre.",
    category: "Titre de voyage pour étranger",
    order: 34,
  },
  {
    id: 35,
    question: "Qui peut demander la nationalité française par naturalisation ?",
    answer:
      "Un étranger majeur, en séjour régulier, résidant depuis plusieurs années en France et justifiant d'une intégration suffisante peut demander la nationalité française par naturalisation.",
    category: "Naturalisation",
    order: 35,
  },
  {
    id: 36,
    question: "Comment déposer une demande de naturalisation par décret ?",
    answer:
      "La demande se fait désormais principalement en ligne via le portail dédié aux démarches de nationalité, selon les consignes du ministère de l'Intérieur.",
    category: "Naturalisation",
    order: 36,
  },
  {
    id: 37,
    question: "Quelles autres voies d'accès à la nationalité existent ?",
    answer:
      "Il est possible d'acquérir la nationalité par mariage, par qualité d'ascendant de Français, par fratrie de Français ou par réintégration dans certains cas.",
    category: "Naturalisation",
    order: 37,
  },
  {
    id: 38,
    question: "Un refus de naturalisation est-il possible ?",
    answer:
      "Oui, l'administration peut refuser la naturalisation en fonction des critères de résidence, d'intégration, de casier judiciaire ou de stabilité de la situation.",
    category: "Naturalisation",
    order: 38,
  },
  {
    id: 39,
    question: "Qu'est-ce que la réintégration dans la nationalité française ?",
    answer:
      "La réintégration permet à une personne qui a perdu la nationalité française de la retrouver, sous réserve de remplir les conditions légales.",
    category: "Réintégration dans la nationalité française",
    order: 39,
  },
  {
    id: 40,
    question:
      "La réintégration suit-elle la même procédure que la naturalisation ?",
    answer:
      "Elle peut se faire par décret, avec des modalités proches de la naturalisation mais des critères spécifiques liés à la perte et à la restitution de la nationalité.",
    category: "Réintégration dans la nationalité française",
    order: 40,
  },
  {
    id: 41,
    question: "Qu'est-ce que l'admission exceptionnelle au séjour (AES) ?",
    answer:
      "L'AES est une procédure dérogatoire qui permet à un étranger en situation irrégulière d'obtenir un titre de séjour dans des circonstances exceptionnelles ou pour des motifs humanitaires.",
    category: "Régularisation / Admission exceptionnelle au séjour",
    order: 41,
  },
  {
    id: 42,
    question: "Quels motifs peuvent justifier une régularisation ?",
    answer:
      "Les motifs peuvent être liés au travail, à la vie privée et familiale, au niveau d'intégration ou à des circonstances humanitaires particulières.",
    category: "Régularisation / Admission exceptionnelle au séjour",
    order: 42,
  },
  {
    id: 43,
    question: "Comment déposer une demande de régularisation ?",
    answer:
      "La demande se fait généralement par courrier adressé à la préfecture compétente, avec un formulaire spécifique et une liste détaillée de pièces justificatives.",
    category: "Régularisation / Admission exceptionnelle au séjour",
    order: 43,
  },
  {
    id: 44,
    question: "La régularisation est-elle un droit automatique ?",
    answer:
      "Non, il s'agit d'une procédure appréciée au cas par cas par le préfet, sans garantie de résultat.",
    category: "Régularisation / Admission exceptionnelle au séjour",
    order: 44,
  },
  {
    id: 45,
    question: "Quelles demandes sont liées au mariage avec un Français ?",
    answer:
      "Elles peuvent concerner un titre de séjour vie privée et familiale, une régularisation comme conjoint de Français et, dans certains cas, l'accès à la nationalité par mariage.",
    category:
      "Demandes liées au mariage, à la famille, au travail ou à la maladie",
    order: 45,
  },
  {
    id: 46,
    question: "Quelles démarches concernent les parents d'enfant français ?",
    answer:
      "Les parents d'enfant français peuvent, dans certains cas, obtenir un titre de séjour vie privée et familiale ou demander une régularisation spécifique.",
    category:
      "Demandes liées au mariage, à la famille, au travail ou à la maladie",
    order: 46,
  },
  {
    id: 47,
    question: "Quelles demandes sont liées à la maladie ?",
    answer:
      "Certains étrangers gravement malades peuvent solliciter un titre de séjour ou une régularisation pour raisons de santé, en fonction des critères médicaux et administratifs.",
    category:
      "Demandes liées au mariage, à la famille, au travail ou à la maladie",
    order: 47,
  },
  {
    id: 48,
    question:
      "Comment la situation professionnelle influence les demandes de séjour ?",
    answer:
      "Contrats de travail, métiers en tension, ancienneté de l'activité et autorisations de travail jouent un rôle dans les titres de séjour liés au travail et les régularisations par le travail.",
    category:
      "Demandes liées au mariage, à la famille, au travail ou à la maladie",
    order: 48,
  },
];

router.get("/faq", async (_req, res) => {
  res.json(items);
});

export default router;
