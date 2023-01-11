import { MyChartA } from "../cmps/my-chartA"
import { MyChartB } from "../cmps/my-chartB"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { loadToys } from "../store/toy.action"
import { GoogleMap } from "../cmps/google-map"
import { toyService } from "../services/toy.service.js"


export function HomePage() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    // const imgUrl = 'HomeImg.png'

    useEffect(() => {
        loadToys()
    }, [])

    function getLabelsAmount() {
        const arr = []
        toys.forEach(toy => arr.push(...toy.labels))

        return arr.reduce((acc, val) => {
            acc[val] = acc[val] ? ++acc[val] : 1
            return acc
        }, {})
    }

    function getLabelsPrice() {
        let labelsAmount = getLabelsAmount()
        let map = toys.reduce((acc, toy) => {
            toy.labels.forEach(label => {
                acc[label] = acc[label] ? acc[label] += toy.price : toy.price
            })
            return acc
        }, {})
        // console.log('map:', map)
        return Object.values(map).map((value, idx) => value = value / Object.values(labelsAmount)[idx])
    }
    
    const amountData = getLabelsAmount()
    const priceData = getLabelsPrice()
    console.log('priceData:', priceData)

    return <section className="home-page">
        <h2>Welcome To The Toy Store</h2 >
        <div className="charts flex">
        <MyChartA dataMap={amountData} />
        <MyChartB dataMap={priceData} getLabelsAmount={getLabelsAmount} />
        </div>
    </section >
}