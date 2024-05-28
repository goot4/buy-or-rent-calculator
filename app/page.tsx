'use client'
import Calculator from "@/components/calculator";
import Statistics from "@/components/statistics";
import {useState} from "react";
import {statistics} from "@/api/definatoin";

export default function Home() {
  const [statistics, setStatistics] = useState<statistics>({
    annualYield: 4,
    pricePerSquare: 50000,
    totalSquares: 80,
    otherFeeInPercent: 10,
    rentFee: 4000,
  })
  return (
    <main className={"flex flex-col m-4 p-4 border-2 border-accent rounded-3xl"}>
      <Calculator statistics={statistics} updateStatistics={updateStatistics}/>
      <div className={"divider divider-accent"}></div>
      <Statistics statistics={statistics}/>
    </main>
  )

  function updateStatistics(key: string, value: number){
    setStatistics({
      ...statistics,
      [key]: value,
    })
  }
}
