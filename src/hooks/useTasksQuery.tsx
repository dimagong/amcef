import { useQuery } from "@tanstack/react-query"

import { getTasksApi } from "@/api/services"

export const tasksQueryKeys = {
	all: () => ["tasks"],
}

export const useTasksQuery = (options = {}) => {
	return useQuery({
		queryKey: tasksQueryKeys.all(),
		queryFn: async () => {
			const { data } = await getTasksApi()
			return data
		},
		...options,
	})
}

// const { data } = useQuery({
//     queryKey: ["tasks"],
//     queryFn: async () => {
//         const { data } = await getTasksApi()
//         return data
//     },
// })
