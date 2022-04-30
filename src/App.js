import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import PayrollForm from './components/payroll-form/payroll-form';
import DashBoard from './components/dashboard/dashboard';


function App() {
  return (
    
    <Router>
    <div className="App">

      <Switch>
        
        <Route exact path="/" component={DashBoard}/>
        <Route exact path="/payroll" component={PayrollForm}/> 
        
      </Switch>
    </div>
  </Router>
    
  );
}

export default App;
