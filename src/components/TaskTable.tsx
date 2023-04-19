import React, { FC } from "react"
import { useRouter } from "next/router"

import classnames from "classnames"
import moment from "moment"

import Image from "next/image"

import { TaskAction, TaskActionTypes, TaskPropsType } from "@/types"
import { UserIcon } from "@/assets/icons/UserIcon"
import { TaskListType } from "./TaskList"
import { deleteTaskApi, getTasksApi } from "@/api/services"
import { Table } from "./Table"
import { useContextTasks } from "@/hooks"
import { useContextState } from "@/hooks/useContextState"

// export type TaskListPropsType = {
// 	dispatch: React.Dispatch<TaskAction>
// 	state: TaskListType
// }

const TaskTable = () => {
	const { dispatch, state } = useContextState()
	const router = useRouter()

	const tasks = [...state.selectedTasks]

	const onDeleteTask = async (taskId: number) => {
		await deleteTaskApi(taskId)
		const res = await getTasksApi()
		const tasks = res.data
		dispatch({ type: TaskActionTypes.CREATE_TASK, payload: tasks })
	}

	const onEditeTask = (taskId: number): void => {
		router.push(`/tasks/${taskId}`)
	}

	return <Table tasks={tasks} onDeleteTask={onDeleteTask} onEditeTask={onEditeTask} />
}

export default TaskTable
