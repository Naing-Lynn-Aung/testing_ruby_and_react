import React from 'react'
import ReactDOM from 'react-dom/client'

function Loader(props) {
    return (
        <div>
            { !props.isShowLoader && 
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> }
        </div>
    )
}

export default Loader;