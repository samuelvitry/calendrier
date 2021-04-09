import {Header} from "./Header"
import {Main} from "./Main"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
       primary: { main: '#E74C3C'},
       secondary: { main: '#3498DB'}
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
