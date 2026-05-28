import concepts from '../data/concepts.json';
import questions from '../data/questions.json';

const REQUIRED_CORRECT_ANSWERS = 50;
const EXAM_QUESTION_COUNT = 50;

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

  const unlockProgress = Math.min(
    Math.round((trainingCorrectAnswers / REQUIRED_CORRECT_ANSWERS) * 100),
    100
  );

  const globalProgress = Math.round(
    (conceptProgress + unlockProgress + bestExamScore) / 3
  );

  const remainingCorrectAnswers = Math.max(
    REQUIRED_CORRECT_ANSWERS - trainingCorrectAnswers,
    0
  );

  function capValue(value, max) {
    return Math.min(value, max);
  }

  const badges = [
    {
      title: 'Premiers pas Azure',
      unlocked: trainingCorrectAnswers >= 10,
      description: `${capValue(trainingCorrectAnswers, 10)} / 10 bonnes réponses en entraînement.`
    },
    {
      title: 'Explorateur Cloud',
      unlocked: viewedConceptsCount >= 10,
      description: `${capValue(viewedConceptsCount, 10)} / 10 notions consultées.`
    },
    {
      title: 'Examen débloqué',
      unlocked: examUnlocked,
      description: `${capValue(trainingCorrectAnswers, REQUIRED_CORRECT_ANSWERS)} / ${REQUIRED_CORRECT_ANSWERS} bonnes réponses nécessaires.`
    },
    {
      title: 'Bon niveau AZ-900',
      unlocked: bestExamScore >= 70,
      description: `${capValue(bestExamScore, 70)} / 70% atteint.`
    },
    {
      title: 'Prêt pour l’AZ-900',
      unlocked: bestExamScore >= 80,
      description: `${capValue(bestExamScore, 80)} / 80% atteint.`
    },
    {
      title: 'Révision complète',
      unlocked: conceptProgress === 100,
      description: `${capValue(viewedConceptsCount, concepts.length)} / ${concepts.length} notions consultées.`
    }
  ];

  return (
    <section>
      <h1>Progression</h1>

      <p className="page-description">
        Suis ton avancement dans les notions Azure, les questions d’entraînement
        et l’examen blanc.
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
          <span>Questions disponibles</span>
          <strong>{questions.length}</strong>
          <p>Questions utilisées pour l’entraînement et l’examen blanc.</p>
        </article>

        <article className="progress-card">
          <span>Bonnes réponses</span>
          <strong>{trainingCorrectAnswers}</strong>
          <p>{trainingAccuracy}% de réussite en entraînement.</p>
        </article>

        <article className="progress-card">
          <span>Déblocage examen</span>
          <strong>{examUnlocked ? 'Débloqué' : `${unlockProgress}%`}</strong>
          <p>
            {examUnlocked
              ? 'Le mode examen blanc est disponible.'
              : `${remainingCorrectAnswers} bonne(s) réponse(s) restante(s).`}
          </p>
        </article>

        <article className="progress-card">
          <span>Format examen blanc</span>
          <strong>{EXAM_QUESTION_COUNT}</strong>
          <p>Questions aléatoires avec un score final.</p>
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
            Continue le mode entraînement. L’objectif actuel est d’atteindre
            {` ${REQUIRED_CORRECT_ANSWERS} `}bonnes réponses pour débloquer
            l’examen blanc.
          </p>
        )}

        {examUnlocked && bestExamScore < 70 && (
          <p>
            L’examen blanc est débloqué. Essaie maintenant d’obtenir au moins
            70% pour valider une bonne base avant de viser plus haut.
          </p>
        )}

        {bestExamScore >= 70 && bestExamScore < 80 && (
          <p>
            Tu as déjà un niveau correct. Pour renforcer ta préparation, vise
            maintenant au moins 80% à l’examen blanc.
          </p>
        )}

        {bestExamScore >= 80 && (
          <p>
            Très bon niveau. Tu peux maintenant revoir les notions où tu hésites
            encore et refaire quelques questions ciblées par module.
          </p>
        )}
      </div>
    </section>
  );
}

export default Progress;