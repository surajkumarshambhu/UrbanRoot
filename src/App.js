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

function App() {
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div id="main">
        <Router>
          <Switch>
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/productlist' exact component={Productlist} />
            <Route path='/Catagories' exact component={Catagories} />
            <Route path='/AddCatagories' exact component={AddCatagories} />
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
