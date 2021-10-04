import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sidebar from './Sidebar/Sidebar';
import Productlist from './Pages/Productlist';
import Addproduct from './Pages/Addproduct';
import CalculateBill from './Pages/Bill/CalculateBill';
import Getorders from './Pages/GetpurchaseOrder.js/Getorders';
import AddCatagories from './Pages/Categories/Addcategories';
import Catagories from './Pages/Categories/Catagories';
import { useState } from 'react';
import Login from './Authentication/Login';
import { Protectedroutes } from './Helper/Protectedroutes';

function App() {

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div id="main">
        <Router>
          <Switch>
            <Route path='/' exact component={Login} />
            <Protectedroutes path='/dashboard' exact component={Dashboard} />
            <Protectedroutes path='/productlist' exact component={Productlist} />
            <Protectedroutes path='/Catagories' exact component={Catagories} />
            <Protectedroutes path='/AddCatagories' exact component={AddCatagories} />
            <Protectedroutes path='/Addproduct' exact component={Addproduct} />
            <Protectedroutes path='/Calulatebill' exact component={CalculateBill} />
            <Protectedroutes path='/Getorders' exact component={Getorders} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
