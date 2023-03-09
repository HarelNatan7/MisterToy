import { MyChartA } from "../cmps/my-chartA"
import { MyChartB } from "../cmps/my-chartB"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { loadToys } from "../store/toy.action"
import { GoogleMap } from "../cmps/google-map"
import { toyService } from "../services/toy.service.js"


export function HomePage() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])
    
    function getLabelsPrice() {
        let labelsAmount = getLabelsAmountMap()
        let map = toys.reduce((acc, toy) => {
            toy.labels.forEach(label => {
                acc[label] = acc[label] ? acc[label] += toy.price : toy.price
            })
            return acc
        }, {})
        // console.log('map:', map)
        return Object.values(map).map((value, idx) => value = value / Object.values(labelsAmount)[idx])
    }
    const priceData = getLabelsPrice()
    
    
    
    
    
    function getLabelsAmountMap() {
        const labels = []
        toys.forEach(toy => labels.push(...toy.labels))

        return labels.reduce((acc, val) => {
            acc[val] = acc[val] ? ++acc[val] : 1
            return acc
        }, {})
    }
    
    const amountDataMap = getLabelsAmountMap()
    console.log('amountData:', amountDataMap)


    return <section className="home-page">
        <h2>Welcome To The Toy Store</h2 >
        <div className="charts flex">
        <MyChartA dataMap={amountDataMap} />
        {/* <MyChartB dataMap={priceData} getLabelsAmount={getLabelsAmountMap} /> */}
        </div>
    </section >
}