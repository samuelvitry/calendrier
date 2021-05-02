import {Header} from "./Header"
import {Main} from "./Main"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { createBrowserHistory } from 'history';
import { Login } from './Login'



function Calendar(){

  return(
    <>
      <Header />
      <Main />
    </>
  )
}

function App() {
  const history = createBrowserHistory();
  return (
    <div className="container">
      <Router history={history}>
        <Route path='/calendar' component={Calendar} />
        <Route path='/login' component={Login} />
      </Router>
    </div>
  );
}

export default App;
