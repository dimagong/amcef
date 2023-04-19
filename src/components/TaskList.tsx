import React, { useEffect, useReducer } from "react"

import TaskTable from "./TaskTable"
import { ModalCreateTask } from "@/components/ModalCreateTask"

import { TaskActionTypes } from "@/types/TaskActionTypes"
import taskReducer from "@/utils/taskReducer"
import { TaskPropsType } from "@/types"
import { useContextTasks } from "@/hooks"
import { TaskNavigation } from "./TaskNavigation"
import { TitleTable } from "./TitleTable"
import { StateProvider } from "@/hooks/useContextState"

export type TaskListType = {
	tasks: TaskPropsType[]
	selectedTasks: TaskPropsType[]
	isOpen: boolean
}

const TaskList = () => {
	const tasks = useContextTasks()
	const initialTaskState: TaskListType = { tasks: [], selectedTasks: [], isOpen: false }

	const [state, dispatch] = useReducer(taskReducer, initialTaskState)

	useEffect(() => {
		if (tasks?.length) dispatch({ type: TaskActionTypes.UPDATE_TASK, payload: tasks })
	}, [tasks])

	return (
		<div className='w-full max-w-6xl h-screen flex flex-col justify-center overflow-y-hidden'>
			<div>
				<TitleTable />
				<StateProvider value={{ state, dispatch }}>
					<TaskNavigation />
					<TaskTable />
					<ModalCreateTask />
				</StateProvider>
			</div>
		</div>
	)
}

export default TaskList
