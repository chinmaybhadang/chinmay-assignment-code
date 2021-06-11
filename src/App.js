import './App.css';
import { Router, Route, Switch } from "react-router-dom";
import AppRouter from "./router/index";
import { createHashHistory } from 'history';

// our projects root file to start execution
function App() {
  const browserHistory = createHashHistory();
  return (
    <div>
       <Router history={browserHistory}>
        <Switch>
          <Route component={AppRouter} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
