import { useEffect, useState } from 'react';
import trainingQuestions from '../data/trainingQuestions.json';
import examQuestions from '../data/examQuestions.json';

const REQUIRED_CORRECT_ANSWERS = 10;

function Quiz() {
  const [mode, setMode] = useState('training');
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const [trainingCorrectAnswers, setTrainingCorrectAnswers] = useState(0);
  const [trainingAttempts, setTrainingAttempts] = useState(0);
  const [bestExamScore, setBestExamScore] = useState(0);
  const [completedExam, setCompletedExam] = useState(0);

  const questions = mode === 'training' ? trainingQuestions : examQuestions;
  const currentQuestion = questions[currentQuestionIndex];

  const examUnlocked = trainingCorrectAnswers >= REQUIRED_CORRECT_ANSWERS;
  const unlockProgress = Math.min(
    (trainingCorrectAnswers / REQUIRED_CORRECT_ANSWERS) * 100,
    100
  );

  useEffect(() => {
    setTrainingCorrectAnswers(
      Number(localStorage.getItem('trainingCorrectAnswers')) || 0
    );
    setTrainingAttempts(Number(localStorage.getItem('trainingAttempts')) || 0);
    setBestExamScore(Number(localStorage.getItem('bestExamScore')) || 0);
    setCompletedExam(Number(localStorage.getItem('completedExam')) || 0);
  }, []);

  function selectMode(selectedMode) {
    if (selectedMode === 'exam' && !examUnlocked) return;

    setMode(selectedMode);
    resetQuizState();
    setHasStarted(false);
  }

  function startQuiz() {
    resetQuizState();
    setHasStarted(true);
  }

  function resetQuizState() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setIsFinished(false);
  }

  function handleAnswer(answer) {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (mode === 'training') {
      const newAttempts = trainingAttempts + 1;
      setTrainingAttempts(newAttempts);
      localStorage.setItem('trainingAttempts', newAttempts);

      if (answer === currentQuestion.correctAnswer) {
        const newCorrectAnswers = trainingCorrectAnswers + 1;
        setTrainingCorrectAnswers(newCorrectAnswers);
        localStorage.setItem('trainingCorrectAnswers', newCorrectAnswers);
      }

      return;
    }

    if (answer === currentQuestion.correctAnswer) {
      setScore((previousScore) => previousScore + 1);
    }
  }

  function handleNextQuestion() {
    if (mode === 'training') {
      goToNextTrainingQuestion();
      return;
    }

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      finishExam();
      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
    setSelectedAnswer('');
  }

  function goToNextTrainingQuestion() {
    const nextIndex = (currentQuestionIndex + 1) % trainingQuestions.length;

    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswer('');
  }

  function finishExam() {
    setIsFinished(true);

    const finalScore = calculatePercentage(score, questions.length);
    const newCompletedExam = completedExam + 1;

    setCompletedExam(newCompletedExam);
    localStorage.setItem('completedExam', newCompletedExam);

    if (finalScore > bestExamScore) {
      setBestExamScore(finalScore);
      localStorage.setItem('bestExamScore', finalScore);
    }
  }

  function restartQuiz() {
    resetQuizState();
    setHasStarted(true);
  }

  function backToMenu() {
    resetQuizState();
    setHasStarted(false);
  }

  function resetProgress() {
    localStorage.removeItem('trainingCorrectAnswers');
    localStorage.removeItem('trainingAttempts');
    localStorage.removeItem('bestExamScore');
    localStorage.removeItem('completedExam');

    setTrainingCorrectAnswers(0);
    setTrainingAttempts(0);
    setBestExamScore(0);
    setCompletedExam(0);

    setMode('training');
    setHasStarted(false);
    resetQuizState();
  }

  function calculatePercentage(value, total) {
    return Math.round((value / total) * 100);
  }

  function getAnswerClass(answer) {
    if (!selectedAnswer) return 'answer-button';

    if (answer === currentQuestion.correctAnswer) {
      return 'answer-button correct';
    }

    if (answer === selectedAnswer) {
      return 'answer-button wrong';
    }

    return 'answer-button disabled';
  }

  const currentExamScorePercentage = calculatePercentage(score, questions.length);

  return (
    <section>
      <h1>Quiz AZ-900</h1>

      <p className="page-description">
        {examUnlocked
          ? 'Examen blanc débloqué. Tu peux maintenant tester tes connaissances dans des conditions plus proches de l’examen.'
          : `Réponds correctement à ${REQUIRED_CORRECT_ANSWERS} questions en entraînement pour débloquer l’examen blanc.`}
      </p>

      {!examUnlocked && (
        <div className="progress-section">
          <div className="progress-header">
            <span>Déblocage examen blanc</span>
            <span>
              {trainingCorrectAnswers} / {REQUIRED_CORRECT_ANSWERS} bonnes réponses
            </span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${unlockProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="reset-section">
        <button className="reset-button" onClick={resetProgress}>
          Réinitialiser la progression
        </button>
      </div>

      {!hasStarted && (
        <div className="quiz-menu">
          <div className="mode-tabs">
            <button
              className={mode === 'training' ? 'mode-tab active' : 'mode-tab'}
              onClick={() => selectMode('training')}
            >
              Entraînement
            </button>

            <button
              className={
                mode === 'exam'
                  ? 'mode-tab active unlocked-highlight'
                  : examUnlocked
                    ? 'mode-tab unlocked-highlight'
                    : 'mode-tab'
              }
              onClick={() => selectMode('exam')}
              disabled={!examUnlocked}
            >
              Examen blanc
            </button>
          </div>

          {mode === 'training' && (
            <div className="mode-panel">
              <h2>Mode entraînement</h2>
              <p>
                Les questions sont mélangées et tournent en boucle parmi 
                 {trainingQuestions.length} questions.
              </p>

              <div className="mode-stats">
                <div>
                  <span>Bonnes réponses</span>
                  <strong>{trainingCorrectAnswers}</strong>
                </div>

                <div>
                  <span>Questions tentées</span>
                  <strong>{trainingAttempts}</strong>
                </div>
              </div>

              <button className="primary-button" onClick={startQuiz}>
                Commencer l’entraînement
              </button>
            </div>
          )}

          {mode === 'exam' && (
            <div className="mode-panel">
              <h2>Mode examen blanc</h2>
              <p>
                Réponds aux questions sans correction immédiate. Le score est affiché
                uniquement à la fin.
              </p>
              <p>
                L’examen blanc contient {examQuestions.length} questions mélangées.
              </p>

              <div className="mode-stats">
                <div>
                  <span>Meilleur score</span>
                  <strong>{bestExamScore}%</strong>
                </div>

                <div>
                  <span>Tentatives</span>
                  <strong>{completedExam}</strong>
                </div>
              </div>

              <button className="primary-button" onClick={startQuiz}>
                Commencer l’examen blanc
              </button>
            </div>
          )}

          {!examUnlocked && (
            <p className="locked-message">
              Le mode examen blanc est verrouillé. Continue l’entraînement pour le débloquer.
            </p>
          )}
        </div>
      )}

      {hasStarted && isFinished && (
        <div className="quiz-card">
          <h2>Résultat de l’examen blanc</h2>

          <p className="final-score">{currentExamScorePercentage}%</p>

          <p>
            Tu as obtenu {score} bonne(s) réponse(s) sur {questions.length}.
          </p>

          <div className="quiz-actions">
            <button className="primary-button" onClick={restartQuiz}>
              Recommencer
            </button>

            <button className="secondary-button" onClick={backToMenu}>
              Retour au menu
            </button>
          </div>
        </div>
      )}

      {hasStarted && !isFinished && (
        <div className="quiz-card">
          <div className="quiz-header">
            <span>
              {mode === 'training'
                ? `Question d’entraînement ${currentQuestionIndex + 1}`
                : `Question ${currentQuestionIndex + 1} / ${questions.length}`}
            </span>

            <span>
              {mode === 'training'
                ? `${trainingCorrectAnswers} bonnes réponses`
                : `Score : ${score}`}
            </span>
          </div>

          <h2>{currentQuestion.question}</h2>

          <div className="answers">
            {currentQuestion.answers.map((answer) => (
              <button
                key={answer}
                className={getAnswerClass(answer)}
                onClick={() => handleAnswer(answer)}
              >
                {answer}
              </button>
            ))}
          </div>

          {mode === 'training' && selectedAnswer && (
            <div className="explanation">
              <strong>Explication :</strong>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}

          {selectedAnswer && (
            <button className="primary-button" onClick={handleNextQuestion}>
              {mode === 'training'
                ? 'Question suivante'
                : currentQuestionIndex === questions.length - 1
                  ? 'Voir le résultat'
                  : 'Question suivante'}
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default Quiz;