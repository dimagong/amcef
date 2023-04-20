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
import { useContextTasks, useTasksQuery } from "@/hooks"
import { useContextState } from "@/hooks/useContextState"
import { useDeleteTaskQuery } from "@/hooks/useDeleteTaskQuery"

const TaskTable = () => {
	const { dispatch, state } = useContextState()
	const router = useRouter()

	const tasks = [...state.selectedTasks]

	const { mutate } = useDeleteTaskQuery()
	const { data: upTasks, refetch, isError } = useTasksQuery()

	const onDeleteTask = async (taskId: number) => {
		mutate(taskId, {
			onSuccess: async () => {
				await refetch()
				dispatch({ type: TaskActionTypes.CREATE_TASK, payload: upTasks })
			},
		})
	}

	const onEditeTask = (taskId: number): void => {
		router.push(`/tasks/${taskId}`)
	}

	return <Table tasks={tasks} onDeleteTask={onDeleteTask} onEditeTask={onEditeTask} />
}

export default TaskTable
