import React, { useEffect, useReducer } from "react"

import TaskTable from "./TaskTable"
import { ModalCreateTask } from "@/components/ModalCreateTask"
import { TaskPropsType } from "@/types"
import { TaskNavigation } from "./TaskNavigation"
import { TitleTable } from "./TitleTable"
import { StateProvider } from "@/hooks/useContextState"

export type TaskListType = {
	tasks: TaskPropsType[]
	selectedTasks: TaskPropsType[]
	isOpen: boolean
}

const TaskList = () => {
	return (
		<div className='w-full max-w-6xl h-screen flex flex-col justify-center overflow-y-hidden'>
			<div>
				<TitleTable />
				<StateProvider>
					<TaskNavigation />
					<TaskTable />
					<ModalCreateTask />
				</StateProvider>
			</div>
		</div>
	)
}

export default TaskList
