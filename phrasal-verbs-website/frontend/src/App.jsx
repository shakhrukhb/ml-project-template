import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [phrasalVerbs, setPhrasalVerbs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchPhrasalVerbs();
  }, []);

  useEffect(() => {
    fetchPhrasalVerbs();
  }, [selectedCategory, searchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPhrasalVerbs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      const response = await axios.get(`${API_URL}/phrasal-verbs`, { params });
      setPhrasalVerbs(response.data);
    } catch (error) {
      console.error('Error fetching phrasal verbs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📚 English Phrasal Verbs</h1>
        <p className="subtitle">Learn from "English for Everyone: English Phrasal Verbs"</p>
      </header>

      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search phrasal verbs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <label htmlFor="category-filter">Filter by Category: </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <main className="main-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : phrasalVerbs.length === 0 ? (
          <div className="no-results">
            <p>No phrasal verbs found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="phrasal-verbs-grid">
            {phrasalVerbs.map((pv) => (
              <div key={pv.id} className="phrasal-verb-card">
                <h3 className="verb-title">{pv.verb}</h3>
                <span className="category-tag">{pv.category}</span>
                <p className="meaning"><strong>Meaning:</strong> {pv.meaning}</p>
                <p className="example"><strong>Example:</strong> {pv.example}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2024 English Phrasal Verbs Learning Website</p>
      </footer>
    </div>
  );
}

export default App;
