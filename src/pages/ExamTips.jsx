const tips = [
  {
    title: 'Comprendre plutôt qu’apprendre par cœur',
    text: 'L’AZ-900 évalue surtout la compréhension des concepts cloud et des cas d’usage des services Azure.'
  },
  {
    title: 'Bien différencier IaaS, PaaS et SaaS',
    text: 'C’est une distinction fondamentale. Il faut savoir qui gère quoi entre Microsoft et le client.'
  },
  {
    title: 'Ne pas confondre RBAC et Azure Policy',
    text: 'RBAC répond à “qui peut faire quoi ?”. Azure Policy répond à “qu’est-ce qui est autorisé ?”.'
  },
  {
    title: 'Retenir les services principaux',
    text: 'Azure App Service, Virtual Machines, Azure Storage, Azure SQL, Azure Monitor et Microsoft Entra ID reviennent souvent.'
  },
  {
    title: 'Faire attention aux mots-clés',
    text: 'Les questions utilisent souvent des indices comme coût, disponibilité, gouvernance, identité ou supervision.'
  },
  {
    title: 'S’entraîner avec des questions',
    text: 'Les quiz permettent de repérer les notions mal comprises et de s’habituer à la logique de l’examen.'
  }
];

function ExamTips() {
  return (
    <section>
      <h1>Conseils pour l’examen</h1>

      <p className="page-description">
        Quelques conseils pratiques pour mieux aborder l’examen Microsoft Azure Fundamentals.
      </p>

      <div className="tips-grid">
        {tips.map((tip) => (
          <article className="tip-card" key={tip.title}>
            <h2>{tip.title}</h2>
            <p>{tip.text}</p>
          </article>
        ))}
      </div>

      <div className="exam-reminder">
        <h2>À retenir</h2>
        <p>
          Pour réussir l’AZ-900, il faut surtout maîtriser les grands principes du cloud,
          les services Azure les plus importants, la sécurité, la gouvernance et la gestion
          des coûts.
        </p>
      </div>
    </section>
  );
}

export default ExamTips;