import React , { lazy, Suspense } from "react";

const ClockDisplay = lazy(() => import('./ClockDisplay'));
const SystemInfoBar = lazy(() => import('./SystemInfoBar'));
const HardwareSpecs = lazy(() => import('./HardwareSpecs'));
const CpuUsagePanel = lazy(() => import('./CpuUsagePanel'));
const MemoryGraph = lazy(() => import('./MemoryGraph'));
const TopProcesses = lazy(() => import('./TopProcesses'));

const SystemPanel = () => {
    return (
        <>
        <Suspense fallback={<div className="text-white">Loading...</div>}>
            <div className="bg-black text-green-400 font-mono p-4 w-full h-full overflow-y-auto space-y-3">
                <Suspense fallback={<div>Loading Clock...</div>}>
                    <ClockDisplay />
                </Suspense>

                <Suspense fallback={<div>Loading Info...</div>}>
                    <SystemInfoBar />
                </Suspense>

                <Suspense fallback={<div>Loading Specs...</div>}>
                    <HardwareSpecs />
                </Suspense>

                <Suspense fallback={<div>Loading Cpu...</div>}>
                    <CpuUsagePanel />
                </Suspense>
                    
                <Suspense fallback={<div>Loading Memory...</div>}>
                    <MemoryGraph />
                </Suspense>

                <Suspense fallback={<div>Loading Processes...</div>}>
                    <TopProcesses />
                </Suspense> 
            </div>
        </Suspense>
        </>
    )
}

export default SystemPanel;