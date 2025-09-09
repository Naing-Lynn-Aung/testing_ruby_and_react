import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

function QuestionDetail(props) {

    const [likeCount, setLikeCount ] = useState(props.question.likes_count);
    const [dislikeCount, setDislikeCount ] = useState(props.question.dislikes_count);

    const updateQuestionCounter = (data) => {
        fetch(`http://127.0.0.1:3000/api/v1/questions/${props.question.id}/update_counter`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(error => {
            console.log(error)
        })
    }

    const increment = () => {
        setLikeCount(likeCount + 1)
        updateQuestionCounter({count_for: 'like'})
    }

    const decrement = () => {
        setDislikeCount(dislikeCount + 1)
        updateQuestionCounter({count_for: 'dislike'})
    }

    return (
        <div className="card rounded-0 mt-3">
            <div className="card-body">
                <h3 className="card-title">{props.question.title}</h3>
                <p className="lead">
                    <span className='badge bg-primary'>{props.question.tag} </span>
                </p>

                <button type="button" className="btn btn-primary position-relative me-3" onClick={() => increment()}>
                    Like
                    { 
                        likeCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {likeCount}
                    </span> 
                    }
                </button>
                <button type="button" className="btn btn-primary position-relative" onClick={() => decrement()}>
                    Dislike
                    { 
                        dislikeCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {dislikeCount}
                    </span> 
                    }
                </button>
            </div>
        </div>
    )
}

export default QuestionDetail;