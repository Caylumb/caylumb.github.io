import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.scss';
import KindOfAsyncMarkdown from './components/KindOfAsyncMarkdown/index.tsx';

const articles = import.meta.glob<string>('./assets/blogPosts/**/*.md', {
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
        {routeNames.map((name, i) => {
          let routePath: string = '';
          if (name !== 'index') {
            routePath = name;
          }
          return (
            <Route
              key={routePath}
              path={`/${routePath.toLowerCase()}`}
              element={<KindOfAsyncMarkdown markdownFetcher={articles[Object.keys(articles)[i]]} />}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
