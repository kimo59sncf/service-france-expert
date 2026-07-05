import { Seo } from "@/components/seo";

export default function Cgv() {
  return (
    <div className="pt-8 pb-24">
      <Seo
        title="Conditions générales de vente"
        description="Consultez les conditions générales de vente de Service France Expert pour nos prestations d'accompagnement administratif et de conseil."
        path="/cgv"
        type="website"
      />

      <section className="bg-primary text-primary-foreground py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Conditions générales de vente
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto font-light leading-relaxed">
            Les présentes conditions régissent l’offre de prestations de Service France Expert.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-8 text-muted-foreground leading-relaxed">
        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">1. Objet</h2>
          <p>
            Les présentes conditions générales de vente s’appliquent à toutes les prestations fournies par Service France Expert, notamment l’accompagnement administratif, la préparation de dossiers, l’analyse de situation, le conseil et le suivi de démarches.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">2. Prestations proposées</h2>
          <p>
            Les prestations sont proposées sur la base d’un échange initial, d’un audit de situation, d’une proposition d’accompagnement et d’un engagement de réalisation. Elles peuvent inclure l’analyse d’un dossier, la préparation de pièces, le conseil méthodologique, le suivi des démarches et la coordination des étapes nécessaires à la bonne avancée du dossier.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">3. Devis et facturation</h2>
          <p>
            Les tarifs sont communiqués préalablement par devis ou sur simple proposition commerciale. Toute prestation est facturée selon les conditions convenues au moment de la commande. Les tarifs sont exprimés en euros, hors éventuels frais annexes, sauf indication contraire.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">4. Paiement</h2>
          <p>
            Le paiement est dû selon les modalités prévues dans le devis ou la facture. En l’absence de précision, le règlement est exigible à la prise en charge de la prestation ou selon les échéances convenues par écrit.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">5. Annulation et report</h2>
          <p>
            En cas d’annulation ou de report d’un rendez-vous ou d’une prestation, le client doit informer Service France Expert dans les meilleurs délais. Selon la date d’annulation et l’état d’avancement de la prestation, des frais peuvent être appliqués.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">6. Obligations du client</h2>
          <p>
            Le client s’engage à fournir des informations complètes, sincères et à jour, à transmettre les pièces demandées dans les délais impartis et à respecter les consignes données par l’équipe d’accompagnement. Toute omission ou information incomplète peut compromettre la qualité ou la rapidité de la prestation.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">7. Limite de responsabilité</h2>
          <p>
            Service France Expert agit en qualité d’accompagnant administratif et ne pourra en aucun cas être tenu responsable des décisions prises par les administrations, des délais de traitement, des refus, des erreurs de documents fournis par le client ou des événements indépendants de sa volonté.
          </p>
          <p className="mt-3">
            La responsabilité de Service France Expert est limitée au montant des prestations effectivement payées pour la mission concernée, sauf cas de faute grave ou de dol.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">8. Confidentialité et données personnelles</h2>
          <p>
            Les informations communiquées par le client sont traitées avec confidentialité et conformément à la politique de confidentialité disponible sur ce site.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-3">9. Droit applicable</h2>
          <p>
            Les présentes conditions sont régies par le droit français. Tout litige relatif à leur interprétation ou à leur exécution sera porté devant les juridictions compétentes du ressort de Paris, sauf disposition contraire impérative.
          </p>
        </div>
      </section>
    </div>
  );
}
