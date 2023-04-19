import React, { createContext, useContext } from "react"

interface Props {
	children: React.ReactNode
	value: any
}

const TaskContext = createContext<any>(undefined)

const TaskProvider = ({ children, value }: Props) => {
	return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

const useContextTasks = () => {
	return useContext(TaskContext)
}

export { TaskProvider, useContextTasks }
