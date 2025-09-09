import React from 'react'
import ReactDOM from 'react-dom/client'

function EmptyQuestionMessage(props) {
    return (
        <div>
            <div className="mt-5 alert alert-warning alert-dismissible fade show" role="alert">
                <strong>OOPs!</strong>  No questions found with this tags : { props.tagName }. Please select another options from the list.
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    )
}

export default EmptyQuestionMessage