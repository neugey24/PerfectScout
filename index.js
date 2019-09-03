// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const http = require('http');

const Sqlite3Database = require('better-sqlite3');
const psDataConn = new Sqlite3Database('db/ps.db', { verbose: console.log });

let psDebugMode = process.argv[2]=='debug' ? true : false;

//Receive and reply to synchronous message
ipcMain.on('filterMessage', (event, current_tier) => {
 //do something with args
 console.log('Current tier is ' + current_tier);
 event.returnValue = 'Your current tier ID is ' + current_tier;
});

var dbLoader = require('./dbLoader');
let teamNamesForFilter = dbLoader.teamNames(psDataConn);
//console.log('team data stuff:' +  teamNamesForFilter.toString());

var dummy = "hello mike!";
var tiers = new Array();

require('electron-handlebars')({
  // Template bindings go here!
  title: 'Hello, World!',
  body: 'The quick brown fox jumps over the lazy dog.',
  tiers: tiers,
  teamNamesForFilter: teamNamesForFilter
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1160,
    height: 740,
    webPreferences: {
       nodeIntegration: true
      //preload: path.join(__dirname, 'preload.js')
    }
  })



  // and load the index.html of the app.
  win.loadFile('index.hbs')

  // ###### DEV TOOLS ############## Open the DevTools for debugging
  if (psDebugMode) {
    win.webContents.openDevTools()
  }

  win.webContents.on('did-finish-load', () => {
    win.show();
    win.focus();
  });

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) createWindow()
})
