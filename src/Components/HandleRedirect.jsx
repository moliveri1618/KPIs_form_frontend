import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

function HandleRedirect() {
  let { token } = useParams();
  console.log(token);
  
  // useEffect(() => {
  //   localStorage.setItem('validRedirect', 'true');
  // }, []);
  
  return <Navigate to="/KPIs_form_frontend" replace />;
}

export default HandleRedirect;
