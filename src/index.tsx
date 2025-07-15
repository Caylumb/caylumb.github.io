import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.scss';
import App from './pages/WatchThisSpace/App.tsx';
import ComponentList from './pages/componentList/ComponentList.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/" element={<App />} />
        <Route path="/componentList" element={<ComponentList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
