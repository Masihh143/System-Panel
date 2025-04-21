import React, { useState, useEffect } from "react";
import axios from "axios";

const TopProcesses = () => {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/system/cpu");
        setProcesses(res.data.topProcesses);
      } catch (err) {
        console.error("Error fetching top processes:", err);
      }
    };

    fetchProcesses();
    const interval = setInterval(fetchProcesses, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-t border-green-500 pt-2">
      <h2 className="uppercase text-xl font-bold text-white mb-2 tracking-wide">
        Top Processes
      </h2>
      <table className="w-full table-auto border-collapse text-sm">
        <thead className="text-green-300 border-b border-green-500">
          <tr className="text-left">
            <th className="p-2">PID</th>
            <th className="p-2">Process Name</th>
            <th className="p-2">CPU %</th>
            <th className="p-2">Memory %</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((proc) => (
            <tr
              key={proc.pid}
              className="hover:bg-green-900/10 transition-all border-b border-green-800"
            >
              <td className="p-2">{proc.pid}</td>
              <td className="p-2">{proc.name}</td>
              <td className="p-2">{proc.cpu.toFixed(1)}%</td>
              <td className="p-2">{proc.memory.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProcesses;
