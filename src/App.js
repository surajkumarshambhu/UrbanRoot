import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Dashboard from './Pages/Dashboard';
import Sidebar from './Sidebar/Sidebar';
import Productlist from './Pages/Productlist';
function App() {
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div id="main">
        <Router>
        <Switch>
           <Route path='/dashboard' exact component={Dashboard} />
           <Route path='/productlist' component={Productlist} />
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default App;
