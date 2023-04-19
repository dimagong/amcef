import { TaskListType } from "@/components/TaskList"
import { TaskAction, TaskActionTypes } from "@/types"
import React, { createContext, useContext, useEffect, useReducer } from "react"
import { useContextTasks } from "./useContextTasks"
import taskReducer from "@/utils/taskReducer"

interface Props {
	children: React.ReactNode
}

const StateContext = createContext<any>(undefined)

const StateProvider = ({ children }: Props) => {
	const tasks = useContextTasks()
	const initialTaskState: TaskListType = { tasks: [], selectedTasks: [], isOpen: false }

	const [state, dispatch] = useReducer(taskReducer, initialTaskState)

	useEffect(() => {
		if (tasks?.length) dispatch({ type: TaskActionTypes.UPDATE_TASK, payload: tasks })
	}, [tasks])
	return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>
}

const useContextState = () => {
	return useContext(StateContext)
}

export { StateProvider, useContextState }
