const { app, BrowserWindow } = require('electron');
const axios = require('axios');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  win.loadFile('index.html');

  // Make request to Flask backend
  axios.get('http://127.0.0.1:8080/')
    .then(response => {
      console.log(response.data); // Log the response from Flask server
    })
    .catch(error => {
      console.error('Error connecting to Flask server:', error); // Log any errors
    });

  // Listen for messages from renderer process
  win.webContents.on('did-create-window', (event, window) => {
    window.webContents.on('message', (event, message) => {
      console.log('Message from renderer process:', message);
      // Handle the message here
    });
  });
}

app.whenReady().then(createWindow);

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

