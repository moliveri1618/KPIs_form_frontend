import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

function HandleRedirect() {
  let { token } = useParams();
  //console.log(token);
  
  return <Navigate to="/KPIs_form_frontend" replace />;
}

export default HandleRedirect;
