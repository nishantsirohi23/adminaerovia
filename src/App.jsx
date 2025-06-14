import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import AdminPanel from './AdminPanel.jsx';
import PackageEditor from './PackageEditor.jsx';
import AddPackage from './AddPackage.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        }
      />
      <Route
        path="/peditor/:id"
        element={
          <PrivateRoute>
            <PackageEditor />
          </PrivateRoute>
        }
      />
      <Route
        path="addpackage"
        element={
          <PrivateRoute>
            <AddPackage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
