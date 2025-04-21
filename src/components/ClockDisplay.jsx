import React , { useState , useEffect } from 'react'

const ClockDisplay = () => {
    const [time , settime] = useState("00:00:00")

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString("en-US" , {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });

            settime(formattedTime)
        }

        updateClock()
        const intervalId = setInterval(updateClock , 1000)

        return () => clearInterval(intervalId)
    } , [])

  return (
    <>
        <div className=" text-5xl text-center tracking-widest text-white">
        {time}
        </div>
    </>
  )
}

export default ClockDisplay;