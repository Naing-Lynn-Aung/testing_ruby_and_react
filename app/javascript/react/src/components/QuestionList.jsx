import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import QuestionDetail from './QuestionDetail'
import EmptyQuestionMessage from './EmptyQuestionMessage'
import Loader from './Loader'
import NewQuestion from './NewQuestion'

function QuestionList() {

    const questionsTags = [
        { label: 'All', value: 0 },
        { label: 'Ruby', value: 1 },
        { label: 'Rails', value: 2 },
        { label: 'React', value: 3 },
        { label: 'Bootstrap', value: 4 },
        { label: 'Javascript', value: 5 }
    ]

    const [questionsList, setQuestionsList] = useState([])
    const [selectedOption, setSelectedOption] = useState(questionsTags[0].value)
    const [isShowAlert, setIsShowAlert] = useState(false)
    const [isShowLoader, setIsShowLoader] = useState(true)
    const questionsUrl = 'http://127.0.0.1:3000/api/v1/questions'

    const fetchQuestionsList = () => {
        setIsShowLoader(false)
        fetch(questionsUrl)
        .then(response => response.json())
        .then(data => setQuestionsList(data))
    }

    useEffect(() => {
        fetchQuestionsList()
    },[])
    
    const updateSelectedItem = (event) => {
        setIsShowLoader(false)
        setIsShowAlert(false)
        setQuestionsList([])
        setSelectedOption(event.target.value)
        fetch(questionsUrl + `?tags=${questionsTags[event.target.value].label}`)
        .then(response => response.json())
        .then(data => {
            setQuestionsList(data)
            if(data.length == 0) {
                setIsShowAlert(true)
                setIsShowLoader(true)
            } 
        }
        )
    }

    return (
        <div className="row">
            <div className="col-lg-10 mx-auto">
                <p className='lead fw-bold'>Filter Question Tags</p>

                <button type="button" className="my-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Contribute your Question
                </button>

                <select name="" className='form-select form-select-lg' value={selectedOption} onChange={event => updateSelectedItem(event)}>
                    {questionsTags.map(tag => (
                        <option key={tag.value} value={tag.value}>{tag.label}</option>
                    ))}
                </select>
                {questionsList.length > 0 ? questionsList.map(question =>
                    <QuestionDetail question={question} key={question.id} />
                ) : <Loader isShowLoader={isShowLoader} /> }
                { isShowAlert && <EmptyQuestionMessage tagName={questionsTags[selectedOption].label} /> }
                
            </div>
            <NewQuestion/>
        </div>
    )
}

export default QuestionList;