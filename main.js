const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const io = require('socket.io-client'); // Use require instead of import for CommonJS


let mainWindow;
let tray = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 700,
        height: 500,
    });

    mainWindow.loadURL('http://localhost:3000/');
}

function createTray() {
    tray = new Tray(path.join(__dirname, 'logo.png')); // Replace 'logo.png' with the path to your tray icon
    const trayMenu = Menu.buildFromTemplate([
        { label: 'Settings', click: () => openSettings() },
        { label: 'Reset', click: () => resetApp() },
        { label: 'Quit', click: () => app.quit() },
    ]);
    tray.setToolTip('My Electron App');
    tray.setContextMenu(trayMenu);
}

function openSettings() {
    // Open settings window or do something
    mainWindow.loadURL('http://localhost:3000/settings/');
    console.log('Settings clicked');
}

function resetApp() {
    mainWindow.webContents.executeJavaScript('localStorage.clear();')
    mainWindow.webContents.executeJavaScript('window.location.reload();');
    console.log('Reset clicked');
}

function initSocketConnection() {
    const socket = io('http://localhost:5000');

    socket.on('message', (message) => {
        console.log('Received message in Electron:', message);
        // Navigate the browser window to the transaction page with the message
        mainWindow.loadURL(`http://localhost:3000/perform-transaction?msg=${message}`);
    });

    socket.on('connect', () => {
        console.log('Connected to WebSocket');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket');
    });
}

app.on('ready', () => {
    createWindow();
    createTray();
    initSocketConnection();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
