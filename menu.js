const {Menu} = require('electron');
const electron = require('electron');
const app = electron.app;
const name = app.getName();

const template = [
  {
    label: "Actions",
    submenu: [
      {
        label: "Serial Monitor",
        accelerator: "CmdOrCtrl+S",
        click (item, focusedWindow) {
          if(focusedWindow) focusedWindow.webContents.executeJavaScript("$('#serial').modal('toggle');");
        }
      },
      {
        label: "Test Script",
        accelerator: "CmdOrCtrl+R",
        click (item, focusedWindow) {
          if(focusedWindow) focusedWindow.webContents.executeJavaScript("saveData('ru', 0);");
        }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
