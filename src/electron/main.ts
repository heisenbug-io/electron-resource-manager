import {
    app,
    BrowserWindow,
    ipcMain
} from "electron";
import { ipcMainHandle, isDev } from "./util.js";
import { pollResources, getStaticData } from "./resourceManager.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";

app.on("ready", () => {
    let mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        }
    });
    if(isDev()){
        mainWindow.loadURL("http://localhost:5123");
    } else{
        mainWindow.loadFile(getUIPath());
    }

    pollResources(mainWindow);

    ipcMainHandle("getStaticData", () => {
        return getStaticData();
    })
});