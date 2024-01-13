import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Error from './Pages/Error/Error';

function App() {
  return (
    <>
      <Routes>
        <Route exact path={'/'} element={<Home />} />
        <Route path={'/*'} element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
