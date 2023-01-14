import React from 'react';
import './App.scss';
import { Routes , Route} from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={(<HomePage />)} />
        {/* <Route path="/phones" element={<ArticlePage />} />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
