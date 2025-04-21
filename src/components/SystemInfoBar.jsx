import React, { useState, useEffect } from "react";

const SystemInfoBar = () => {
  const [year, setYear] = useState("YYYY");
  const [date, setDate] = useState("DD");
  const [uptime, setUptime] = useState("00:00:00");
  const [OS, setOS] = useState("Loading...");
  const [powerStatus, setPowerStatus] = useState("Unknown");
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const now = new Date();
    setYear(now.getFullYear());
    setDate(now.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }));

    const fetchSystemInfo = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/system/info");
        const data = await res.json();

        setUptime(data.uptime || "N/A");
        setOS(data.os || "Unknown");

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
          {isCharging && <span className="text-yellow-400 animate-pulse">⚡</span>}
        </div>
      </div>
    </div>
  );
};

export default SystemInfoBar;