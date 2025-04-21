import React, { useState, useEffect } from "react";

const MemoryGraph = () => {
  const totalRows = 10;
  const blocksPerRow = 50;
  const totalBlocks = totalRows * blocksPerRow;

  const [memoryBlocks, setMemoryBlocks] = useState(
    Array.from({ length: totalRows }, () => Array(blocksPerRow).fill(false))
  );

  useEffect(() => {
    const updateMemoryBlocks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/system/info");
        const data = await res.json();

        const usedRatio = data.memory.used / data.memory.total;
        const usedBlocks = Math.floor(usedRatio * totalBlocks);

        const blocksArray = Array(totalBlocks)
          .fill(false)
          .map((_, i) => i < usedBlocks);

        const chunked = Array.from({ length: totalRows }, (_, i) =>
          blocksArray.slice(i * blocksPerRow, (i + 1) * blocksPerRow)
        );

        setMemoryBlocks(chunked);
      } catch (err) {
        console.error("Failed to fetch memory data", err);
      }
    };

    updateMemoryBlocks();
    const interval = setInterval(updateMemoryBlocks, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-t border-green-500 pt-2 space-y-3">
      <h2 className="text-2xl text-white font-bold mb-2 tracking-wide">MEMORY</h2>
      <div className="space-y-2">
        {memoryBlocks.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-3">
            {row.map((block, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-xs ${
                  block ? "bg-green-400" : "bg-gray-700"
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGraph;
