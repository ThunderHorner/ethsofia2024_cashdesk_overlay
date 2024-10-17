const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

let mainWindow;
let tray = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,  // Hide the window initially
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Load your app's HTML file
  mainWindow.loadFile('index.html');

  // Optionally handle window close (on macOS you might want to keep it open)
  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.hide();  // Hide the window instead of closing it
  });
}

function createTray() {
  // Create tray icon and specify the icon image file
  tray = new Tray(path.join(__dirname, 'img.png')); // Use a PNG icon in your project directory

  // Create a context menu for the tray
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => { mainWindow.show(); } },
    { label: 'Quit', click: () => { app.quit(); } }
  ]);

  // Set the tooltip and context menu for the tray icon
  tray.setToolTip('My Electron App');
  tray.setContextMenu(contextMenu);

  // Show or hide the window when the tray icon is clicked
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();

  // Handle macOS-specific behavior for reopening the app
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit the app when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
