function About() {
  return (
    <section>
      <div className="about-hero">
        <div>
          <span className="section-label">Projet personnel</span>

          <h1>À propos du projet</h1>

          <p>
            AZ-900 Guide est un projet développé autour de la certification
            Microsoft Azure Fundamentals. Le but est de transformer une formation
            théorique en un support de révision plus interactif, plus visuel et plus
            pratique à utiliser.
          </p>
        </div>

        <aside className="about-focus-card">
          <span>Objectif principal</span>
          <strong>Réviser Azure autrement</strong>
          <p>
            Le site ne remplace pas la formation officielle, mais propose une façon
            plus directe de revoir les notions importantes et de tester ses acquis.
          </p>
        </aside>
      </div>

      <div className="about-story">
        <span className="section-label">Contexte</span>

        <h2>Pourquoi avoir créé ce site ?</h2>

        <p>
          Après avoir terminé la formation Azure Fundamentals, il fallait réaliser un
          mini-projet personnel en lien avec le cours. J’ai choisi de créer une
          plateforme de révision pour l’AZ-900, car cela permettait de rester proche
          du sujet Azure tout en construisant un vrai projet web déployé dans le cloud.
        </p>

        <p>
          L’idée était de ne pas simplement refaire un résumé classique, mais de
          proposer un outil qui regroupe des fiches, des questions, un entraînement
          filtrable, un examen blanc et un suivi de progression.
        </p>
      </div>

      <div className="about-layout">
        <div className="about-main-panel">
          <h2>Technologies utilisées</h2>

          <p>
            Le projet repose sur une application React simple, avec des données
            stockées en JSON et une sauvegarde locale de la progression dans le
            navigateur.
          </p>

          <ul className="about-tech-list">
            <li>React pour l’interface utilisateur</li>
            <li>Vite pour le développement et le build</li>
            <li>React Router pour la navigation entre les pages</li>
            <li>JSON pour stocker les notions et les questions</li>
            <li>LocalStorage pour conserver la progression</li>
            <li>GitHub pour le versioning du projet</li>
            <li>GitHub Actions pour le déploiement automatique</li>
            <li>Azure App Service pour l’hébergement du site</li>
          </ul>
        </div>

        <aside className="about-side-panel">
          <h2>Compétences travaillées</h2>

          <p>
            Le projet m’a permis de relier le contenu de la formation Azure avec une
            réalisation concrète.
          </p>

          <ul className="about-learning-list">
            <li>Structurer une application React</li>
            <li>Manipuler des données JSON</li>
            <li>Gérer un état utilisateur</li>
            <li>Déployer une application sur Azure</li>
            <li>Automatiser un déploiement avec GitHub Actions</li>
            <li>Corriger des problèmes de build et de configuration</li>
          </ul>
        </aside>
      </div>

      <div className="about-story">
        <span className="section-label">Déroulement</span>

        <h2>Étapes importantes du projet</h2>

        <div className="about-timeline">
          <article className="about-timeline-item">
            <span>01</span>

            <div>
              <h3>Création de la base du site</h3>
              <p>
                Mise en place de l’application React, des pages principales et de la
                navigation.
              </p>
            </div>
          </article>

          <article className="about-timeline-item">
            <span>02</span>

            <div>
              <h3>Ajout du contenu Azure</h3>
              <p>
                Création des notions et des questions liées aux modules principaux de
                l’AZ-900.
              </p>
            </div>
          </article>

          <article className="about-timeline-item">
            <span>03</span>

            <div>
              <h3>Développement du quiz</h3>
              <p>
                Ajout du mode entraînement, des filtres, des questions à choix
                multiples et du mode examen blanc.
              </p>
            </div>
          </article>

          <article className="about-timeline-item">
            <span>04</span>

            <div>
              <h3>Déploiement sur Azure</h3>
              <p>
                Publication du site sur Azure App Service avec un déploiement
                automatique depuis GitHub.
              </p>
            </div>
          </article>
        </div>
      </div>

      <div className="about-limits">
        <span className="section-label">Limites</span>

        <h2>Ce que le projet ne fait pas encore</h2>

        <p>
          Le site reste un mini-projet. Il n’utilise pas de base de données, ne gère
          pas de comptes utilisateurs et ne remplace pas un vrai simulateur officiel
          de certification. La progression est sauvegardée localement dans le
          navigateur.
        </p>

        <p>
          Des améliorations possibles seraient l’ajout d’un backend, d’un historique
          détaillé des résultats, ou d’un système de comptes pour retrouver sa
          progression depuis plusieurs appareils.
        </p>
      </div>
    </section>
  );
}

export default About;