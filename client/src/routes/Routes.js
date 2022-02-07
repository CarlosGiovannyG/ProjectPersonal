import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/layouts/Layout';
import routes from '../helpers/Routes';
import Account from '../pages/account/Account';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';


const Rout = () => {


  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.register} element={<Register />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.account} element={<Account />} />
        </Routes>
      </Layout>
    </BrowserRouter>

  )
}

export default Rout;
