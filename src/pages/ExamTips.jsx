function ExamTips() {
  const beforeExamTips = [
    'Relire les différences entre IaaS, PaaS et SaaS.',
    'Revoir les notions de région, zone de disponibilité et groupe de ressources.',
    'Savoir distinguer Azure Policy, RBAC, tags et verrous.',
    'Comprendre les outils de coûts : Pricing Calculator, TCO Calculator et Cost Management.'
  ];

  const commonMistakes = [
    {
      title: 'Confondre RBAC et Azure Policy',
      text: 'RBAC sert à gérer qui peut faire quoi. Azure Policy sert à imposer des règles sur les ressources.'
    },
    {
      title: 'Mélanger région et zone de disponibilité',
      text: 'Une région est une zone géographique. Une zone de disponibilité est un datacenter séparé dans une région.'
    },
    {
      title: 'Oublier la responsabilité partagée',
      text: 'Plus le service est managé, moins le client gère l’infrastructure. En IaaS, le client garde plus de responsabilités.'
    }
  ];

  const examStrategy = [
    {
      step: '01',
      title: 'Lire les mots-clés',
      text: 'Les questions AZ-900 utilisent souvent des indices comme “gérer les coûts”, “contrôler l’accès” ou “imposer une règle”.'
    },
    {
      step: '02',
      title: 'Éliminer les réponses absurdes',
      text: 'Deux réponses sont souvent clairement hors sujet. Commence par les retirer mentalement.'
    },
    {
      step: '03',
      title: 'Ne pas surinterpréter',
      text: 'L’examen reste fondamental. Si une réponse semble trop technique, ce n’est pas toujours la bonne.'
    }
  ];

  return (
    <section>
      <div className="tips-hero">
        <div>
          <span className="section-label">Préparation</span>

          <h1>Conseils pour l’AZ-900</h1>

          <p>
            L’AZ-900 ne demande pas de configurer Azure comme un administrateur.
            Le plus important est de comprendre les services, les modèles cloud,
            la sécurité, les coûts et les bons cas d’usage.
          </p>
        </div>

        <aside className="tips-focus-card">
          <span>À garder en tête</span>
          <strong>Comprendre avant de mémoriser</strong>
          <p>
            Les questions testent surtout ta capacité à reconnaître le bon service
            ou le bon concept dans un scénario simple.
          </p>
        </aside>
      </div>

      <div className="tips-layout">
        <div className="tips-main">
          <span className="section-label">Avant l’examen</span>

          <h2>Checklist de révision</h2>

          <ul className="tips-checklist">
            {beforeExamTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>

        <aside className="tips-side-note">
          <h3>Bon réflexe</h3>

          <p>
            Quand tu hésites entre deux services, demande-toi d’abord si la question
            parle d’identité, de gouvernance, de coût, de réseau ou de stockage.
            Le domaine de la question donne souvent la réponse.
          </p>
        </aside>
      </div>

      <div className="mistakes-section">
        <div className="section-heading">
          <span>Pièges fréquents</span>
          <h2>Les confusions à éviter</h2>
        </div>

        <div className="mistakes-list">
          {commonMistakes.map((mistake) => (
            <article className="mistake-item" key={mistake.title}>
              <h3>{mistake.title}</h3>
              <p>{mistake.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="exam-strategy-section">
        <div className="section-heading">
          <span>Pendant le test</span>
          <h2>Méthode simple pour répondre</h2>
        </div>

        <div className="strategy-timeline">
          {examStrategy.map((item) => (
            <article className="strategy-step" key={item.step}>
              <span>{item.step}</span>

              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="exam-final-note">
        <span className="section-label">Objectif réaliste</span>

        <h2>Ce qu’il faut viser</h2>

        <p>
          Pour te sentir à l’aise, vise au moins 70% à l’examen blanc, puis essaie
          de stabiliser ton score autour de 80%. Si tu rates souvent les mêmes thèmes,
          retourne dans le mode entraînement et filtre par module.
        </p>
      </div>
    </section>
  );
}

export default ExamTips;