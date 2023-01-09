import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import MemberPage from './pages/MemberPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<MemberPage />} />
        <Route path="/member" element={<MemberPage />} />
    </Routes>
    </BrowserRouter>
);
