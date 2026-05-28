function ExamTips() {
  const beforeExamTips = [
    'Refaire quelques questions sur chaque module pour repérer les thèmes faibles.',
    'Relire les fiches des notions où tu hésites encore.',
    'Revoir les outils de coûts si tu confonds estimation, suivi et optimisation.',
    'Repasser un examen blanc complet dans les conditions prévues : 50 questions, 45 minutes.',
    'Garder une attention particulière aux questions à plusieurs bonnes réponses.'
  ];

  const commonMistakes = [
    {
      title: 'Confondre RBAC et Azure Policy',
      text: 'RBAC sert à gérer les droits des utilisateurs. Azure Policy sert à imposer des règles sur les ressources.'
    },
    {
      title: 'Mélanger région et zone de disponibilité',
      text: 'Une région correspond à un emplacement géographique Azure. Une zone de disponibilité est un datacenter séparé à l’intérieur d’une région.'
    },
    {
      title: 'Oublier la responsabilité partagée',
      text: 'En IaaS, le client garde plus de responsabilités. En SaaS, le fournisseur gère beaucoup plus d’éléments.'
    },
    {
      title: 'Choisir un outil de coût au hasard',
      text: 'Pricing Calculator sert à estimer un coût avant déploiement. Cost Management sert à suivre les coûts réels.'
    }
  ];

  const examStrategy = [
    {
      step: '01',
      title: 'Repérer le thème de la question',
      text: 'Demande-toi d’abord si la question parle de coût, sécurité, réseau, stockage, gouvernance ou identité.'
    },
    {
      step: '02',
      title: 'Chercher les mots-clés',
      text: 'Des expressions comme “imposer une règle”, “gérer les accès” ou “estimer les coûts” orientent souvent vers le bon service.'
    },
    {
      step: '03',
      title: 'Éliminer les réponses hors sujet',
      text: 'Dans beaucoup de questions, une ou deux réponses peuvent être retirées directement parce qu’elles ne correspondent pas au besoin.'
    },
    {
      step: '04',
      title: 'Rester au niveau fondamental',
      text: 'L’AZ-900 reste une certification d’introduction. La bonne réponse est souvent le service le plus logique, pas forcément le plus technique.'
    }
  ];

  return (
    <section>
      <div className="tips-hero">
        <div>
          <span className="section-label">Préparation</span>

          <h1>Conseils pour l’AZ-900</h1>

          <p>
            L’AZ-900 vérifie surtout la compréhension des concepts Azure. Il ne faut
            pas connaître tous les détails techniques, mais il faut savoir reconnaître
            le bon service ou le bon principe dans un scénario simple.
          </p>
        </div>

        <aside className="tips-focus-card">
          <span>À retenir</span>
          <strong>Comprendre avant de mémoriser</strong>
          <p>
            Les questions sont souvent formulées autour d’un besoin. Si tu comprends
            le besoin, tu peux généralement retrouver le service attendu.
          </p>
        </aside>
      </div>

      <div className="tips-layout">
        <div className="tips-main">
          <span className="section-label">Préparation finale</span>

          <h2>À faire avant de se tester</h2>

          <ul className="tips-checklist">
            {beforeExamTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>

        <aside className="tips-side-note">
          <h3>Bon réflexe</h3>

          <p>
            Quand tu hésites entre deux réponses, reviens toujours au besoin de départ.
            Par exemple, une question sur les permissions pointe souvent vers RBAC,
            alors qu’une question sur les règles de conformité pointe plutôt vers
            Azure Policy.
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
          <h2>Une méthode simple pour répondre</h2>
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
        <span className="section-label">Objectif</span>

        <h2>Quand considérer que c’est suffisant ?</h2>

        <p>
          Sur ce guide, obtenir 70% à l’examen blanc montre que les bases sont là.
          Viser 80% est plus confortable, surtout si les erreurs restantes sont
          réparties sur plusieurs thèmes. Si tu rates souvent le même module, le plus
          efficace est de retourner dans l’entraînement ciblé.
        </p>
      </div>
    </section>
  );
}

export default ExamTips;