import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById, answerClick, retryQuiz } from '../../store/actions/quiz'

class Quiz extends Component {
	componentDidMount() {
		this.props.fetchQuizById(this.props.match.params.id)
	}

	componentWillUnmount() {
		this.props.retryQuiz()
	}

	render() {
		return (
			<div className={classes['Quiz']}>
				<div className={classes['QuizWrapper']}>
					<h1>Quiz</h1>
					{
						this.props.loading || !this.props.quiz
							? <Loader />
							: this.props.isFinished
								? <FinishedQuiz results={this.props.results}
									quiz={this.props.quiz}
									onRetry={this.props.retryQuiz} />
								: <ActiveQuiz
									question={this.props.quiz[this.props.activeQuestion].question}
									answers={this.props.quiz[this.props.activeQuestion].answers}
									onAnswerClick={this.props.answerClick}
									questionLength={this.props.quiz.length}
									activeQuestion={this.props.activeQuestion}
									state={this.props.answerState} />
					}

				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		results: state.quiz.results,
		isFinished: state.quiz.isFinished,
		activeQuestion: state.quiz.activeQuestion,
		answerState: state.quiz.answerState,
		quiz: state.quiz.quiz,
		loading: state.quiz.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchQuizById: id => dispatch(fetchQuizById(id)),
		answerClick: answerId => dispatch(answerClick(answerId)),
		retryQuiz: () => dispatch(retryQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)