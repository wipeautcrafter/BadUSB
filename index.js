const {app, BrowserWindow} = require('electron');
const path = require("path");

app.on("ready", function() {
  const win = new BrowserWindow({
    width: 650,
    height: 750,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile(path.join(__dirname, "html", "index.html"));
});

app.on('window-all-closed', app.quit);

require("./menu.js");
