import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sidebar from './Sidebar/Sidebar';
import Productlist from './Pages/Productlist';
import Categories from './Pages/Categories/Categories';
import Addcategories from './Pages/Categories/Addcategories';
import Addproduct from './Pages/Addproduct';
import CalculateBill from './Pages/Bill/CalculateBill';
import Login from './Authentication/Login';
import Getorders from './Pages/GetpurchaseOrder.js/Getorders';

function App() {
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div id="main">
        <Router>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/productlist' exact component={Productlist} />
            <Route path='/categories' exact component={Categories} />
            <Route path='/Addcategories' exact component={Addcategories} />
            <Route path='/Addproduct' exact component={Addproduct} />
            <Route path='/Calulatebill' exact component={CalculateBill} />
            <Route path='/Getorders' exact component={Getorders} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
