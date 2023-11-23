import Sidebar from './components/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Films from './pages/Films';
import People from './pages/People';
import Planets from './pages/Planets';
import Species from './pages/Species';
import Starships from './pages/Starships';
import Vehicles from './pages/Vehicles';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <div className="main">
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/films" element={<Films />} />
            <Route path="/people" element={<People />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/species" element={<Species />} />
            <Route path="/starships" element={<Starships />} />
            <Route path="/vehicles" element={<Vehicles />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  )
}

export default App
