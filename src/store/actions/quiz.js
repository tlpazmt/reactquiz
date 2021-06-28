import axios from 'axios'
import { FETCH_QUIZZES_ERROR, FETCH_QUIZZES_START, FETCH_QUIZZES_SUCCESS, FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, NEXT_QUESTION, RETRY_QUIZ } from './actionTypes'

export function fetchQuizzes() {
	return async dispatch => {
		dispatch(fetchQuizzesStart())

		try {
			const response = await axios.get('https://react-quiz-4c64d-default-rtdb.firebaseio.com/quiz.json')
			const quiz = []

			Object.keys(response.data).forEach((key, index) => quiz.push({
				id: key,
				name: `Тест №${index + 1}`
			}))

			dispatch(fetchQuizzesSuccess(quiz))
		} catch (error) {
			dispatch(fetchQuizzesError(error))
		}
	}
}

export function fetchQuizById(id) {
	return async dispatch => {
		dispatch(fetchQuizzesStart())
		try {
			const response = await axios.get(`https://react-quiz-4c64d-default-rtdb.firebaseio.com/quiz/${id}.json`)
			const quiz = response.data

			dispatch(fetchQuizSuccess(quiz))
		} catch (error) {
			dispatch(fetchQuizzesError(error))
		}
	}
}

export function answerClick(answerId) {
	return (dispatch, getState) => {
		const state = getState().quiz

		if (state.answerState) {
			const key = Object.keys(state.answerState)[0]
			if (state.answerState[key] === 'success')
				return
		}

		const results = state.results

		if (state.quiz[state.activeQuestion].rightAnswerId === answerId) {
			if (!state.results[state.activeQuestion]) {
				results[state.activeQuestion] = 'success'
			}
			dispatch(quizSetState({ [answerId]: 'success' }, results))

			const timeOut = window.setTimeout(() => {
				if (isQuizFinished(state.activeQuestion, state.quiz.length)) {
					dispatch(finishQuiz())
				} else {
					dispatch(nextQuestion())
				}
				window.clearTimeout(timeOut);
			}, 1000)
		} else {
			results[state.activeQuestion] = 'error'
			dispatch(quizSetState({ [answerId]: 'error' }, results))
		}
	}
}

export function fetchQuizzesStart() {
	return {
		type: FETCH_QUIZZES_START
	}
}

export function fetchQuizSuccess(quiz) {
	return {
		type: FETCH_QUIZ_SUCCESS,
		quiz
	}
}

export function fetchQuizzesSuccess(quizzes) {
	return {
		type: FETCH_QUIZZES_SUCCESS,
		quizzes
	}
}
export function fetchQuizzesError(error) {
	return {
		type: FETCH_QUIZZES_ERROR,
		error
	}
}

export function quizSetState(answerState, results) {
	return {
		type: QUIZ_SET_STATE,
		answerState,
		results
	}
}

export function finishQuiz() {
	return {
		type: FINISH_QUIZ
	}
}

export function nextQuestion() {
	return {
		type: NEXT_QUESTION
	}
}

export function retryQuiz() {
	return {
		type: RETRY_QUIZ
	}
}

const isQuizFinished = (activeQuestion, quizLength) => (activeQuestion + 1 === quizLength)

