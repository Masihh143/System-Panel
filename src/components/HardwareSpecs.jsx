import React, { useState, useEffect } from 'react';

const HardwareSpecs = () => {
  const [manufacturer, setManufacturer] = useState("Loading...");
  const [model, setModel] = useState("Loading...");
  const [chassis, setChassis] = useState("Loading...");

  useEffect(() => {
    const fetchHardwareSpecs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/system/info");
        const data = await res.json();

        setManufacturer(data.manufacturer || "Unknown");
        setModel(data.model || "N/A");
        setChassis(data.chassis || "N/A");
      } catch (error) {
        console.error("Failed to fetch hardware specs:", error);
      }
    };

    fetchHardwareSpecs();
  }, []);

  return (
    <div className="border-t border-green-500 pt-2 grid grid-cols-3 gap-1 text-center text-green-400">
      <div>
        <h2 className="uppercase text-xl font-bold mb-1 text-white ">Manufacturer</h2>
        <p className="text-lg">{manufacturer}</p>
      </div>
      <div>
        <h2 className="uppercase text-xl font-bold mb-1 text-white ">Model</h2>
        <p className="text-lg">{model}</p>
      </div>
      <div>
        <h2 className="uppercase text-xl font-bold mb-1 text-white ">Chassis</h2>
        <p className="text-lg">{chassis}</p>
      </div>
    </div>
  );
};

export default HardwareSpecs;
