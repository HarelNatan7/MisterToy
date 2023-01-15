import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { MsgForm } from "../cmps/msg-form.jsx";
import { ReviewForm } from "../cmps/review-form.jsx";
import { ToyReviews } from "../cmps/toy-reviews.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

import { toyService } from "../services/toy.service.js"
import { addReview } from "../store/review.actions.js";

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [msg, setMsg] = useState({ txt: '' })
    const [review, setReview] = useState({ txt: '' })
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

    async function addToyReview() {
        try {
            await addReview({...review, aboutToyId: toy._id})
            showSuccessMsg('Review added')
            setReview({ txt: '' })
        } catch (err) {
            showErrorMsg('Cannot add review')
        }
    }

    async function addToyMsg() {
        const msgFromBack = await toyService.onAddToyMsg(toy._id, msg.txt)
        showSuccessMsg(`Msg Added, id:${msgFromBack.id}`)
        navigate('/toy')
    }

    async function removeToyMsg(msgId) {
        await toyService.onRemoveToyMsg(toy._id, msgId)
        showSuccessMsg(`Msg Removed`)
        navigate('/toy')
    }

    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <h1>Toy Name : {toy.name}</h1>
        <h5>Price: {toy.price}</h5>
        <img src={`https://robohash.org/${toy._id}?set=set2`} />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex laboriosam temporibus aliquid delectus nihil mollitia placeat reiciendis! Accusamus asperiores fuga expedita deserunt, rerum eum iste obcaecati repellendus temporibus reiciendis, nihil, consequatur adipisci labore soluta. Natus, enim. Tempora sint non necessitatibus odio a, ipsa, cupiditate itaque repellat cumque soluta accusantium quo.</p>
        <Link className="nice-link" to={`/toy/edit/${toy._id}`}>Edit</Link>
        <Link className="nice-link" to={`/toy`}>Go Back</Link>
        <MsgForm msg={msg} setMsg={setMsg} addToyMsg={addToyMsg} />
        {toy.msgs && <section className="toy-msgs">
            <h3>Toy Msg:</h3>
            <div>{toy.msgs.map(msg => <div key={msg.id} className="msg">{msg.txt} | By: {msg.by.fullname}<button onClick={() => removeToyMsg(msg.id)}>X</button></div>)}</div>
        </section>}
        <ReviewForm review={review} setReview={setReview} addToyReview={addToyReview} />
        <ToyReviews toy={toy} />
    </section>
}