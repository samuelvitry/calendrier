import {Header} from "./Header"
import {Main} from "./Main"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
       primary: { main: '#FF6B35'},
       secondary: { main: '#3581B8'}
     }
   });

function App() {
  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
