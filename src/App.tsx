import './assets/css/tailwind.css';
import './assets/css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Join from './views/Join';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <section>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
};

export default App;
