import axios from "axios"
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from "./actionTypes"


export function createQuizQuestion(item) {
	return {
		type: CREATE_QUIZ_QUESTION,
		item
	}
}

export function finishCreateQuiz() {
	return async (dispatch, getState) => {
		await axios.post('https://react-quiz-4c64d-default-rtdb.firebaseio.com/quiz.json', getState().create.quiz)
		dispatch(resetQuizCreation())
	}
}

export function resetQuizCreation() {
	return {
		type: RESET_QUIZ_CREATION
	}
}

