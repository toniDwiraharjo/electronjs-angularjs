const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

app.on('ready', () => {
    var main = new BrowserWindow();
    // main.loadURL(url.format({
    //     pathname: path.join(__dirname, 'src/index.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }));
    main.loadURL('http://127.0.0.1:5500/src/plot.html')
    main.webContents.openDevTools();
});