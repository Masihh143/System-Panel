const express = require("express");
const si = require("systeminformation");
const router = express.Router();

function formatUptime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hrs}h ${mins}m ${secs}s`;
}

router.get("/info", async (req, res) => {
  try {
    const [os, battery, system, baseboard, time, memory] = await Promise.all([
      si.osInfo(),
      si.battery(),
      si.system(),
      si.baseboard(),
      si.time(),
      si.mem(),
    ]);

    res.json({
      os: os.distro,
      battery: {
        percent: battery.percent,
        isCharging: battery.isCharging,
      },
      manufacturer: system.manufacturer,
      model: system.model,
      chassis: baseboard.model,
      uptime: formatUptime(time.uptime),
      memory: {
        total: memory.total,
        used: memory.used,
        free: memory.free,
        available: memory.available,
      },
    });
  } catch (error) {
    console.error("Error fetching system info:", error);
    res.status(500).json({ error: "Failed to fetch system info", details: error.message });
  }
});




router.get("/cpu", async (req, res) => {
  try {
    const [load, temp, speed, process] = await Promise.all([
      si.currentLoad(),
      si.cpuTemperature(),
      si.cpuCurrentSpeed(),
      si.processes(),
    ]);


    const topProcesses = process.list
      .filter(p => p.cpu > 0)
      .sort((a, b) => b.cpu - a.cpu)
      .slice(0, 5)
      .map(p => ({
        pid: p.pid,
        name: p.name,
        cpu: p.cpu,
        memory: p.mem,
      }));


    res.json({
      usage: load.currentLoad,
      temperature: temp.main,
      minClock: speed.min,
      maxClock: speed.max,
      tasks: process.all,
      topProcesses,
    });

    
  } catch (error) {
    console.error("Error fetching CPU info:", error);
    res.status(500).json({ error: "Failed to fetch CPU info", details: error.message });
  }
});

module.exports = router;
