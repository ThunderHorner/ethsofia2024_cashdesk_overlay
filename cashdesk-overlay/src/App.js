import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SetupWallet from "./pages/setupWallet";
import 'bootstrap/dist/css/bootstrap.min.css';
import WebSocketComponent from "./components/websocket_component";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {

    const privateKey = localStorage.getItem('privateKey')

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <div className={'col-5 mx-auto'}>
                {!privateKey && <SetupWallet/>}
                {privateKey && <div>
                <WebSocketComponent/>
                </div>}
            </div>

        </ThemeProvider>
    );
}
