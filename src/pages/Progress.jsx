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

  function getRecommendation() {
    if (!examUnlocked) {
      return {
        title: 'Continuer l’entraînement',
        text: `Il te reste ${remainingCorrectAnswers} bonne(s) réponse(s) pour débloquer l’examen blanc.`,
        action: 'Objectif actuel : atteindre 50 bonnes réponses.'
      };
    }

    if (bestExamScore < 70) {
      return {
        title: 'Passer un premier examen blanc',
        text: 'L’examen blanc est débloqué. Le prochain objectif est d’obtenir au moins 70%.',
        action: 'Objectif conseillé : 70%.'
      };
    }

    if (bestExamScore < 80) {
      return {
        title: 'Stabiliser ton score',
        text: 'Tu as déjà une bonne base. Viser 80% permet d’être plus à l’aise avec les notions principales.',
        action: 'Objectif conseillé : 80%.'
      };
    }

    return {
      title: 'Travailler les derniers points faibles',
      text: 'Ton score est solide. Le plus utile maintenant est de refaire quelques questions ciblées par module.',
      action: 'Objectif : garder un score stable.'
    };
  }

  const recommendation = getRecommendation();

  const badges = [
    {
      title: 'Premiers pas Azure',
      unlocked: trainingCorrectAnswers >= 10,
      description: `${capValue(trainingCorrectAnswers, 10)} / 10 bonnes réponses.`
    },
    {
      title: 'Explorateur Cloud',
      unlocked: viewedConceptsCount >= 10,
      description: `${capValue(viewedConceptsCount, 10)} / 10 notions consultées.`
    },
    {
      title: 'Examen débloqué',
      unlocked: examUnlocked,
      description: `${capValue(trainingCorrectAnswers, REQUIRED_CORRECT_ANSWERS)} / ${REQUIRED_CORRECT_ANSWERS} bonnes réponses.`
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
      <div className="progress-hero">
        <div>
          <span className="section-label">Progression</span>

          <h1>Où tu en es</h1>

          <p>
            Cette page regroupe ton avancement dans les fiches, l’entraînement
            et l’examen blanc. Elle sert surtout à savoir quoi travailler ensuite.
          </p>
        </div>

        <div className="progress-score-block">
          <span>Progression globale</span>
          <strong>{globalProgress}%</strong>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${globalProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="progress-layout">
        <div className="progress-main-panel">
          <h2>Résumé actuel</h2>

          <div className="progress-lines">
            <div>
              <span>Notions ouvertes</span>
              <strong>{viewedConceptsCount} / {concepts.length}</strong>
              <small>{conceptProgress}% des fiches consultées</small>
            </div>

            <div>
              <span>Questions disponibles</span>
              <strong>{questions.length}</strong>
              <small>Utilisées en entraînement et en examen blanc</small>
            </div>

            <div>
              <span>Entraînement</span>
              <strong>{trainingCorrectAnswers} bonnes réponses</strong>
              <small>{trainingAccuracy}% de réussite sur {trainingAttempts} réponse(s)</small>
            </div>

            <div>
              <span>Examen blanc</span>
              <strong>{examUnlocked ? 'Débloqué' : `${unlockProgress}%`}</strong>
              <small>
                {examUnlocked
                  ? `${EXAM_QUESTION_COUNT} questions en temps limité`
                  : `${remainingCorrectAnswers} bonne(s) réponse(s) restante(s)`}
              </small>
            </div>

            <div>
              <span>Meilleur score</span>
              <strong>{bestExamScore}%</strong>
              <small>{completedExam} tentative(s) terminée(s)</small>
            </div>
          </div>
        </div>

        <aside className="next-step-panel">
          <span className="section-label">Prochaine étape</span>

          <h2>{recommendation.title}</h2>

          <p>{recommendation.text}</p>

          <div className="next-step-note">
            {recommendation.action}
          </div>
        </aside>
      </div>

      <div className="badges-section redesigned">
        <div className="section-heading">
          <span>Badges</span>
          <h2>Repères de progression</h2>
        </div>

        <div className="badges-list">
          {badges.map((badge) => (
            <article
              className={badge.unlocked ? 'badge-row unlocked' : 'badge-row'}
              key={badge.title}
            >
              <span className="badge-status">
                {badge.unlocked ? '✓' : '🔒'}
              </span>

              <div>
                <h3>{badge.title}</h3>
                <p>{badge.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Progress;