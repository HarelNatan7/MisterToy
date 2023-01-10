import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";

import { toyService } from "../services/toy.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [])

    function loadToy() {
        toyService.getById(params.toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <h1>Toy Name : {toy.name}</h1>
        <h5>Price: {toy.price}</h5>
        <img src={`https://robohash.org/${toy._id}?set=set2`} />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex laboriosam temporibus aliquid delectus nihil mollitia placeat reiciendis! Accusamus asperiores fuga expedita deserunt, rerum eum iste obcaecati repellendus temporibus reiciendis, nihil, consequatur adipisci labore soluta. Natus, enim. Tempora sint non necessitatibus odio a, ipsa, cupiditate itaque repellat cumque soluta accusantium quo.</p>
        <Link className="nice-link" to={`/toy/edit/${toy._id}`}>Edit</Link>
        <Link className="nice-link" to={`/toy`}>Go Back</Link>
    </section>
}