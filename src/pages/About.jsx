function About() {
  return (
    <section>
      <h1>À propos du projet</h1>

      <p className="page-description">
        AZ-900 Guide est un projet personnel développé autour de la certification
        Microsoft Azure Fundamentals (AZ-900).
      </p>

      <div className="about-grid">
        <article className="about-card">
          <h2>Objectif du projet</h2>

          <p>
            L’objectif principal du projet est de transformer une formation Azure
            théorique en une plateforme de révision plus interactive et plus pratique.
          </p>

          <p>
            Le site centralise des notions Azure importantes, des quiz, un système
            de progression et un mode d’examen blanc.
          </p>
        </article>

        <article className="about-card">
          <h2>Technologies utilisées</h2>

          <ul>
            <li>React</li>
            <li>Vite</li>
            <li>React Router</li>
            <li>Git & GitHub</li>
            <li>Azure App Service</li>
            <li>GitHub Actions (CI/CD)</li>
            <li>LocalStorage</li>
          </ul>
        </article>

        <article className="about-card">
          <h2>Compétences développées</h2>

          <ul>
            <li>Développement frontend React</li>
            <li>Gestion d’état et composants</li>
            <li>Déploiement cloud Azure</li>
            <li>CI/CD avec GitHub Actions</li>
            <li>Structuration d’un projet web</li>
            <li>UX et interface utilisateur</li>
          </ul>
        </article>

        <article className="about-card">
          <h2>Difficultés rencontrées</h2>

          <p>
            Le principal défi du projet a été le déploiement Azure et la configuration
            correcte d’App Service pour héberger une application React/Vite.
          </p>

          <p>
            Le projet a également nécessité l’apprentissage de React et du routing
            frontend.
          </p>
        </article>
      </div>
    </section>
  );
}

export default About;