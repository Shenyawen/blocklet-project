import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './app.css';
import Home from './pages/home';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/:hash" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
