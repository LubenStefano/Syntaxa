import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    const isMainPage = location.pathname === '/';
    document.body.classList.toggle('main-page', isMainPage);
    document.body.classList.toggle('default-page', !isMainPage);
  }, [location]);

  return <>{children}</>;
}
