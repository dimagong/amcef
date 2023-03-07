import React from "react"

export const CreateTask = ({ onCreateTask }: any) => {
	return (
		<button
			onClick={onCreateTask}
			className='block bg-zinc-500 hover:bg-zinc-600 text-white py-1 px-4 mr-2 border  rounded leading-tight'
		>
			Create task
		</button>
	)
}
