// hooks/useAuth.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, true/false = state

  const logoutAndRedirect = async () => {
  try {
      await axios.post('/logout/', {}, { withCredentials: true });
    } catch (err) {
      console.warn('Logout request failed (probably already cleared)', err);
    } finally {
      navigate('/'); // redirect to login
    }
  };

  useEffect(() => {
    const validate = async () => {
      try {
        const res = await axios.get('/auth-check/', { withCredentials: true });
        // console.log('✅ check_auth success:', res.data); // 🔍 log the response data
        setIsAuthenticated(true);
      } catch (err) {
        // console.log('❌ check_auth failed:', err.response?.status, err.response?.data); // 🔍 log the error details
        if (err.response?.status === 401) {
          try {
            const refreshRes = await axios.post('/token-refresh/', {}, { withCredentials: true });
            // console.log('🔄 token refreshed:', refreshRes.data);
            setIsAuthenticated(true);
          } catch (refreshErr) {
            // console.log('❌ token refresh failed:', refreshErr.response?.status, refreshErr.response?.data);
            logoutAndRedirect();
          }
        } else {
          setIsAuthenticated(false);
          logoutAndRedirect();
        }
      }
    };

    validate();
  }, [navigate]);

  return { isAuthenticated };
};
