import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { SushiCountProvider } from './providers/SushiCountProvider';
import Kitchen from './pages/Kitchen';

function App() {
  return (

    <SushiCountProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> {/* 👈 Renders at /app/ */}
          <Route path="/susans-kitchen" element={<Kitchen />} /> {/* 👈 Renders at /app/ */}

        </Routes>

      </BrowserRouter>
    </SushiCountProvider>
  );
}

export default App;
