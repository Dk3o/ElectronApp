const { app, BrowserWindow } = require('electron');
const path = require('path');

// Enable electron-reload in development mode
if (process.env.NODE_ENV === 'development') {
  const electronReload = require('electron-reload');
  electronReload(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit',
  });
  mainWindow.once('ready-to-show', () => {
    setTimeout(function () {
      splashScreen.destroy();
      mainWindow.show();
    }, 10000);
  });
}

if (process.env.NODE_ENV === 'production') {
  mainWindow.webContents.closeDevTools(); // Disable DevTools in production
}

let mainWindow;
let splashScreen;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Assuming Vite is running on port 3000
  mainWindow.loadURL('http://localhost:5173');

  // You can add more configuration options to mainWindow here.

  // When your main window is ready, hide the splash screen and show the main window
  mainWindow.once('ready-to-show', () => {
      splashScreen.destroy();
      mainWindow.show();
  });
}

function createSplashScreen() {
  splashScreen = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    center: true,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  splashScreen.loadFile('splash.html'); // Replace with the path to your splash.html file

  // You can add more configuration options to splashScreen here.
}

app.whenReady().then(() => {
  createSplashScreen();
  createMainWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
