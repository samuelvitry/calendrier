import {Header} from "./Header"
import {Main} from "./Main"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { createBrowserHistory } from 'history';
import { Login } from './Login'

const theme = createMuiTheme({
  palette: {
       primary: { main: '#FF6B35'},
       secondary: { main: '#3581B8'},
       white: { main: '#E0EDF5'}
     }
   });

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
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Route path='/calendar' component={Calendar} />
          <Route path='/login' component={Login} />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
