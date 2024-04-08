import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

function HandleRedirect() {
  
  useEffect(() => {
    localStorage.setItem('validRedirect', 'true');
  }, []);
  
  // Redirect to /KPIs_form_frontend without changing the URL visibly
  return <Navigate to="/KPIs_form_frontend" replace />;
}

export default HandleRedirect;
