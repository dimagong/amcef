import { useQuery } from "@tanstack/react-query"

import { getTaskByIDApi, getTasksApi } from "@/api/services"

const tasksQueryKeys = {
	all: () => ["task"],
	byId: (id: string | number) => [...tasksQueryKeys.all(), { id }],
}

export const useTaskIDQuery = (taskId: string | number, options = {}) => {
	return useQuery({
		queryKey: tasksQueryKeys.byId(taskId),
		queryFn: async () => {
			const { data } = await getTaskByIDApi(taskId)
			return data
		},
		...options,
	})
}
