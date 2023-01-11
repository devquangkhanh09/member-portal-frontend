import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';

import SideBar from './components/SideBar';
import Login from './pages/Login';
import MemberPage from './pages/MemberPage';
import ProfilePage from './pages/ProfilePage';


const SidebarLayout = () => (
  <>
    <SideBar />
    <Outlet />
  </>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route element={<SidebarLayout />}>
        <Route path="/home" element={<MemberPage />} />
        <Route path="/member" element={<MemberPage />} />
        <Route path="/dashboard" element={<MemberPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);


