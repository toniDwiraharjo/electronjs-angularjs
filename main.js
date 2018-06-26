const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

app.on('ready', () => {
    var main = new BrowserWindow();
    main.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    main.webContents.openDevTools();
});