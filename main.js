import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import si from 'systeminformation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ipcMain.handle('get-system-info', async () => {
  const batteryRaw = await si.battery();
  const osInfo = await si.osInfo();
  const uptime = si.time().uptime;

  return {
    uptime,
    os: osInfo,
    battery: {
      percent: batteryRaw.percent,
      isCharging: batteryRaw.isCharging
    }
  };
});

ipcMain.handle('get-cpu-usage', async () => {
  const load = await si.currentLoad();
  const temp = await si.cpuTemperature();
  const cpu = await si.cpu();
  const processes = await si.processes();

  return {
    usage: load.currentLoad,
    temperature: temp.main,
    minClock: cpu.speedMin * 1000, 
    maxClock: cpu.speedMax * 1000,
    tasks: processes.all
  };
});

ipcMain.handle('get-memory-stats', async () => {
  const mem = await si.mem();

  return {
    total: mem.total,
    used: mem.used,
    free: mem.free
  };
});


ipcMain.handle('get-top-processes', async () => {
  const processes = await si.processes();
  return processes.list
    .sort((a, b) => b.cpu - a.cpu)
    .slice(0, 5)
    .map(p => ({ pid: p.pid, name: p.name, cpu: p.cpu, mem: p.mem }));
});

ipcMain.handle('get-hardware-specs', async () => {
  const sys = await si.system();
  const chassis = await si.chassis();

  return {
    manufacturer: sys.manufacturer,
    model: sys.model,
    chassis: chassis.type
  };
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'dist/index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
