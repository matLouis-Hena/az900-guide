import { useEffect, useState } from 'react';
import concepts from '../data/concepts.json';

function Concepts() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [openedConcepts, setOpenedConcepts] = useState([]);

  useEffect(() => {
    const savedConcepts =
      JSON.parse(localStorage.getItem('viewedConcepts')) || [];

    setOpenedConcepts(savedConcepts);
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
    let updatedConcepts;

    if (openedConcepts.includes(conceptId)) {
      updatedConcepts = openedConcepts.filter((id) => id !== conceptId);
    } else {
      updatedConcepts = [...openedConcepts, conceptId];
    }

    setOpenedConcepts(updatedConcepts);
    localStorage.setItem('viewedConcepts', JSON.stringify(updatedConcepts));
  }

  return (
    <section>
      <h1>Notions Azure</h1>

      <p className="page-description">
        Retrouve ici les notions importantes à connaître pour l’examen AZ-900.
      </p>

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