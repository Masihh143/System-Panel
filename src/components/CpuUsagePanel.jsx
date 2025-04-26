import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";

const CpuUsagePanel = () => {
  const [data, setData] = useState([]);
  const [temperature, setTemperature] = useState(null);
  const [minClock, setMinClock] = useState(null);
  const [maxClock, setMaxClock] = useState(null);
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const fetchCpuData = async () => {
      try {
        const json = await window.api.getCpuUsage();

        const usage = json.usage !== undefined ? parseFloat(json.usage.toFixed(1)) : 0;

        setData((prev) => [...prev.slice(-19), { name: "", usage }]);

        setTemperature(json.temperature?.toFixed(0) ?? "N/A");
        setMinClock(json.minClock?.toFixed(0));
        setMaxClock(json.maxClock?.toFixed(0));
        setTasks(json.tasks);
      } catch (err) {
        console.error("Failed to fetch CPU data", err);
      }
    };

    fetchCpuData();
    const interval = setInterval(fetchCpuData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-t border-green-500 pt-2 space-y-3">
      <h2 className="uppercase text-xl font-bold text-white mb-2 tracking-wide">
        CPU USAGE
      </h2>

      {/* Line Graph */}
      <div className="h-32 bg-black border border-green-400 rounded-md">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" hide />
            <YAxis domain={[0, 100]} hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="usage"
              stroke="#4ade80"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CPU Stats Row */}
      <div className="grid grid-cols-4 text-center text-green-300 text-sm">
        <div>
          <h3 className="text-white font-semibold">Temp</h3>
          <p>{temperature ? `${temperature}°C` : "..."}</p>
        </div>
        <div>
          <h3 className="text-white font-semibold">Min Clock</h3>
          <p>{minClock ? `${minClock} MHz` : "..."}</p>
        </div>
        <div>
          <h3 className="text-white font-semibold">Max Clock</h3>
          <p>{maxClock ? `${maxClock} MHz` : "..."}</p>
        </div>
        <div>
          <h3 className="text-white font-semibold">Tasks</h3>
          <p>{tasks ?? "..."}</p>
        </div>
      </div>
    </div>
  );
};

export default CpuUsagePanel;
