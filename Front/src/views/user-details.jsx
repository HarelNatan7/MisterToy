import { loadReviews, addReview, removeReview } from '../store/review.actions'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from "react-router-dom";

import { userService } from '../services/user.service.js'

export function UserDetails() {

    // const [user, setUser] = useState(userService.getLoggedinUser())
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const { userId } = useParams()
    const user = userService.getById(userId) || userService.getLoggedinUser()

    useEffect(() => {
        loadReviews()
    }, [])

    function getUserReviews() {
        return reviews.filter(review => review.byUser._id === userId)
    }
    if (!user) return <div>Loading...</div>
    return <section className="user-details">
        <h1>Full Name: {user.fullname}</h1>
        <h2>User Reviews: </h2>
        {getUserReviews().map(review => (
            <li key={review._id}>
                <p>
                    About:
                    <Link to={`/toy/${review.aboutToy._id}`}>
                        {review.aboutToy.name}
                    </Link>
                </p>
                <h3>{review.txt}</h3>
                <p>
                    By:
                    {review.byUser && <Link to={`/user-details/${review.byUser._id}`}>
                        {review.byUser.fullname}
                    </Link>}

                </p>
                <hr />
            </li>
        ))}
    </section>
}