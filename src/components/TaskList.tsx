import React, { FC, useEffect, useReducer } from "react"
import { useRouter } from "next/router"

import { deleteTaskApi, getTasksApi } from "../api/services"

import CreateTask from "./CreateTask"
import SearchTask from "./SearchTask"
import SelectTask from "./SelectTask"
import TaskTable from "./TaskTable"
import { ModalCreateTask } from "@/components/ModalCreateTask"

import { TaskActionTypes } from "@/types/TaskActionTypes"
import taskReducer from "@/utils/taskReducer"
import { TaskPropsType } from "@/types"
import { useContextTasks } from "@/hooks"

export type TaskListType = {
	tasks: TaskPropsType[]
	selectedTasks: TaskPropsType[]
	isOpen: boolean
}

const TaskList = () => {
	const tasks = useContextTasks()
	const initialTaskState: TaskListType = { tasks: [], selectedTasks: [], isOpen: false }

	const [state, dispatch] = useReducer(taskReducer, initialTaskState)
	const router = useRouter()
	console.log("state", state)

	useEffect(() => {
		if (tasks?.length) {
			dispatch({ type: TaskActionTypes.UPDATE_TASK, payload: tasks })
		}
	}, [tasks])

	const onSelectTackStatus = (e: React.ChangeEvent<any>) => {
		const selectedStatus = e.target.value
		if (selectedStatus.startsWith("Active")) {
			const activeTasks = [...state.tasks].filter((task) => !task.isCompleted)
			dispatch({ type: TaskActionTypes.SELECT_TASK, payload: activeTasks })
		} else if (selectedStatus.startsWith("Completed")) {
			const completedTasks = [...state.tasks].filter((task) => task.isCompleted)
			dispatch({ type: TaskActionTypes.SELECT_TASK, payload: completedTasks })
		} else {
			dispatch({ type: TaskActionTypes.SELECT_TASK, payload: [...state.tasks] })
		}
	}

	const onSearch = (event: any) => {
		if (event.target.value.trim().length) {
			const searchText = new RegExp(event.target.value)
			const findСoincidence: TaskPropsType[] = []
			state.tasks.forEach((task) => {
				for (const key in task) {
					const finfMatch = task[key as keyof typeof task].toString().match(searchText)
					if (finfMatch?.length) {
						const existTask = findСoincidence.find((el) => el.id === task.id)
						if (!existTask) findСoincidence.push(task)
					}
				}
			})
			if (findСoincidence.length) {
				dispatch({ type: TaskActionTypes.SEARCH_TASK, payload: findСoincidence })
			}
		} else {
			dispatch({ type: TaskActionTypes.SEARCH_TASK, payload: [...state.tasks] })
		}
	}
	const onDeleteTask = async (taskId: number) => {
		await deleteTaskApi(taskId)
		onUpdateListTasks()
	}

	const onCreateTask = () => {
		dispatch({ type: TaskActionTypes.OPEN_FORM_TASK, payload: true })
	}

	const onEditeTask = (taskId: number): void => {
		router.push(`/tasks/${taskId}`)
	}
	const onCloseModal = () => {
		dispatch({ type: TaskActionTypes.OPEN_FORM_TASK, payload: false })
	}
	const onUpdateListTasks = async () => {
		const res = await getTasksApi()
		const tasks = res.data
		dispatch({ type: TaskActionTypes.CREATE_TASK, payload: tasks })
		//return router.replace(router.asPath)
	}
	return (
		<div className='w-full max-w-6xl h-screen flex flex-col justify-center overflow-y-hidden'>
			<div>
				<div className='flex flex-row justify-start pb-1 fixed'>
					<CreateTask onCreateTask={onCreateTask} />
					<SelectTask onSelectTackStatus={onSelectTackStatus} />
					<SearchTask onSearch={onSearch} />
				</div>
				<TaskTable
					tasks={state.selectedTasks}
					onDeleteTask={onDeleteTask}
					onEditeTask={onEditeTask}
				/>
				<ModalCreateTask
					open={state.isOpen}
					onClose={onCloseModal}
					onUpdateListTasks={onUpdateListTasks}
				/>
			</div>
		</div>
	)
}

export default TaskList
