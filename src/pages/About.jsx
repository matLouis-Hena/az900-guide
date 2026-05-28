function About() {
  return (
    <section>
      <div className="about-hero">
        <div>
          <span className="section-label">Projet personnel</span>

          <h1>À propos du projet</h1>

          <p>
            AZ-900 Guide est un mini-projet développé autour de la certification
            Microsoft Azure Fundamentals. Il transforme le contenu de la formation
            en support de révision interactif, avec des fiches, des quiz, un examen
            blanc et un suivi de progression.
          </p>
        </div>

        <aside className="about-focus-card">
          <span>Idée principale</span>
          <strong>Réviser Azure autrement</strong>
          <p>
            Le site ne remplace pas la documentation officielle. Il sert surtout de
            support complémentaire pour revoir les notions et tester sa compréhension.
          </p>
        </aside>
      </div>

      <div className="about-story">
        <span className="section-label">Contexte</span>

        <h2>Pourquoi avoir créé ce site ?</h2>

        <p>
          Après avoir terminé la formation Azure Fundamentals, je devais réaliser un
          projet personnel lié au cours. J’ai choisi de créer une plateforme de révision
          pour rester dans le sujet Azure tout en construisant une vraie application web.
        </p>

        <p>
          L’objectif n’était pas de faire un projet très complexe, mais un projet propre,
          fonctionnel et cohérent avec la formation suivie. Le site permet donc de revoir
          les notions, de s’entraîner par module, de passer un examen blanc et de suivre
          son avancement.
        </p>
      </div>

      <div className="about-layout">
        <div className="about-main-panel">
          <h2>Technologies utilisées</h2>

          <p>
            L’application est volontairement simple : les données sont stockées dans des
            fichiers JSON et la progression est conservée localement dans le navigateur.
          </p>

          <ul className="about-tech-list">
            <li>React pour construire l’interface</li>
            <li>Vite pour le développement et le build</li>
            <li>React Router pour la navigation</li>
            <li>JSON pour stocker les notions et les questions</li>
            <li>LocalStorage pour sauvegarder la progression</li>
            <li>GitHub pour le versioning</li>
            <li>GitHub Actions pour le déploiement automatique</li>
            <li>Azure App Service pour héberger le site</li>
          </ul>
        </div>

        <aside className="about-side-panel">
          <h2>Compétences travaillées</h2>

          <p>
            Le projet m’a permis de relier la théorie vue dans la formation avec une
            réalisation concrète déployée sur Azure.
          </p>

          <ul className="about-learning-list">
            <li>Structurer une application React</li>
            <li>Manipuler des données JSON</li>
            <li>Gérer un état utilisateur avec React</li>
            <li>Sauvegarder des données dans le navigateur</li>
            <li>Déployer une application sur Azure</li>
            <li>Automatiser un déploiement avec GitHub Actions</li>
            <li>Corriger des erreurs de build et de configuration</li>
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
                Mise en place de l’application React, des pages principales, de la
                navigation et de la structure du projet.
              </p>
            </div>
          </article>

          <article className="about-timeline-item">
            <span>02</span>

            <div>
              <h3>Ajout du contenu Azure</h3>
              <p>
                Création des notions et des questions autour des modules principaux
                de l’AZ-900.
              </p>
            </div>
          </article>

          <article className="about-timeline-item">
            <span>03</span>

            <div>
              <h3>Développement du quiz</h3>
              <p>
                Ajout du mode entraînement, des filtres, des questions à choix multiples,
                du mode examen blanc et du résumé final.
              </p>
            </div>
          </article>

          <article className="about-timeline-item">
            <span>04</span>

            <div>
              <h3>Déploiement sur Azure</h3>
              <p>
                Publication du site sur Azure App Service avec un déploiement automatique
                depuis GitHub Actions.
              </p>
            </div>
          </article>
        </div>
      </div>

      <div className="about-limits">
        <span className="section-label">Limites</span>

        <h2>Ce que le projet ne fait pas encore</h2>

        <p>
          Le site reste un mini-projet. Il n’utilise pas de base de données, ne gère pas
          de comptes utilisateurs et ne remplace pas un simulateur officiel de certification.
          La progression est uniquement sauvegardée dans le navigateur utilisé.
        </p>

        <p>
          Des améliorations possibles seraient l’ajout d’un backend, d’un historique
          détaillé des résultats, ou d’un système de comptes pour retrouver sa progression
          depuis plusieurs appareils.
        </p>
      </div>
    </section>
  );
}

export default About;