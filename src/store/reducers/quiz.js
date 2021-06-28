import { FETCH_QUIZZES_ERROR, FETCH_QUIZZES_START, FETCH_QUIZZES_SUCCESS, FETCH_QUIZ_SUCCESS, FINISH_QUIZ, QUIZ_SET_STATE, NEXT_QUESTION, RETRY_QUIZ } from "../actions/actionTypes"

const initialState = {
	quizzes: [],
	loading: false,
	error: null,
	results: {},
	isFinished: false,
	activeQuestion: 0,
	answerState: null,
	quiz: null
}

export default function quizReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_QUIZZES_START:
			return {
				...state, loading: true
			}
		case FETCH_QUIZZES_SUCCESS:
			return {
				...state, loading: false, quizzes: action.quizzes
			}
		case FETCH_QUIZZES_ERROR:
			return {
				...state, loading: false, error: action.error
			}
		case FETCH_QUIZ_SUCCESS:
			return {
				...state, loading: false, quiz: action.quiz
			}
		case QUIZ_SET_STATE:
			return {
				...state, answerState: action.answerState, results: action.results
			}
		case FINISH_QUIZ:
			return {
				...state, isFinished: true
			}
		case NEXT_QUESTION:
			return {
				...state, activeQuestion: state.activeQuestion + 1, answerState: null
			}
		case RETRY_QUIZ:
			return {
				...state,
				activeQuestion: 0,
				results: {},
				isFinished: false,
				answerState: null
			}
		default:
			return state
	}
}