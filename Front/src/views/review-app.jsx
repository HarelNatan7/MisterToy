import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { userService } from '../services/user.service'

import { loadReviews, addReview, removeReview } from '../store/review.actions'
// import { loadUsers } from '../store/user.actions'

export function ReviewApp() {

  // const users = useSelector(storeState => storeState.userModule.users)
  const loggedInUser = userService.getLoggedinUser()
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)

  const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutUserId: '' })

  useEffect(() => {
    loadReviews()
    // loadUsers()
  }, [])

  const onRemove = async reviewId => {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  function canRemove(review) {
    return review.byUser._id === loggedInUser?._id || loggedInUser?.isAdmin
  }


  return (
    <div className="review-app">
      <h1>Reviews and Gossip</h1>
      {reviews && <ul className="review-list">
        {reviews.map(review => (
          <li key={review._id}>
            {canRemove(review) &&
              <button onClick={() => onRemove(review._id)}>X</button>}
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
      {/* {users && loggedInUser &&
        <form onSubmit={onAddReview}>
          <select
            onChange={handleChange}
            value={reviewToEdit.aboutUserId}
            name="aboutUserId"
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.fullname}
              </option>
            ))}
          </select>
          <textarea
            name="txt"
            onChange={handleChange}
            value={reviewToEdit.txt}
          ></textarea>
          <button>Add</button>
        </form>} */}
      <hr />
    </div>
  )
}