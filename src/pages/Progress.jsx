import concepts from '../data/concepts.json';

const REQUIRED_CORRECT_ANSWERS = 50;

function Progress() {
  const viewedConcepts =
    JSON.parse(localStorage.getItem('viewedConcepts')) || [];

  const trainingCorrectAnswers =
    Number(localStorage.getItem('trainingCorrectAnswers')) || 0;

  const trainingAttempts =
    Number(localStorage.getItem('trainingAttempts')) || 0;

  const bestExamScore =
    Number(localStorage.getItem('bestExamScore')) || 0;

  const completedExam =
    Number(localStorage.getItem('completedExam')) || 0;

  const viewedConceptsCount = viewedConcepts.length;
  const conceptProgress = Math.round(
    (viewedConceptsCount / concepts.length) * 100
  );

  const examUnlocked = trainingCorrectAnswers >= REQUIRED_CORRECT_ANSWERS;

  const trainingAccuracy =
    trainingAttempts > 0
      ? Math.round((trainingCorrectAnswers / trainingAttempts) * 100)
      : 0;

  const globalProgress = Math.round(
    (conceptProgress + Math.min(trainingCorrectAnswers * 10, 100) + bestExamScore) / 3
  );

  const badges = [
    {
      title: 'Débutant Azure',
      unlocked: trainingCorrectAnswers >= 5,
      description: 'Obtenir au moins 5 bonnes réponses en entraînement.'
    },
    {
      title: 'Explorateur Cloud',
      unlocked: viewedConceptsCount >= 5,
      description: 'Consulter au moins 5 notions Azure.'
    },
    {
      title: 'Examen débloqué',
      unlocked: examUnlocked,
      description: 'Débloquer le mode examen blanc.'
    },
    {
      title: 'Prêt pour l’AZ-900',
      unlocked: bestExamScore >= 80,
      description: 'Obtenir au moins 80% à l’examen blanc.'
    }
  ];

  return (
    <section>
      <h1>Progression</h1>

      <p className="page-description">
        Suis ton avancement dans la révision des notions Azure et dans les quiz.
      </p>

      <div className="progress-overview">
        <div>
          <span>Progression globale</span>
          <strong>{globalProgress}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${globalProgress}%` }}
          />
        </div>
      </div>

      <div className="progress-grid">
        <article className="progress-card">
          <span>Notions consultées</span>
          <strong>
            {viewedConceptsCount} / {concepts.length}
          </strong>
          <p>{conceptProgress}% des notions ont été ouvertes.</p>
        </article>

        <article className="progress-card">
          <span>Bonnes réponses</span>
          <strong>{trainingCorrectAnswers}</strong>
          <p>{trainingAccuracy}% de réussite en entraînement.</p>
        </article>

        <article className="progress-card">
          <span>Examen blanc</span>
          <strong>{examUnlocked ? 'Débloqué' : 'Verrouillé'}</strong>
          <p>
            {examUnlocked
              ? 'Tu peux passer l’examen blanc.'
              : `${REQUIRED_CORRECT_ANSWERS - trainingCorrectAnswers} bonnes réponses restantes.`}
          </p>
        </article>

        <article className="progress-card">
          <span>Meilleur score examen</span>
          <strong>{bestExamScore}%</strong>
          <p>{completedExam} tentative(s) terminée(s).</p>
        </article>
      </div>

      <div className="badges-section">
        <h2>Badges</h2>

        <div className="badges-grid">
          {badges.map((badge) => (
            <article
              className={badge.unlocked ? 'badge-card unlocked' : 'badge-card'}
              key={badge.title}
            >
              <span>{badge.unlocked ? '✓' : '🔒'}</span>
              <h3>{badge.title}</h3>
              <p>{badge.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="recommendation-card">
        <h2>Recommandation</h2>

        {!examUnlocked && (
          <p>
            Continue le mode entraînement pour débloquer l’examen blanc. C’est la
            meilleure étape pour renforcer les bases avant de te tester.
          </p>
        )}

        {examUnlocked && bestExamScore < 80 && (
          <p>
            L’examen blanc est débloqué. Essaie maintenant d’atteindre au moins 80%
            pour valider une bonne maîtrise des notions principales.
          </p>
        )}

        {bestExamScore >= 80 && (
          <p>
            Très bon niveau. Tu peux maintenant revoir les notions où tu hésites encore
            et refaire quelques questions pour consolider tes acquis.
          </p>
        )}
      </div>
    </section>
  );
}

export default Progress;