import { MyChart } from "../cmps/my-chart"
import { useDispatch, useSelector } from "react-redux"


export function HomePage() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const imgUrl = 'HomeImg.png'

    function getLabelsAmount(toys) {
    
    }

    return <section>
        <h2>Welcome To The Toy Store</h2 >
        <img className="home-img" src={require(`../assets/img/${imgUrl}`)} />
        <MyChart />
    </section >
}