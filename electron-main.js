// electron-main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // Erstellen des Browser-Fensters.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Laden der index.html der App.
    win.loadFile(path.join(__dirname, 'dist/index.html'));

    // Öffnen der DevTools.
    // win.webContents.openDevTools();
}

// Diese Methode wird aufgerufen, wenn Electron initialisierung abgeschlossen ist
// und bereit ist, Browser-Fenster zu erstellen.
// Einige APIs können nur nach dem Auftreten dieses Events genutzt werden.
app.whenReady().then(createWindow);

// Beenden, wenn alle Fenster geschlossen sind.
app.on('window-all-closed', () => {
    // Auf macOS ist es üblich für Apps und ihre Menu-Leiste
    // aktiv zu bleiben, bis der Nutzer explizit mit Cmd + Q die App beendet.
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // Auf macOS ist es üblich ein neues Fenster der App zu erstellen, 
    // wenn das Dock-Icon angeklickt wird und keine anderen Fenster offen sind.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
