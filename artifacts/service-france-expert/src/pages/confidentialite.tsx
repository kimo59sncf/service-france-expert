import { Seo } from "@/components/seo";

export default function Confidentialite() {
  return (
    <div className="pt-8 pb-24">
      <Seo
        title="Politique de confidentialité"
        description="Découvrez comment Service France Expert collecte, utilise et protège vos données personnelles dans le cadre de nos prestations d'accompagnement administratif."
        path="/confidentialite"
        type="website"
      />

      <section className="bg-primary text-primary-foreground py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Politique de confidentialité
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto font-light leading-relaxed">
            Nous nous engageons à protéger vos données personnelles avec sérieux, transparence et rigueur.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-8 text-muted-foreground leading-relaxed">
        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">1. Responsable du traitement</h2>
          <p>
            Service France Expert, société privée, est responsable du traitement des données personnelles collectées via le site, les formulaires de contact, les consultations et les échanges de courrier électronique.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">2. Données collectées</h2>
          <p>
            Nous pouvons collecter les informations suivantes : prénom, nom, adresse e-mail, numéro de téléphone, informations relatives à votre situation administrative, documents transmis dans le cadre de votre dossier, et données de navigation techniques nécessaires au bon fonctionnement du site.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">3. Finalités de la collecte</h2>
          <p>
            Vos données sont utilisées pour : répondre à vos demandes, organiser une consultation ou un rendez-vous, préparer et suivre votre dossier, vous envoyer des informations utiles à votre démarche, établir des factures et respecter nos obligations légales et réglementaires.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">4. Base juridique</h2>
          <p>
            Le traitement repose, selon les cas, sur votre consentement, l’exécution d’un contrat, notre intérêt légitime à fournir un service de qualité, ou une obligation légale applicable à notre activité.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">5. Destinataires et transferts</h2>
          <p>
            Vos données peuvent être accessibles à nos collaborateurs, à nos prestataires techniques ou à des organismes compétents lorsque la loi l’exige. Elles ne sont ni vendues ni louées à des tiers à des fins commerciales.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">6. Conservation</h2>
          <p>
            Les données sont conservées pendant la durée nécessaire à la gestion de votre demande et, le cas échéant, à l’exécution de nos prestations, puis pendant les durées de conservation prévues par la loi ou les obligations comptables et fiscales.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">7. Vos droits</h2>
          <p>
            Conformément au Règlement général sur la protection des données, vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition, de limitation du traitement et de portabilité de vos données. Vous pouvez également retirer votre consentement à tout moment.
          </p>
          <p className="mt-3">
            Pour exercer vos droits, vous pouvez nous contacter à l’adresse suivante : <span className="font-medium text-primary">contact@servicefranceexpert.fr</span>.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">8. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données contre la perte, l’accès non autorisé, la divulgation ou toute altération illicite.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">9. Réclamations</h2>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL.
          </p>
        </div>
      </section>
    </div>
  );
}
