import { Link } from 'react-router-dom';
import concepts from '../data/concepts.json';
import questions from '../data/questions.json';

function Home() {
  return (
    <section className="home-page">
      <div className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            Microsoft Azure Fundamentals
          </span>

          <h1>
            Un guide simple pour réviser l’AZ-900 sans se noyer dans la théorie.
          </h1>

          <p>
            Ce site reprend les notions importantes de la formation Azure Fundamentals
            et les organise sous forme de fiches, de quiz et d’examen blanc. L’objectif
            est de rendre la révision plus directe, plus pratique et plus facile à suivre.
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
          <div className="hero-card-header">
            <span className="hero-card-icon">☁</span>

            <div>
              <h3>AZ-900 Guide</h3>
              <p>Support de révision interactif</p>
            </div>
          </div>

          <div className="hero-card-stats">
            <div>
              <strong>{concepts.length}</strong>
              <span>notions</span>
            </div>

            <div>
              <strong>{questions.length}</strong>
              <span>questions</span>
            </div>
          </div>

          <ul className="hero-list">
            <li>Questions classées par module</li>
            <li>Correction immédiate en entraînement</li>
            <li>Examen blanc de 50 questions</li>
            <li>Progression sauvegardée dans le navigateur</li>
          </ul>

          <div className="hero-card-footer">
            <span>Objectif</span>
            <strong>Réviser Azure de manière plus active</strong>
          </div>
        </div>
      </div>

      <div className="home-steps-section">
        <div className="section-heading">
          <span>Parcours de révision</span>
          <h2>Comment utiliser le guide ?</h2>
        </div>

        <div className="steps-list">
          <article className="step-item">
            <span>01</span>

            <div>
              <h3>Revoir les notions</h3>
              <p>
                Commence par parcourir les fiches pour retrouver les concepts importants :
                modèles cloud, services Azure, sécurité, gouvernance, coûts et supervision.
              </p>
            </div>
          </article>

          <article className="step-item">
            <span>02</span>

            <div>
              <h3>S’entraîner par module</h3>
              <p>
                Le mode entraînement permet de cibler un module précis et d’obtenir une
                correction directement après chaque réponse.
              </p>
            </div>
          </article>

          <article className="step-item">
            <span>03</span>

            <div>
              <h3>Passer l’examen blanc</h3>
              <p>
                Une fois débloqué, l’examen blanc permet de tester ses acquis avec
                50 questions, un temps limité et un résultat affiché à la fin.
              </p>
            </div>
          </article>
        </div>
      </div>

      <div className="revision-section">
        <div className="revision-main">
          <span className="section-label">Contenu</span>

          <h2>Ce que tu peux réviser</h2>

          <p>
            Le contenu suit les grands thèmes de l’AZ-900. Le but n’est pas de remplacer
            la formation officielle Microsoft, mais de proposer un support complémentaire
            pour revoir les points importants autrement.
          </p>

          <div className="module-list">
            <div>
              <strong>Module 1</strong>
              <span>Concepts du cloud</span>
            </div>

            <div>
              <strong>Module 2</strong>
              <span>Architecture et services Azure</span>
            </div>

            <div>
              <strong>Module 3</strong>
              <span>Gestion, gouvernance et coûts</span>
            </div>
          </div>
        </div>

        <aside className="revision-side">
          <h3>Mode examen</h3>

          <p>
            L’examen blanc reprend les questions de la banque principale, mais sans
            afficher la correction pendant le test. Le résumé complet est disponible
            uniquement à la fin.
          </p>

          <ul>
            <li>50 questions</li>
            <li>45 minutes</li>
            <li>Score final</li>
            <li>Résumé des réponses</li>
          </ul>
        </aside>
      </div>

      <div className="project-reason">
        <span className="section-label">Projet personnel</span>

        <h2>Pourquoi ce projet ?</h2>

        <p>
          Ce projet a été réalisé après ma formation Azure Fundamentals. Je voulais
          créer quelque chose d’utile pour réviser, plutôt qu’un simple résumé statique.
          Le site me permet de retravailler les notions vues en formation tout en les
          présentant sous une forme plus interactive.
        </p>

        <p>
          Il m’a aussi permis de pratiquer le développement React, le versioning avec
          GitHub, le déploiement sur Azure App Service et l’automatisation avec GitHub
          Actions.
        </p>
      </div>
    </section>
  );
}

export default Home;