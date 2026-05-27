import { useEffect, useState } from 'react';
import questionsData from '../data/questions.json';

const REQUIRED_CORRECT_ANSWERS = 50;
const EXAM_DURATION_SECONDS = 15 * 60;

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

function Quiz() {
  const [mode, setMode] = useState('training');
  const [hasStarted, setHasStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isValidated, setIsValidated] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const [trainingCorrectAnswers, setTrainingCorrectAnswers] = useState(0);
  const [trainingAttempts, setTrainingAttempts] = useState(0);
  const [bestExamScore, setBestExamScore] = useState(0);
  const [completedExam, setCompletedExam] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);

  const examUnlocked = trainingCorrectAnswers >= REQUIRED_CORRECT_ANSWERS;
  const currentQuestion = questions[currentQuestionIndex];

  const unlockProgress = Math.min(
    (trainingCorrectAnswers / REQUIRED_CORRECT_ANSWERS) * 100,
    100
  );

  useEffect(() => {
    setTrainingCorrectAnswers(Number(localStorage.getItem('trainingCorrectAnswers')) || 0);
    setTrainingAttempts(Number(localStorage.getItem('trainingAttempts')) || 0);
    setBestExamScore(Number(localStorage.getItem('bestExamScore')) || 0);
    setCompletedExam(Number(localStorage.getItem('completedExam')) || 0);
  }, []);

  useEffect(() => {
    if (mode !== 'exam' || !hasStarted || isFinished) return;

    if (timeLeft <= 0) {
      finishExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, hasStarted, isFinished, timeLeft]);

  function selectMode(selectedMode) {
    if (selectedMode === 'exam' && !examUnlocked) return;

    setMode(selectedMode);
    resetQuizState();
    setHasStarted(false);
  }

  function startQuiz() {
    setQuestions(shuffleArray(questionsData));
    setTimeLeft(EXAM_DURATION_SECONDS);
    resetQuizState();
    setHasStarted(true);
  }

  function resetQuizState() {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setIsValidated(false);
    setScore(0);
    setIsFinished(false);
  }

  function getCorrectAnswers(question) {
    return question.correctAnswers || [question.correctAnswer];
  }

  function isMultipleChoice(question) {
    return getCorrectAnswers(question).length > 1;
  }

  function handleAnswer(answer) {
    if (isValidated) return;

    if (!isMultipleChoice(currentQuestion)) {
      setSelectedAnswers([answer]);
      return;
    }

    if (selectedAnswers.includes(answer)) {
      setSelectedAnswers(selectedAnswers.filter((selected) => selected !== answer));
    } else {
      setSelectedAnswers([...selectedAnswers, answer]);
    }
  }

  function isAnswerCorrect() {
    const correctAnswers = getCorrectAnswers(currentQuestion);

    if (selectedAnswers.length !== correctAnswers.length) {
      return false;
    }

    return selectedAnswers.every((answer) => correctAnswers.includes(answer));
  }

  function validateAnswer() {
    if (selectedAnswers.length === 0 || isValidated) return;

    const correct = isAnswerCorrect();
    setIsValidated(true);

    if (mode === 'training') {
      const newAttempts = trainingAttempts + 1;
      setTrainingAttempts(newAttempts);
      localStorage.setItem('trainingAttempts', newAttempts);

      if (correct) {
        const newCorrectAnswers = trainingCorrectAnswers + 1;
        setTrainingCorrectAnswers(newCorrectAnswers);
        localStorage.setItem('trainingCorrectAnswers', newCorrectAnswers);
      }

      return;
    }

    if (correct) {
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
    setSelectedAnswers([]);
    setIsValidated(false);
  }

  function goToNextTrainingQuestion() {
    const nextIndex = (currentQuestionIndex + 1) % questions.length;

    if (nextIndex === 0) {
      setQuestions(shuffleArray(questionsData));
    }

    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswers([]);
    setIsValidated(false);
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
    startQuiz();
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
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  function getAnswerClass(answer) {
    if (!isValidated && selectedAnswers.includes(answer)) {
      return 'answer-button selected';
    }

    if (!isValidated) {
      return 'answer-button';
    }

    const correctAnswers = getCorrectAnswers(currentQuestion);

    if (correctAnswers.includes(answer)) {
      return 'answer-button correct';
    }

    if (selectedAnswers.includes(answer)) {
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
            <div className="progress-fill" style={{ width: `${unlockProgress}%` }} />
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
                Les questions sont mélangées et tournent en boucle parmi {questionsData.length} questions.
                Certaines questions peuvent avoir plusieurs bonnes réponses.
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
                L’examen blanc utilise les mêmes {questionsData.length} questions, mélangées.
                Tu disposes de {formatTime(EXAM_DURATION_SECONDS)} pour répondre.
                Le score est affiché uniquement à la fin.
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
        </div>
      )}

      {hasStarted && isFinished && (
        <div className="quiz-card">
          <h2>Résultat de l’examen blanc</h2>

          <p className="final-score">{currentExamScorePercentage}%</p>

          <p>
            Tu as obtenu {score} bonne(s) réponse(s) sur {questions.length}.
          </p>

          {timeLeft <= 0 && (
            <p className="locked-message">
              Temps écoulé. L’examen blanc s’est terminé automatiquement.
            </p>
          )}

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

      {hasStarted && !isFinished && currentQuestion && (
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
                : `Temps restant : ${formatTime(timeLeft)}`}
            </span>
          </div>

          <div className="question-meta">
            {currentQuestion.module && (
              <span className="question-category">{currentQuestion.module}</span>
            )}

            {currentQuestion.category && (
              <span className="question-category">{currentQuestion.category}</span>
            )}
          </div>

          {isMultipleChoice(currentQuestion) && (
            <p className="multiple-choice-info">
              Plusieurs réponses sont possibles.
            </p>
          )}

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

          {mode === 'training' && isValidated && (
            <div className="explanation">
              <strong>Explication :</strong>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="quiz-actions">
            {!isValidated && (
              <button
                className="primary-button"
                onClick={validateAnswer}
                disabled={selectedAnswers.length === 0}
              >
                Valider
              </button>
            )}

            {isValidated && (
              <button className="primary-button" onClick={handleNextQuestion}>
                {mode === 'exam' && currentQuestionIndex === questions.length - 1
                  ? 'Voir le résultat'
                  : 'Question suivante'}
              </button>
            )}

            {mode === 'training' && (
              <button className="secondary-button" onClick={backToMenu}>
                Retour au menu
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Quiz;