import React from 'react'
import ReactDOM from 'react-dom/client'
import QuestionList from './QuestionList'

const Welcome = () => {
	return (
		<div className='container'>
			<h1>Hello! Welcome to rails with react</h1>
			<QuestionList />
		</div>
	)
}

const root = ReactDOM.createRoot(document.getElementById('welcome'))
root.render(
	<React.StrictMode>
		<Welcome />
	</React.StrictMode>
)


export default Welcome;