
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FiveOperationsPage from './pages/5.jsx';
import TenOperationsPage from './pages/10.jsx';
import FifteenOperationsPage from './pages/15.jsx';
import TwentyOperationsPage from './pages/20.jsx';
import TwentyFiveOperationsPage from './pages/25.jsx';
// ignore this file for now its just a template that we will be working on afterwards
function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/5" element={<FiveOperationsPage />} />
        <Route path="/10" element={<TenOperationsPage />} />
        <Route path="/15" element={< FifteenOperationsPage/>} />
        <Route path="/20" element={<TwentyOperationsPage/>} />
        <Route path="/25" element={<TwentyFiveOperationsPage/>} />
        
      </Routes>
    </Router>
  );
}

export default App
