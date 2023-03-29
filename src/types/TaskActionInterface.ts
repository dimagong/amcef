import { TaskActionTypes } from "./TaskActionTypes"

export interface TaskAction {
	type: TaskActionTypes
	payload: any
}