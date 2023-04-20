import { deleteTaskApi } from "@/api/services"
import { useMutation } from "@tanstack/react-query"

export const useDeleteTaskQuery = (options = {}) => {
	return useMutation({
		mutationFn: async (taskId: number) => await deleteTaskApi(taskId),
		...options,
	})
}
