import { useState } from 'react';
import concepts from '../data/concepts.json';

function Concepts() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  const categories = [
    'Toutes',
    ...new Set(concepts.map((concept) => concept.category)),
  ];

  const filteredConcepts = concepts.filter((concept) => {
    const matchesSearch =
      concept.title.toLowerCase().includes(search.toLowerCase()) ||
      concept.definition.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Toutes' || concept.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
        {filteredConcepts.map((concept) => (
          <article className="concept-card" key={concept.id}>
            <span className="concept-category">{concept.category}</span>
            <h2>{concept.title}</h2>
            <p>{concept.definition}</p>

            <div className="concept-extra">
              <strong>Exemple :</strong>
              <p>{concept.example}</p>
            </div>

            <div className="concept-tip">
              <strong>À retenir :</strong>
              <p>{concept.examTip}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Concepts;