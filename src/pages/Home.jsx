import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import concepts from '../data/concepts.json';
import trainingQuestions from '../data/trainingQuestions.json';
import examQuestions from '../data/examQuestions.json';

function Home() {
  const totalQuestions = trainingQuestions.length + examQuestions.length;
  
  return (
    <section className="home-page">
      <div className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            Microsoft Azure Fundamentals
          </span>

          <h1>
            Révise l’AZ-900 avec une plateforme claire, interactive et moderne.
          </h1>

          <p>
            AZ-900 Guide regroupe les notions essentielles du cloud Microsoft Azure,
            des quiz interactifs et un mode examen blanc pour t’aider à préparer
            efficacement la certification Azure Fundamentals.
          </p>

          <div className="hero-buttons">
            <Link to="/quiz" className="primary-button">
              Commencer le quiz
            </Link>

            <Link to="/concepts" className="secondary-button">
              Explorer les notions
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h3>Ce que le guide AZ-900 offre :</h3>

          <ul className="hero-list">
            <li>{concepts.length} notions fondamentales d’Azure</li>
            <li>{trainingQuestions.length} questions d’entraînement</li>
            <li>{examQuestions.length} questions d’examen blanc</li>
            <li>{totalQuestions} questions au total</li>
            <li>Un suivi de progression personnalisé</li>
          </ul>
        </div>
      </div>

      <div className="features-section">
        <h2>Fonctionnalités principales</h2>

        <div className="features-grid">
          <article className="feature-card">
            <h3>Fiches synthétiques</h3>
            <p>
              Retrouve les concepts importants du cloud Azure expliqués de manière
              claire et concise.
            </p>
          </article>

          <article className="feature-card">
            <h3>Recherche rapide</h3>
            <p>
              Filtre les notions par catégorie ou retrouve rapidement un concept
              spécifique.
            </p>
          </article>

          <article className="feature-card">
            <h3>Quiz interactifs</h3>
            <p>
              Entraîne-toi avec des questions corrigées et débloque progressivement
              l’examen blanc.
            </p>
          </article>

          <article className="feature-card">
            <h3>Progression sauvegardée</h3>
            <p>
              Le site conserve automatiquement tes résultats et ton avancement.
            </p>
          </article>
        </div>
      </div>

      <div className="about-section">
        <h2>Pourquoi ce projet ?</h2>

        <p>
          Ce site a été développé dans le cadre d’un projet personnel autour de la
          certification Microsoft Azure Fundamentals (AZ-900). L’objectif est de
          transformer une formation théorique en une plateforme de révision plus
          interactive, structurée et pratique.
        </p>
      </div>
    </section>
  );
}

export default Home;