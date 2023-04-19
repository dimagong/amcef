import { TaskListType } from "@/components/TaskList"
import { TaskAction } from "@/types"
import React, { createContext, useContext } from "react"

interface Props {
	children: React.ReactNode
	value: {
		dispatch: React.Dispatch<TaskAction>
		state: TaskListType
	}
}

const StateContext = createContext<any>(undefined)

const StateProvider = ({ children, value }: Props) => {
	return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

const useContextState = () => {
	return useContext(StateContext)
}

export { StateProvider, useContextState }
