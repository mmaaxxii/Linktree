import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashboardView from './routes/dashboardView';
import EditProfileView from './routes/editProfileView';
import SignOutView from './routes/signOutView';
import PublicProfileView from './routes/publicProfileView';
import LoginView from './routes/loginView';
import ChooseUsernameView from './routes/chooseUsernameView';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='login' element={<LoginView/>} />
      <Route path='dashboard' element={<DashboardView/>} />
      <Route path='dashboard/profile' element={<EditProfileView/>} />
      <Route path='signout' element={<SignOutView/>} />
      <Route path='u/:username' element={<PublicProfileView/>} />
      <Route path='choose-username' element={<ChooseUsernameView/>} />
    </Routes> 
  </BrowserRouter>,
  document.getElementById("root")
);


 reportWebVitals();
 