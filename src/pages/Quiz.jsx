import { useEffect, useState } from 'react';
import questionsData from '../data/questions.json';

const EXAM_QUESTION_COUNT = 5;
const REQUIRED_CORRECT_ANSWERS = 50;
const EXAM_DURATION_SECONDS = 1 * 60;

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
  const [selectedModule, setSelectedModule] = useState('Tous');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const examUnlocked = trainingCorrectAnswers >= REQUIRED_CORRECT_ANSWERS;
  const [examAnswersSummary, setExamAnswersSummary] = useState([]);
  
  const currentQuestion = questions[currentQuestionIndex];
  const modules = [
    'Tous',
    ...new Set(questionsData.map((question) => question.module)),
  ];

  const categories = [
    'Toutes',
    ...new Set(
      questionsData
        .filter((question) => {
          return selectedModule === 'Tous' || question.module === selectedModule;
        })
        .map((question) => question.category)
    ),
  ];

  const filteredTrainingQuestions = questionsData.filter((question) => {
    const matchesModule =
      selectedModule === 'Tous' || question.module === selectedModule;

    const matchesCategory =
      selectedCategory === 'Toutes' || question.category === selectedCategory;

    return matchesModule && matchesCategory;
  });

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

  useEffect(() => {
    if (mode !== 'exam' || !hasStarted || isFinished) {
      return;
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [mode, hasStarted, isFinished]);

  function selectMode(selectedMode) {
    if (selectedMode === 'exam' && !examUnlocked) return;

    setMode(selectedMode);
    resetQuizState();
    setHasStarted(false);
  }

  function resetTrainingFilters() {
    setSelectedModule('Tous');
    setSelectedCategory('Toutes');
  }

  function startQuiz() {
    const sourceQuestions =
      mode === 'training'
        ? filteredTrainingQuestions
        : questionsData;

    const selectedQuestions =
      mode === 'exam'
        ? shuffleArray(sourceQuestions).slice(0, EXAM_QUESTION_COUNT)
        : shuffleArray(sourceQuestions);

    setQuestions(selectedQuestions);
    setTimeLeft(EXAM_DURATION_SECONDS);
    resetQuizState();

    if (mode === 'exam') {
      localStorage.setItem('examInProgress', 'true');
    }

    setHasStarted(true);
  }

  function resetQuizState() {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setIsValidated(false);
    setScore(0);
    setIsFinished(false);
    setExamAnswersSummary([]);
  }

  function getCorrectAnswers(question) {
    return question.correctAnswers || [question.correctAnswer];
  }

  function isMultipleChoice(question) {
    return getCorrectAnswers(question).length > 1;
  }

  function handleAnswer(answer) {
    if (isValidated) return;

    if (mode === 'exam' && !isMultipleChoice(currentQuestion)) {
      submitExamAnswer([answer]);
      return;
    }

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

  function submitExamAnswer(answers) {
    const correctAnswers = getCorrectAnswers(currentQuestion);

    const isCorrect =
      answers.length === correctAnswers.length &&
      answers.every((answer) => correctAnswers.includes(answer));

    const newScore = isCorrect ? score + 1 : score;

    const answerSummary = {
      id: currentQuestion.id,
      module: currentQuestion.module,
      category: currentQuestion.category,
      question: currentQuestion.question,
      selectedAnswers: answers,
      correctAnswers,
      explanation: currentQuestion.explanation,
      isCorrect
    };

    setExamAnswersSummary((previousSummary) => [
      ...previousSummary,
      answerSummary
    ]);

    setScore(newScore);

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      finishExam(newScore);
      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
    setSelectedAnswers([]);
    setIsValidated(false);
  }

  function validateAnswer() {
    if (selectedAnswers.length === 0 || isValidated) return;

    if (mode === 'exam') {
      submitExamAnswer(selectedAnswers);
      return;
    }

    const correct = isAnswerCorrect();
    setIsValidated(true);

    const newAttempts = trainingAttempts + 1;
    setTrainingAttempts(newAttempts);
    localStorage.setItem('trainingAttempts', newAttempts);

    if (correct) {
      const newCorrectAnswers = trainingCorrectAnswers + 1;
      setTrainingCorrectAnswers(newCorrectAnswers);
      localStorage.setItem('trainingCorrectAnswers', newCorrectAnswers);
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
      setQuestions(shuffleArray(filteredTrainingQuestions));
    }

    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswers([]);
    setIsValidated(false);
  }

  function finishExam(finalScoreValue = score) {
    localStorage.removeItem('examInProgress');

    setIsFinished(true);

    const finalScore = calculatePercentage(finalScoreValue, questions.length);
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
    localStorage.removeItem('examInProgress');
  }

  function resetProgress() {
    localStorage.removeItem('trainingCorrectAnswers');
    localStorage.removeItem('trainingAttempts');
    localStorage.removeItem('bestExamScore');
    localStorage.removeItem('completedExam');
    localStorage.removeItem('examInProgress');

    setTrainingCorrectAnswers(50);
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
    if (mode === 'exam') {
      if (selectedAnswers.includes(answer)) {
        return 'answer-button selected';
      }

      return 'answer-button';
    }

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
  const examFeedback = getExamFeedback(currentExamScorePercentage);
  
  function getExamFeedback(scorePercentage) {
    if (scorePercentage >= 80) {
      return {
        title: 'Très bon résultat',
        text: 'Tu as un bon niveau sur les notions principales. Continue à t’entraîner pour consolider les points où tu hésites encore.'
      };
    }

    if (scorePercentage >= 70) {
      return {
        title: 'Bon résultat',
        text: 'Tu es sur une bonne base. Vise maintenant au moins 80% pour être plus à l’aise.'
      };
    }

    if (scorePercentage >= 50) {
      return {
        title: 'Résultat moyen',
        text: 'Les bases sont là, mais certaines notions doivent encore être retravaillées.'
      };
    }

    return {
      title: 'À retravailler',
      text: 'Reprends l’entraînement par module pour renforcer les notions avant de retenter l’examen blanc.'
    };
  }

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
                Les questions sont mélangées et tournent en boucle. Tu peux réviser tout le contenu
                ou cibler un module précis de l’AZ-900.      
                Certaines questions peuvent avoir plusieurs bonnes réponses.
              </p>

              <div className="training-filters-header">
                <h3>Révision ciblée</h3>

                <button
                  className="clear-filters-button"
                  onClick={resetTrainingFilters}
                  disabled={selectedModule === 'Tous' && selectedCategory === 'Toutes'}
                >
                  Réinitialiser les filtres
                </button>
              </div>

              <div className="training-filters">
                <div>
                  <label>Module</label>
                  <select
                    value={selectedModule}
                    onChange={(event) => {
                      setSelectedModule(event.target.value);
                      setSelectedCategory('Toutes');
                    }}
                  >
                    {modules.map((module) => (
                      <option value={module} key={module}>
                        {module}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Catégorie</label>
                  <select
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                  >
                    {categories.map((category) => (
                      <option value={category} key={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="active-filter-card">
                <span>Filtre actif</span>

                <strong>
                  {selectedModule === 'Tous' && selectedCategory === 'Toutes'
                    ? 'Toutes les questions'
                    : `${selectedModule} ${
                        selectedCategory !== 'Toutes' ? `— ${selectedCategory}` : ''
                      }`}
                </strong>

                <p>
                  {filteredTrainingQuestions.length} question(s) disponible(s) avec ce filtre.
                </p>
              </div>

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
              <div className="exam-intro-header">
                <div>
                  <h2>Mode examen blanc</h2>
                  <p>
                    Mets-toi dans des conditions proches de l’examen AZ-900 : temps limité,
                    questions mélangées et résultat uniquement à la fin.
                  </p>
                </div>

                <span className="exam-badge">Simulation</span>
              </div>

              <div className="exam-rules">
                <article>
                  <span>Questions</span>
                  <strong>{EXAM_QUESTION_COUNT}</strong>
                  <p>Tirées aléatoirement depuis la banque de questions.</p>
                </article>

                <article>
                  <span>Durée</span>
                  <strong>{formatTime(EXAM_DURATION_SECONDS)}</strong>
                  <p>Le quiz se termine automatiquement à la fin du temps.</p>
                </article>

                <article>
                  <span>Correction</span>
                  <strong>Fin uniquement</strong>
                  <p>Aucune explication n’est affichée pendant l’examen.</p>
                </article>
              </div>

              <div className="exam-warning">
                <strong>Avant de commencer</strong>
                <p>
                  Une fois lancé, l’examen blanc démarre directement. Réponds à chaque
                  question puis valide pour passer à la suivante.
                </p>
              </div>

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
                Lancer l’examen blanc
              </button>
            </div>
          )}
        </div>
      )}

      {hasStarted && isFinished && (
        <div className="quiz-card">
          <h2>Résultat de l’examen blanc</h2>

          <div className="exam-result-summary">
            <p className="final-score">{currentExamScorePercentage}%</p>

            <div>
              <strong>
                {score} / {questions.length} bonnes réponses
              </strong>

              <span>
                Objectif conseillé : 70% minimum, 80% pour être plus à l’aise.
              </span>
            </div>
          </div>

          <div className="exam-feedback-card">
            <h3>{examFeedback.title}</h3>
            <p>{examFeedback.text}</p>
          </div>

          <div className="exam-review">
            <h3>Résumé des réponses</h3>

            <div className="exam-review-list">
              {examAnswersSummary.map((answer, index) => (
                <article
                  className={
                    answer.isCorrect
                      ? 'exam-review-card correct'
                      : 'exam-review-card wrong'
                  }
                  key={`${answer.id}-${index}`}
                >
                  <div className="exam-review-header">
                    <span>Question {index + 1}</span>
                    <strong>{answer.isCorrect ? 'Correct' : 'Incorrect'}</strong>
                  </div>

                  <div className="question-meta">
                    {answer.module && (
                      <span className="question-category">{answer.module}</span>
                    )}

                    {answer.category && (
                      <span className="question-category">{answer.category}</span>
                    )}
                  </div>

                  <h4>{answer.question}</h4>

                  <div className="review-answer-block">
                    <span>Ta réponse</span>
                    <ul>
                      {answer.selectedAnswers.map((selectedAnswer) => (
                        <li key={selectedAnswer}>{selectedAnswer}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="review-answer-block">
                    <span>Bonne réponse</span>
                    <ul>
                      {answer.correctAnswers.map((correctAnswer) => (
                        <li key={correctAnswer}>{correctAnswer}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="review-explanation">
                    {answer.explanation}
                  </p>
                </article>
              ))}
            </div>
          </div>

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
              Plusieurs réponses sont possibles. Sélectionne toutes les bonnes réponses.
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
            {!isValidated && (mode === 'training' || isMultipleChoice(currentQuestion)) && (
              <button
                className="primary-button"
                onClick={validateAnswer}
                disabled={selectedAnswers.length === 0}
              >
                {mode === 'exam' ? 'Valider et continuer' : 'Valider'}
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