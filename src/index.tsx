import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.scss';
import App from './pages/WatchThisSpace/App.tsx';
import ComponentList from './pages/componentList/ComponentList.tsx';
import KindOfAsyncMarkdown from './components/KindOfAsyncMarkdown/index.tsx';

const articles = import.meta.glob<string>('./assets/blogPosts/*.md', {
  query: '?raw',
  import: 'default',
});

const routeNames = Object.keys(articles).map((key) =>
  key
    .replace('./assets/blogPosts/', '')
    .replace('.md', '')
    .replace(/([A-Z])/g, ' $1')
    .trim(),
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/" element={<App />} />
        <Route path="/componentList" element={<ComponentList />} />
        {routeNames.map((name, i) => (
          <Route
            key={name}
            path={`/${name.toLowerCase()}`}
            element={<KindOfAsyncMarkdown markdownFetcher={articles[Object.keys(articles)[i]]} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
