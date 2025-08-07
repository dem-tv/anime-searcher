import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from './components/layouts/ErrorBoundary/ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router';
import { RouterConfiguration } from './router/RouterConfiguration.tsx';
import { routes } from './router/routes.tsx';
import { setupStore } from './store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './components/ui/Theme/ThemeProvider.tsx';

function initApp() {
  const store = setupStore();

  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Unable to find root element');
  }

  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <BrowserRouter>
            <Provider store={store}>
              <RouterConfiguration routes={routes} />
            </Provider>
          </BrowserRouter>
        </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}

initApp();
