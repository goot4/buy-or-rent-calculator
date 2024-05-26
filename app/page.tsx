'use client'
import Calculator from "@/components/calculator";
import Statistics from "@/components/statistics";
import {useState} from "react";

export default function Home() {
  const [predictedAnnualYield, setPredictedAnnualYield] = useState(0)
  const [realAnnualYield, setRealAnnualYield] = useState(0)
  return (
    <main className={"flex flex-col m-4 p-4 border-2 border-accent rounded-3xl"}>
      <Calculator updateStatistics={updateStatistics}/>
      <div className={"divider divider-accent"}></div>
      <Statistics predicted={predictedAnnualYield}
      real={realAnnualYield}/>
    </main>
  )

  function updateStatistics(predicted:number, real:number){
    predicted = Math.floor(predicted)
    real = Math.floor(real)
    setPredictedAnnualYield(predicted)
    setRealAnnualYield(real)
  }
}
