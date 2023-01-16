import React from 'react';
import './App.scss';
import { Routes , Route} from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { ArticlePage } from './pages/ArticlePage/ArticlePage';
import { NotFound } from './pages/NotFound/NotFound';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={(<HomePage />)} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
