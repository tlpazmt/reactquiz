import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => (
	<div className={classes['ActiveQuiz']}>
		<p className={classes['Question']}>
			<span>
				<strong>{props.activeQuestion + 1}. </strong>
				{props.question}
			</span>
			<small>{props.activeQuestion + 1} из {props.questionLength}</small>
		</p>
		<AnswersList
			answers={props.answers}
			onAnswerClick={props.onAnswerClick}
			state={props.state} />
	</div>
)

export default ActiveQuiz