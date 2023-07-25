import './assets/css/tailwind.css';
import './assets/css/style.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Join from './views/Join';
import Home from './views/Home'
import AddAcount from './views/AddAcount'
import ScrollToTop from './components/common/ScrollToTop';
import TransferComplete from './components/main/TransferComplete';
import Keypad from './components/common/KeyPad';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <section>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddAcount />} />
          <Route path="/complete" element={<TransferComplete />} />
          <Route path="/keypad" element={<Keypad />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
};

export default App;
