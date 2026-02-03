import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';

export default function App() {
  // Debug: Check role AFTER app loads
  React.useEffect(() => {
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('user_id');
    console.log('[App] Role:', role);
    console.log('[App] User ID:', userId);
  }, []);

  return <RouterProvider router={router} />;
}