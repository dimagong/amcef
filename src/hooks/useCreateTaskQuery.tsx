import { createTaskApi } from "@/api/services"
import { TaskPropsType } from "@/types"
import { useMutation } from "@tanstack/react-query"

export const useCreateTaskQuery = (options = {}) => {
	return useMutation({
		mutationFn: async (data: Partial<TaskPropsType>) => await createTaskApi(data),
		...options,
	})
}
