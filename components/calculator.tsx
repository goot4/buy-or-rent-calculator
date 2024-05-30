import {ChangeEvent, useEffect, useState} from "react"
import {CircleHelp} from "lucide-react"
import clsx from "clsx";
import {statistics} from "@/api/definatoin";

type Props = {
  statistics: statistics
  updateStatistics: (key:string, value: number)=>void
}

export default function Calculator({statistics, updateStatistics}: Props){
  const { annualYield, pricePerSquare, totalSquares,
    otherFeeInPercent, rentFee } = statistics

  const price = pricePerSquare * totalSquares
  const predictedAnnualYield = price * (1+ otherFeeInPercent/100) * annualYield/100
  const realAnnualYield = rentFee * 12
  let diff = realAnnualYield - predictedAnnualYield
  diff = Math.floor(diff)

  return (
    <div className={"min-h-[80vh] flex flex-col items-center space-y-2"}>
      <h1 className={"text-2xl"}>买还是租? 计算器帮你算</h1>
      <p>看不太懂, 先看看<a className={"text-info text-sm"}
                            href={"https://www.zeeebrag.pro/blog/posts/buy-or-rent-house-economic-consideration"}
                            target={"_blank"}>科普小文章</a>了解一下.</p>

      <div className={"w-full flex flex-col grow md:flex-row md:items-center"}>
        <div className={"grow grid grid-cols-3 items-center md:w-1/2"}>
          <div className={"flex flex-col items-center"}>
            <p>租客</p>
            <img className={clsx({"hidden": diff < 0})} src={"/dog2_4_think.png"} alt={""}/>
            <img className={clsx({"hidden": diff >= 0})} src={"/dog3_4_tehe.png"} alt={""}/>
          </div>
          <div className={""}>
            <div className={"flex justify-between items-center"}>
              <img className={"w-[40%]"} src={"/money_gen_bill3.png"} alt={""}/>
              <img className={"w-[40%]"} src={"/ie_mark_mansion.png"} alt={""}/>
            </div>
            <div className={"text-center"}>结果: 作为房东, 买房收益与预期年收益之差为:
              <p className={clsx({"text-red-600": diff >= 0, "text-green-600": diff < 0})}>{diff}元</p>
              <br/>
              <p className={clsx("text-red-600", {"hidden": diff < 0})}>买房划算</p>
              <p className={clsx("text-green-600", {"hidden": diff >= 0})}>租房划算</p>
            </div>
          </div>
          <div className={"flex flex-col items-center"}>
            <p>房主</p>
            <img className={clsx({"hidden": diff >= 0})} src={"/cat2_4_think.png"} alt={""}/>
            <img className={clsx({"hidden": diff < 0})} src={"/cat3_4_tehe.png"} alt={""}/>
          </div>
        </div>

        <div className={"md:w-1/2"}>
          <div className={"w-full flex flex-col"}>
            <div className={"flex justify-between tooltip tooltip-info"}
                 data-tip={"指一笔投资的一年后的预期回报占本金的百分比"}>
              <label htmlFor={"annual-yield"} className={""}>
                年收益率
                <CircleHelp className={"inline h-4 w-4"}/>:</label>
              <p>{annualYield}%</p>
            </div>
            <input id="annual-yield" type="range" min={0} max={15} step={0.01} value={annualYield} className="range"
                   onChange={annualYieldChangeHandler}/>
          </div>

          <div className={"w-full"}>
            <div className={"w-full flex flex-col"}>
              <div className={"flex justify-between"}>
                <label htmlFor={"price-per-square"} className={""}>
                  每平方米单价 :</label>
                <p>{pricePerSquare}元/每平方</p>
              </div>
              <input id="price-per-square" type="range" min={0} max={100000} value={pricePerSquare} className="range"
                     onChange={pricePerSquareChangeHandler}/>
            </div>
            <div className={"w-full flex flex-col"}>
              <div className={"flex justify-between"}>
                <label htmlFor={"total-squares"} className={""}>
                  总面积 :</label>
                <p>{totalSquares}平方</p>
              </div>
              <input id="total-squares" type="range" min={30} max={300} value={totalSquares} className="range"
                     onChange={totalSquaresChangeHandler}/>
            </div>
            <p>房价= {pricePerSquare}元/每平方 ✖ {totalSquares}平方 = <br/>{price / 10000}万元</p>
          </div>

          <div className={"w-full flex flex-col"}>
            <div className={"flex justify-between tooltip tooltip-info"}
                 data-tip={"指装修花费, 折旧和维修的花费还有房子租不出去的风险费用, 如果是贷款买房的话还要加上贷款所扣去的利息"}>
              <label htmlFor={"other-fee"} className={"text-nowrap"}>
                其他费用
                <CircleHelp className={"inline h-4 w-4"}/>:</label>
              <p className={"text-nowrap"}>
                房价✖{otherFeeInPercent}%={(price * otherFeeInPercent / 1000000).toFixed(4)}万元
              </p>
            </div>
            <input id="other-fee" type="range" min={0} max={100} value={otherFeeInPercent} className="range"
                   onChange={otherFeeChangeHandler}/>
          </div>

          <div className={"w-full flex flex-col"}>
            <div className={"flex justify-between tooltip tooltip-info"}
                 data-tip={"计算器的租金上限设定为30000元, 其对应的合理房价大概为1800万元"}>
              <label htmlFor={"rent-fee"} className={""}>
                租金
                <CircleHelp className={"inline h-4 w-4"}/>:</label>
              <p>{rentFee}元/月</p>
            </div>
            <input id="rent-fee" type="range" min={0} max={30000} value={rentFee} className="range"
                   onChange={rentFeeChangeHandler}/>
          </div>
        </div>
      </div>
    </div>
  )

  function annualYieldChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    updateStatistics("annualYield", Number(e.target.value))
  }

  function otherFeeChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    updateStatistics("otherFeeInPercent", Number(e.target.value))
  }

  function pricePerSquareChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    updateStatistics("pricePerSquare", Number(e.target.value))
  }

  function totalSquaresChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    updateStatistics("totalSquares", Number(e.target.value))
  }

  function rentFeeChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    updateStatistics("rentFee", Number(e.target.value))
  }
}