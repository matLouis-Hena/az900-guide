import { useEffect, useState } from 'react';
import concepts from '../data/concepts.json';

function Concepts() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [openedConcepts, setOpenedConcepts] = useState([]);
  const [viewedConcepts, setViewedConcepts] = useState([]);

  useEffect(() => {
    const savedViewedConcepts =
      JSON.parse(localStorage.getItem('viewedConcepts')) || [];

    setViewedConcepts(savedViewedConcepts);
  }, []);

  const sortedConcepts = [...concepts].sort((a, b) =>
    a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' })
  );

  const categories = [
    'Toutes',
    ...new Set(sortedConcepts.map((concept) => concept.category)),
  ].sort((a, b) => {
    if (a === 'Toutes') return -1;
    if (b === 'Toutes') return 1;
    return a.localeCompare(b, 'fr', { sensitivity: 'base' });
  });

  const filteredConcepts = sortedConcepts.filter((concept) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      concept.title.toLowerCase().includes(searchValue) ||
      concept.definition.toLowerCase().includes(searchValue) ||
      concept.category.toLowerCase().includes(searchValue);

    const matchesCategory =
      selectedCategory === 'Toutes' ||
      concept.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  function toggleConcept(conceptId) {
    if (openedConcepts.includes(conceptId)) {
      setOpenedConcepts(openedConcepts.filter((id) => id !== conceptId));
    } else {
      setOpenedConcepts([...openedConcepts, conceptId]);

      if (!viewedConcepts.includes(conceptId)) {
        const updatedViewedConcepts = [...viewedConcepts, conceptId];

        setViewedConcepts(updatedViewedConcepts);
        localStorage.setItem(
          'viewedConcepts',
          JSON.stringify(updatedViewedConcepts)
        );
      }
    }
  }

  return (
    <section>
      <div className="concepts-hero">
        <div>
          <span className="section-label">Fiches de révision</span>

          <h1>Notions Azure</h1>

          <p>
            Parcours les concepts importants de l’AZ-900, filtre par catégorie et ouvre
            les fiches pour consulter les exemples et les points à retenir.
          </p>
        </div>

        <aside className="concepts-focus-card">
          <span>Contenu disponible</span>
          <strong>{concepts.length} notions</strong>
          <p>
            Les fiches sont triées par ordre alphabétique pour retrouver plus facilement
            une notion précise.
          </p>
        </aside>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher une notion..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

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

      <p className="result-count">
        {filteredConcepts.length} notion(s) trouvée(s)
      </p>

      <div className="concept-grid">
        {filteredConcepts.map((concept) => {
          const isOpened = openedConcepts.includes(concept.id);

          return (
            <article
              className={isOpened ? 'concept-card opened' : 'concept-card'}
              key={concept.id}
            >
              <div
                className="concept-header"
                onClick={() => toggleConcept(concept.id)}
              >
                <div>
                  <span className="concept-category">
                    {concept.category}
                  </span>

                  <h2>{concept.title}</h2>
                </div>

                <button className="expand-button">
                  {isOpened ? '−' : '+'}
                </button>
              </div>

              <p>{concept.definition}</p>

              {isOpened && (
                <div className="concept-details">
                  <div className="concept-extra">
                    <strong>Exemple :</strong>
                    <p>{concept.example}</p>
                  </div>

                  <div className="concept-tip">
                    <strong>À retenir :</strong>
                    <p>{concept.examTip}</p>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Concepts;