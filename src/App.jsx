import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import routes from './routes';
import NotFoundPage from './pages/error/NotFoundPage.jsx';
import PageLoader from './components/PageLoader.jsx';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import LocaleRoot from './components/system/LocaleRoot.jsx';
import { AiMapLockProvider } from './hooks/useAiMapLock.jsx';

const parseEnvBoolean = (value, fallback = true) => {
  if (value == null || value === '') return fallback;

  switch (String(value).trim().toLowerCase()) {
    case '1':
    case 'true':
    case 'yes':
    case 'on':
      return true;
    case '0':
    case 'false':
    case 'no':
    case 'off':
      return false;
    default:
      return fallback;
  }
};

const isPreloaderEnabled = parseEnvBoolean(import.meta.env.VITE_ENABLE_PRELOADER, true);

const ScrollToTop = ({ lenisRef }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    const lenis = lenisRef?.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [hash, lenisRef, pathname]);

  return null;
};

const generateRoutes = (prefix = '', routeGroup = {}) =>
  Object.entries(routeGroup).map(([path, Component]) => (
    <Route key={`${prefix}${path}`} path={`${prefix}${path}`} element={<Component />} />
  ));


function App() {
  const [isLoading, setIsLoading] = useState(isPreloaderEnabled);
  const lenisRef = useSmoothScroll();

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <LocaleRoot>
      <AiMapLockProvider>
        <div className="">
          {isPreloaderEnabled && isLoading && <PageLoader onComplete={handleLoaderComplete} />}
          <Router>
            <ScrollToTop lenisRef={lenisRef} />
            <Routes>
              {routes.map(({ prefix, routes }) => generateRoutes(prefix, routes))}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </div>
      </AiMapLockProvider>
    </LocaleRoot>
  );
}

export default App;
