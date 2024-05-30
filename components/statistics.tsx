import ReactECharts from "echarts-for-react"
import {statistics} from "@/api/definatoin";
import {log} from "node:util";

type Props = {
  statistics: statistics
}
export default function Statistics({statistics}: Props) {
  const { annualYield, pricePerSquare, totalSquares,
    otherFeeInPercent, rentFee } = statistics

  const price = pricePerSquare * totalSquares
  const predictedAnnualYield = price * (1+ otherFeeInPercent/100) * annualYield/100
  const realAnnualYield = rentFee * 12
  let diff = realAnnualYield - predictedAnnualYield
  diff = Math.floor(diff)

  const option = {
    title: {
      text: '5年收益走势'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      left: '50%',
      data: ['预期收益', '实际收益',]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1年', '2年', '3年', '4年', '5年']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '预期收益',
        type: 'line',
        data: predictedInYears()
      },
      {
        name: '实际收益',
        type: 'line',
        data: realInYears()
      },
    ]
  }
  return (
    <div className={"min-h-[80vh]"}>
      <h2 className={"text-2xl"}>详细数据</h2>
      <div className="stats stats-vertical shadow">

        <div className="stat">
          <div className="stat-title">预期年收益</div>
          <div className="stat-value">{predictedAnnualYield.toFixed(0)}元</div>
          <div className="stat-desc">(房价+其他费用) ✖ 年收益率</div>
        </div>

        <div className="stat">
          <div className="stat-title">实际年收益</div>
          <div className="stat-value">{realAnnualYield.toFixed(0)}元</div>
          <div className="stat-desc">月租金 ✖ 12个月</div>
        </div>

        <div className="stat">
          <div className="stat-title">年差额</div>
          <div className="stat-value">{(realAnnualYield-predictedAnnualYield).toFixed(0)}元</div>
          <div className="stat-desc">实际年收益-预期年收益</div>
        </div>
      </div>
      <ReactECharts style={{height:'240px'}} className={"mt-4"} option={option}/>
    </div>
  )

  // helper
  function realInYears(){
    return new Array(5).fill(0).map((value,index)=>{
      return realAnnualYield * (index+1)
    })
  }
  function predictedInYears(){
    return new Array(5).fill(0).map((value,index)=>{
      const cost = price * (1+ otherFeeInPercent/100)
      return Math.floor(cost * Math.pow(1+annualYield/100, index+1) - cost)
    })
  }
}