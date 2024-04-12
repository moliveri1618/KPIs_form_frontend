import { Navigate } from 'react-router-dom';

function HandleRedirect() {
  //console.log(token);
  
  return <Navigate to="/KPIs_form_frontend" replace />;
}

export default HandleRedirect;
