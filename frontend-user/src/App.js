import './App.css';
import Welcome from './sections/Welcome';
import CafeMenu from './components/CafeMenu';
import Games from './sections/Games';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    
      <div className="App">
        <Welcome/>
        <CafeMenu/>
        <Router>
        <Routes>
          <Route path="/" element={<Games />} />
          <Route path="/games/tic-tac-toe" element={<p>Tic Tac Toe Game</p>} />
          <Route path="/games/memory" element={<p>Memory Game</p>} />
          <Route path="/games/hangman" element={<p>Hangman Game</p>} />
        </Routes>
      
    </Router>
    </div>
  );
}

export default App;
