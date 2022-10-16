import './App.css';
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import FCHeader from './Components/FCHeader';
import 'react-alice-carousel/lib/alice-carousel.css';


function App() {

  return (
    <>
      <FCHeader />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/coinPage' element={<CoinPage />} />
      </Routes>
    </>
  );
}

export default App;
