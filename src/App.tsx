import './assets/css/tailwind.css';
import './assets/css/style.css';
import { firebaseApp } from '../firebase';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Join from './views/Join';
import Home from './views/Home'

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <section>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
};

export default App;
