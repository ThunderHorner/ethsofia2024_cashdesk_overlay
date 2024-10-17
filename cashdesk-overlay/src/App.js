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
    const sellerName = localStorage.getItem('sellerName')
    const contractAddress = localStorage.getItem('contractAddress')

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <div className={'col-5 mx-auto'}>
                {(!privateKey || !sellerName || !contractAddress) && <SetupWallet/>}
                {(privateKey && sellerName && contractAddress) && <div>
                    <WebSocketComponent/>
                </div>}
            </div>

        </ThemeProvider>
    );
}
