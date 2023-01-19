import { loadReviews, addReview, removeReview } from '../store/review.actions'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function ToyReviews({ toy }) {

    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    useEffect(() => {
        loadReviews()
        // let toyReviews = reviews.filter(review => review.aboutToy._id === toy._id)
    }, [])

    function getToyReviews() {
        return reviews.filter(review => review.aboutToy._id === toy._id)
    }
    return <section className="toy-reviews">
        {reviews && <ul className="review-list">
            {getToyReviews().map(review => (
                <li key={review._id}>
                    {/* {canRemove(review) &&
              <button onClick={() => onRemove(review._id)}>X</button>} */}
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
        </ul>}
    </section>
}