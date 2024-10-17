import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SetupWallet from "./pages/setupWallet";
import 'bootstrap/dist/css/bootstrap.min.css';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <div className={'col-5 mx-auto'}>
            <SetupWallet/>
        </div>

    </ThemeProvider>
  );
}
