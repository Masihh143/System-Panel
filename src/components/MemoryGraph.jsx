import React, { useState, useEffect } from "react";

const MemoryGraph = () => {
  const totalRows = 10;
  const [blocksPerRow, setBlocksPerRow] = useState(getBlocksPerRow());
  const [memoryBlocks, setMemoryBlocks] = useState([]);

  function getBlocksPerRow() {
    const width = window.innerWidth;
    if (width <= 400) return 30;
    if (width <= 768) return 40;
    if (width <= 1024) return 50;
    return 110;
  }

  useEffect(() => {
    const handleResize = () => {
      const newBlocksPerRow = getBlocksPerRow();
      setBlocksPerRow(newBlocksPerRow);
    };

    window.addEventListener("resize", handleResize);
    setBlocksPerRow(getBlocksPerRow());

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateMemoryBlocks = async () => {
      try {
        const data = await window.api.getMemoryStats();
  
        if (!data || !data.total || !data.used) return;
  
        const totalBlocks = totalRows * blocksPerRow;
        const usedRatio = data.used / data.total;
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
  }, [blocksPerRow]);
  

  return (
    <div className="border-t border-green-500 pt-2 space-y-3">
      <h2 className="text-2xl text-white font-bold mb-2 tracking-wide">MEMORY</h2>
      <div className="space-y-2">
        {memoryBlocks.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map((block, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-sm ${
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
