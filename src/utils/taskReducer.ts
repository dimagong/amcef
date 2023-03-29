
import { TaskAction } from '@/types/TaskActionInterface';
import { TaskActionTypes } from '@/types/TaskActionTypes';
import {TaskListType} from '../components/TaskList'


const taskReducer = (state: TaskListType, action: TaskAction) => {
	const { type, payload } = action
	switch (type) {
		case TaskActionTypes.ADD_TASK:
			return {
				...state,
			}
		case TaskActionTypes.DELETE_TASK:
			return {
				...state,
			}
		case TaskActionTypes.OPEN_FORM_TASK:
			return {
				...state,
				isOpen: payload,
			}
		case TaskActionTypes.SEARCH_TASK:
			return {
				...state,
				selectedTasks: [...payload],
			}
		case TaskActionTypes.SELECT_TASK:
			return {
				...state,
				selectedTasks: [...payload],
			}
		case TaskActionTypes.UPDATE_TASK:
			return {
				...state,
				tasks: [...payload],
				selectedTasks: [...payload],
			}
		case TaskActionTypes.CREATE_TASK:
			return {
				...state,
				tasks: [...payload],
				selectedTasks: [...payload],
				isOpen: false,
			}
		default:
			return state
	}
}

export default taskReducer