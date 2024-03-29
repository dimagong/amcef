import React from "react"

const CreateTask = ({ onCreateTask }: any) => {
	return (
		<button
			role='buttonCreateTask'
			onClick={onCreateTask}
			className='block bg-zinc-500 hover:bg-zinc-600 text-white py-1 px-4 mr-2 border  rounded leading-tight'
		>
			Create task
		</button>
	)
}

export default CreateTask
