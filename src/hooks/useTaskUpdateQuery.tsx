import { updateTaskApi } from "@/api/services"
import { TaskPropsType } from "@/types"
import { useMutation } from "@tanstack/react-query"

type ParamType = {
	id: string | number
	data: TaskPropsType
}

export const useTaskUpdateQuery = (options = {}) => {
	return useMutation({
		mutationFn: async (param: ParamType) => {
			const { id, data } = param
			await updateTaskApi(id, data)
		},
		...options,
	})
}
