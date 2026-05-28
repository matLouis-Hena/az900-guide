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
            Un guide simple pour réviser l’AZ-900 sans se perdre dans la théorie.
          </h1>

          <p>
            AZ-900 Guide reprend les notions importantes de Microsoft Azure
            Fundamentals et les transforme en fiches, questions d’entraînement,
            suivi de progression et examen blanc.
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
              <p>Révision Azure interactive</p>
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
            <li>Entraînement par module</li>
            <li>Questions à choix multiples</li>
            <li>Examen blanc de 50 questions</li>
            <li>Progression sauvegardée</li>
          </ul>

          <div className="hero-card-footer">
            <span>Objectif</span>
            <strong>Réviser efficacement avant l’examen</strong>
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
                Commence par parcourir les fiches pour retrouver les concepts
                essentiels : cloud, services Azure, sécurité, gouvernance et coûts.
              </p>
            </div>
          </article>

          <article className="step-item">
            <span>02</span>
            <div>
              <h3>S’entraîner par module</h3>
              <p>
                Utilise le mode entraînement pour cibler un module précis et recevoir
                une correction immédiate après chaque réponse.
              </p>
            </div>
          </article>

          <article className="step-item">
            <span>03</span>
            <div>
              <h3>Passer l’examen blanc</h3>
              <p>
                Une fois débloqué, le mode examen blanc permet de tester tes acquis
                avec 50 questions en temps limité.
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
            Le contenu est organisé autour des grands modules de l’AZ-900 pour
            permettre une révision plus ciblée. L’idée n’est pas de remplacer la
            formation Microsoft, mais de proposer une autre manière de revoir les
            points importants.
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
            Le mode examen blanc reprend les questions de la banque principale,
            sans correction immédiate, pour garder une logique plus proche d’un
            vrai test.
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
          Ce site a été développé après ma formation Azure Fundamentals. L’objectif
          était de créer un support personnel plus interactif qu’un simple résumé :
          un outil qui permet de relire les notions, de s’entraîner, de suivre sa
          progression et de simuler un examen blanc.
        </p>

        <p>
          Le projet m’a aussi permis de travailler le déploiement d’une application
          web sur Azure, l’utilisation de GitHub Actions et la structuration d’un
          projet React autour d’un vrai besoin de révision.
        </p>
      </div>
    </section>
  );
}

export default Home;