import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from './components/layouts/ErrorBoundary/ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router';
import { RouterConfiguration } from './router/RouterConfiguration.tsx';
import { routes } from './router/routes.tsx';
import store from './store';
import { Provider } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <RouterConfiguration routes={routes} />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
