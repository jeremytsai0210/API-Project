import { useState } from "react";
import './ReviewFormModal.css';

const ReviewFormModal = ({ isOpen, onClose, onSubmit }) => {
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(review.length >= 10 && stars) {
            try {
                await onSubmit({ review: review, stars });
                setReview("");
                setStars(null);
                setErrors({});
                onClose();
            } catch (err) {
                setErrors('Review already exists for thsi spot.');
            }
        } else {
            setErrors('Please provide a valid comment and star rating.');
        }
    };

    if(!isOpen) return null;

    return (
        <div className="review-form-modal">
            <h1>Leave a Review</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Review
                    <textarea
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Rating
                    <input
                        type="number"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit Your Review</button>
                {errors && <p>{errors}</p>}
            </form>
        </div>
    )
}

export default ReviewFormModal;


// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import * as reviewActions from "../../store/reviews";
// import './ReviewFormModal.css';

// const ReviewFormModal = ({ spotId }) => {
//     const dispatch = useDispatch();
//     const [review, setReview] = useState("");
//     const [rating, setRating] = useState(0);
//     const [errors, setErrors] = useState({});

//     const { closeModal } = useModal();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setErrors({});

//         const newReview = {
//             review,
//             stars: rating
//         };

//         return dispatch(reviewActions.createReview(spotId, newReview))
//             .then(closeModal)
//             .catch(async (res) => {
//                 const data = await res.json();
//                 if(data?.errors) {
//                     setErrors(data.errors);
//                 }
//             });
//     };

//     return (
//         <>
//             <h1>Leave a Review</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Review
//                     <input
//                         type="text"
//                         value={review}
//                         onChange={(e) => setReview(e.target.value)}
//                         required
//                     />
//                 </label>
//                 {errors.review && <p>{errors.review}</p>}
//                 <label>
//                     Rating
//                     <input
//                         type="number"
//                         value={rating}
//                         onChange={(e) => setRating(e.target.value)}
//                         required
//                     />
//                 </label>
//                 {errors.rating && <p>{errors.rating}</p>}
//                 <button 
//                     type="submit"
//                     disabled={review.length < 10 || rating < 1}
//                 >
//                     Submit Your Review
//                 </button>
//             </form>
//         </>
//     );
// };

// export default ReviewFormModal;