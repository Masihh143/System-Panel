import React, { useState, useEffect } from "react";

const SystemInfoBar = () => {
  const [year, setYear] = useState("YYYY");
  const [date, setDate] = useState("DD");
  const [uptime, setUptime] = useState("00:00:00");
  const [OS, setOS] = useState("Loading...");
  const [powerStatus, setPowerStatus] = useState("Unknown");
  const [isCharging, setIsCharging] = useState(false);


  function formatSeconds(seconds) {
    const days = Math.floor(seconds / 86400);
    const hrs = Math.floor((seconds % 86400) / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return days > 0 ? `${days}d ${hrs}:${mins}:${secs}` : `${hrs}:${mins}:${secs}`;
  }
  
  

  useEffect(() => {
    const now = new Date();
    setYear(now.getFullYear());
    setDate(now.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }));

    const fetchSystemInfo = async () => {
      try {
        const data = await window.api.getSystemInfo();

        setUptime(data.uptime ? formatSeconds(Math.floor(data.uptime)) : "N/A");
        setOS(data.os?.distro || "Unknown");

        if (data.battery) {
          setPowerStatus(`${data.battery.percent}%`);
          setIsCharging(data.battery.isCharging);
        }
      } catch (err) {
        console.error("Failed to fetch system info", err);
        setUptime("Error");
        setOS("Error");
        setPowerStatus("Error");
        setIsCharging(false);
      }
    };

    fetchSystemInfo();

    const interval = setInterval(fetchSystemInfo, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-t border-green-500 pt-2 grid grid-cols-4 text-center text-sm text-green-400 font-mono tracking-wide mt-4">
      {/* YEAR */}
      <div>
        <div className="uppercase text-xs text-white">{year}</div>
        <div>{date}</div>
      </div>

      {/* UPTIME */}
      <div>
        <div className="uppercase text-xs text-white">Uptime</div>
        <div>{uptime}</div>
      </div>

      {/* TYPE */}
      <div>
        <div className="uppercase text-xs text-white">Type</div>
        <div>{OS}</div>
      </div>

      {/* POWER */}
      <div>
        <div className="uppercase tracking-widest text-white">Power</div>
        <div className="flex items-center justify-center gap-1">
          {powerStatus}
          {isCharging && <span className="text-yellow-400 text-1.5xl animate-pulse">⚡</span>}
        </div>
      </div>
    </div>
  );
};

export default SystemInfoBar;