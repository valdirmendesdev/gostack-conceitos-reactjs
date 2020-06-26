import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      const repositories = response.data;
      setRepositories(repositories);
    });
  }, []);

  async function handleAddRepository() {
    api
      .post('repositories', {
        title: `New repository ${Date.now()}`,
        owner: 'Valdir',
      })
      .then((response) => {
        const repository = response.data;
        setRepositories([...repositories, repository]);
      });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      const changedRepositories = repositories.filter(repo => repo.id !== id)
      setRepositories(changedRepositories)
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
