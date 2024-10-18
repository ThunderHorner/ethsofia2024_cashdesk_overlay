import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SetupWallet from "./pages/setupWallet";
import 'bootstrap/dist/css/bootstrap.min.css';
import WebSocketComponent from "./components/websocket_component";
import CustomerWalletPrompt from "./pages/customerWalletPrompt";
import CustomerWalletPromptWithParams from "./pages/customerWalletPromptWithParams";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {

    const privateKey = localStorage.getItem('privateKey');
    const sellerName = localStorage.getItem('sellerName');
    const contractAddress = localStorage.getItem('contractAddress');

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Router>

                <div className={'col-md-5 col-11 mx-auto'}>
                    <Routes>
                        <Route path="/" element={
                            (!privateKey || !sellerName || !contractAddress)
                                ? <SetupWallet/>
                                : <WebSocketComponent/>
                        } />
                        <Route path="/settings" element={<SetupWallet/>} />
                        <Route path="/listening" element={<WebSocketComponent/>} />
                        <Route path="/perform-transaction" element={<CustomerWalletPromptWithParams withWarranty={false} />} />
                        <Route path="/perform-transaction-with-warranty" element={<CustomerWalletPromptWithParams withWarranty={true}/>} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}
