import { TaskAction, TaskActionTypes, TaskPropsType } from "@/types"
import CreateTask from "./CreateTask"
import SearchTask from "./SearchTask"
import SelectTask from "./SelectTask"
import { TaskListType } from "./TaskList"
import { useContextState } from "@/hooks/useContextState"

export const TaskNavigation = () => {
	const { dispatch, state } = useContextState()
	const onCreateTask = () => {
		dispatch({ type: TaskActionTypes.OPEN_FORM_TASK, payload: true })
	}
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
			const searchText = new RegExp(event.target.value, "gi")
			const findСoincidence: TaskPropsType[] = []
			state.tasks.forEach((task: TaskPropsType) => {
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
			} else {
				dispatch({ type: TaskActionTypes.SEARCH_TASK, payload: [...state.tasks] })
			}
		} else {
			dispatch({ type: TaskActionTypes.SEARCH_TASK, payload: [...state.tasks] })
		}
	}
	return (
		<div className='flex flex-row justify-start pb-1 fixed'>
			<CreateTask onCreateTask={onCreateTask} />
			<SelectTask onSelectTackStatus={onSelectTackStatus} />
			<SearchTask onSearch={onSearch} />
		</div>
	)
}
