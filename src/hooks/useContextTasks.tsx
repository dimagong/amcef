import React, { createContext, useContext } from "react"
import { useTasksQuery } from "./useTasksQuery"
import { Loader } from "@/components/Loader"

interface Props {
	children: React.ReactNode
}

const TaskContext = createContext<any>(undefined)

const TaskProvider = ({ children }: Props) => {
	const { data: tasks, isLoading, isError } = useTasksQuery()

	return (
		<TaskContext.Provider value={tasks}>
			{isLoading || isError ? <Loader /> : children}
		</TaskContext.Provider>
	)
}

const useContextTasks = () => {
	return useContext(TaskContext)
}

export { TaskProvider, useContextTasks }
