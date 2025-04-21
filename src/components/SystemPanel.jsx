import React from "react";
import ClockDisplay from "./ClockDisplay";
import SystemInfoBar from "./SystemInfoBar";
import HardwareSpecs from "./HardwareSpecs";
import CpuUsagePanel from "./CpuUsagePanel";
import MemoryGraph from "./MemoryGraph";
import TopProcesses from "./TopProcess";

const SystemPanel = () => {
    return (
        <>
            <div className="bg-black text-green-400 font-mono p-4 w-full h-full overflow-y-auto space-y-3">
                <ClockDisplay />
                <SystemInfoBar />
                <HardwareSpecs />
                <CpuUsagePanel />
                <MemoryGraph />
                <TopProcesses />
            </div>
        </>
    )
}

export default SystemPanel;