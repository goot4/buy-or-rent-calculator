import ReactECharts from "echarts-for-react"

type Props = {
  predicted: number
  real: number
}
export default function Statistics({predicted, real}: Props) {
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
        data: [predicted, predicted*2, predicted*3, predicted*4, predicted*5]
      },
      {
        name: '实际收益',
        type: 'line',
        data: [real, real*2, real*3, real*4, real*5]
      },
    ]
  }
  return (
    <div className={"h-[80vh]"}>
      <h2 className={"text-2xl"}>详细数据</h2>
      <div className="stats stats-vertical shadow">

        <div className="stat">
          <div className="stat-title">预期年收益</div>
          <div className="stat-value">{predicted}元</div>
          <div className="stat-desc">(房价+其他费用) ✖ 年收益率</div>
        </div>

        <div className="stat">
          <div className="stat-title">实际年收益</div>
          <div className="stat-value">{real}元</div>
          <div className="stat-desc">月租金 ✖ 12个月</div>
        </div>

        <div className="stat">
          <div className="stat-title">年差额</div>
          <div className="stat-value">{real-predicted}元</div>
          <div className="stat-desc">实际年收益-预期年收益</div>
        </div>
      </div>
      <ReactECharts style={{height:'38%'}} className={"mt-4"} option={option}/>
    </div>
  )
}