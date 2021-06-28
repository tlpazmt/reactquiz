import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../../components/UI/Button/Button'
import { Link } from 'react-router-dom'

const FinishedQuiz = props => {
	const rightAnswers = Object.keys(props.results).reduce((total, key) => {
		if (props.results[key] === 'success') {
			total++;
		}

		return total
	}, 0)

	return (
		<div className={classes['FinishedQuiz']}>
			<ul>
				{props.quiz.map((question, index) => {
					return (
						<li key={index} >
							<strong>{index + 1}. </strong>
							{question.question}
							{
								props.results[index] === 'success'
									? <i className={['fa', 'fa-check', classes[props.results[index]]].join(' ')} />
									: <i className={['fa', 'fa-times', classes[props.results[index]]].join(' ')} />}
						</li>
					)
				})}
			</ul>

			<p>Правильно: {rightAnswers} из {props.quiz.length}</p>

			<div>
				<Button onClick={props.onRetry} type="primary">Повторить</Button>
				<Link to="/">
					<Button type="success">Перейти в список тестов</Button>
				</Link>
			</div>
		</div>
	)
}

export default FinishedQuiz