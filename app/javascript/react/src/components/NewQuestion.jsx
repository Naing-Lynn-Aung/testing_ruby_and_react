import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import ServerSideError from './ServerSideError'

function NewQuestion() {
    const questionsTags = [
        { label: 'Ruby', value: 'Ruby' },
        { label: 'Rails', value: 'Rails' },
        { label: 'React', value: 'React' },
        { label: 'Bootstrap', value: 'Bootstrap' },
        { label: 'Javascript', value: 'Javascript' },
        { label: 'Data Structure', value: 'Data Structure' }
    ]

    const [isServerSideError, setIsServerSideError] = useState(false)
    const [serverErrors, setServerErrors] = useState([])

    const [formField, setFormField] = useState({
        title: '',
        tag: questionsTags[0].value
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch('http://127.0.0.1:3000/api/v1/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formField)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success :', data)
            if(data['status'] == 'failure') {
                setIsServerSideError(true)
                setServerErrors(data['data'])
            }else {
                setIsServerSideError(false)
                setServerErrors([])
            }
        })
        .catch(error => {
            console.log('Error:', error)
        })
        
    }

    const handleFormFields = (event) => {
        setFormField({ ...formField, [event.target.name]: event.target.value})
    }

    const clearData = () => {
        setIsServerSideError(false)
        setServerErrors([])
        setFormField({
        title: '',
        tag: questionsTags[0].value
    })
    }

    return(
        
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Write your question add help the world to grow</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={event => handleSubmit(event)}>
                        <div className="modal-body">
                            { isServerSideError && <ServerSideError errors={serverErrors} /> }
                            <div className="form-group">
                                <label className='form-label my-3'>Title</label>
                                <input type="text" className='form-control form-control-lg rounded-0' name='title' value={formField.title} onChange={event => handleFormFields(event)} />
                            </div>
                            <div className="form-group">
                                <label className='form-label my-3'>Select the question tag</label>
                                <select className="form-select form-select-lg rounded-0" value={formField.tag} name='tag' onChange={event => handleFormFields(event)}>
                                    { questionsTags.map(tag => (
                                        <option value={tag.value} key={tag.value}>{tag.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={clearData}>Close</button>
                            <button type="submit" className="btn btn-primary">Submit Question</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default NewQuestion;