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
import Login from './Authentication/Login';
import { Protectedroutes } from './Helper/Protectedroutes';
import Editproducts from './Pages/Editproducts';
import Editcatagories from './Pages/Categories/Editcatagories';

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
            <Protectedroutes path='/Editproduct' exact component={Editproducts} />
            <Protectedroutes path='/Editcatagories' exact component={Editcatagories} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
