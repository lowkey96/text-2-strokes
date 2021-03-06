const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const path = require("path");
const customMenu = require("./GUI/menu");

let mainWindow;

const isWindows = process.platform === 'win32';
const isMac = process.platform === "darwin";

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, "./GUI/preload.js"),
      // (NOT RECOMMENDED)
      // If true, we can skip attaching functions from ./menu-functions.js to window object in preload.js.
      // And, instead, we can use electron APIs directly in renderer.js
      // From Electron v5, nodeIntegration is set to false by default. And it is recommended to use preload.js to get access to only required Node.js apis.
      nodeIntegration: true
    },
    frame: isWindows ? false : true //Remove frame to hide default menu
  });
  

  // const menu = isMac?Menu.buildFromTemplate(customMenu.macMenuTemplate):Menu.buildFromTemplate(customMenu.winMenuTemplate);
  // Menu.setApplicationMenu(menu);
  
  mainWindow.loadFile("./GUI/index.html");
	
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on('ready', function(){
  createWindow();
})


app.on("window-all-closed", function() {
	if (process.platform !== "darwin") app.quit();
});


ipcMain.on('buttonClicked', function(event) {
  // alert('hi');
  dialog.showErrorBox('error msg', 'demo of an error msg');
}) 
