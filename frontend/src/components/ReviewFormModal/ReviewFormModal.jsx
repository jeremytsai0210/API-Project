import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewActions from "../../store/reviews";
import './ReviewFormModal.css';

function ReviewFormModal({ spotId }) {
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});

    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newReview = {
            review,
            stars
        };

        const response = await dispatch(reviewActions.createReview(spotId, newReview));

        if (response.ok) {
            closeModal();
            await dispatch(reviewActions.fetchReviews(spotId));
        } else {
            setErrors(response.data.errors);
        }
    };

    return (
        <>
            <div className="review-form-modal">
                <h2>How was your stay?</h2>
                {errors && errors.errors && (
                    <p className="error">Error occured.</p>
                )}
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Leave your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                    <input
                        type="number"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                    />
                    <button
                        className="submit-button"
                        type="submit"
                        disabled={review}
                    >Submit Your Review</button>
                </form>
            </div>
        </>
    );
}

export default ReviewFormModal;

// import { useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { useModal } from "../../context/Modal";
// // import * as reviewActions from "../../store/reviews";
// import './ReviewFormModal.css';
// // import { useParams } from "react-router-dom";

// function ReviewFormModal({ isOpen, onClose, onSubmit }) {
//     // const dispatch = useDispatch();
//     const [review, setReview] = useState("");
//     const [stars, setStars] = useState(0);
//     const [errors, setErrors] = useState("");
//     // const { closeModal } = useModal();

//     // const { spotId } = useParams();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // const newReview = {
//         //     review,
//         //     stars
//         // }
//         console.log("\n");
//         console.log("ReviewFormModal handleSubmit");
//         console.log("\n");
//         if(review.length >= 10 && stars) {
//             setErrors({});
//             // return dispatch(
//             //     reviewActions.createReview(
//             //     spotId, 
//             //     review
//             // ))
//             //     .then(closeModal)
//             //     .catch(async (res) => {
//             //         const data = await res.json();
//             //         if(data?.errors) {
//             //             setErrors(data.errors);
//             //         }
//             //     })
//             // setReview("");
//             // setStars(null);
//             await onSubmit({ review, stars });
//             setReview("");
//             setStars(0);
//             setErrors('');
//             onClose();
//         } else {
//             console.log("\n");
//             console.log("ReviewFormModal handleSubmit - ERROR");
//             console.log("\n"); 
//         }
//         return setErrors({
//             confirmReview: "Please provide a valid comment and star rating."
//         });
//     };

//     return (
//         <div className="review-form-modal">
//             <h1>How was your stay?</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Review
//                     <textarea
//                         type="text"
//                         value={review}
//                         onChange={(e) => setReview(e.target.value)}
//                         placeholder="Leave your review here..."
//                         required
//                     />
//                 </label>
//                 <label>
//                     Rating
//                     <input
//                         type="number"
//                         value={stars}
//                         onChange={(e) => setStars(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <button type="submit">Submit Your Review</button>
//                 {errors && <p>{errors}</p>}
//             </form>
//         </div>
//     )
// }

// export default ReviewFormModal;


// // import { useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { useModal } from "../../context/Modal";
// // import * as reviewActions from "../../store/reviews";
// // import './ReviewFormModal.css';

// // const ReviewFormModal = ({ spotId }) => {
// //     const dispatch = useDispatch();
// //     const [review, setReview] = useState("");
// //     const [rating, setRating] = useState(0);
// //     const [errors, setErrors] = useState({});

// //     const { closeModal } = useModal();

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         setErrors({});

// //         const newReview = {
// //             review,
// //             stars: rating
// //         };

// //         return dispatch(reviewActions.createReview(spotId, newReview))
// //             .then(closeModal)
// //             .catch(async (res) => {
// //                 const data = await res.json();
// //                 if(data?.errors) {
// //                     setErrors(data.errors);
// //                 }
// //             });
// //     };

// //     return (
// //         <>
// //             <h1>Leave a Review</h1>
// //             <form onSubmit={handleSubmit}>
// //                 <label>
// //                     Review
// //                     <input
// //                         type="text"
// //                         value={review}
// //                         onChange={(e) => setReview(e.target.value)}
// //                         required
// //                     />
// //                 </label>
// //                 {errors.review && <p>{errors.review}</p>}
// //                 <label>
// //                     Rating
// //                     <input
// //                         type="number"
// //                         value={rating}
// //                         onChange={(e) => setRating(e.target.value)}
// //                         required
// //                     />
// //                 </label>
// //                 {errors.rating && <p>{errors.rating}</p>}
// //                 <button 
// //                     type="submit"
// //                     disabled={review.length < 10 || rating < 1}
// //                 >
// //                     Submit Your Review
// //                 </button>
// //             </form>
// //         </>
// //     );
// // };

// // export default ReviewFormModal;