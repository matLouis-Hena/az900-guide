import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Concepts from './pages/Concepts';
import Quiz from './pages/Quiz';
import ExamTips from './pages/ExamTips';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concepts" element={<Concepts />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/conseils" element={<ExamTips />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>
          AZ-900 Guide — Projet personnel autour de Microsoft Azure Fundamentals.
        </p>
      </footer>
    </BrowserRouter>
  );
}

export default App;