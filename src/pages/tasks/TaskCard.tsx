import React, { FC } from "react"
import Link from "next/link"

export type TaskPropsType = {
	id: number
	title: string
	description: string
	deadline: string
	isCompleted: boolean
}

export const TaskCard: FC<TaskPropsType> = (props) => {
	const { title = "No Title", description = "No Description", deadline = new Date() } = props
	return (
		<div
			style={{
				minHeight: 200,
				border: "2px solid blue",
				borderRadius: 2,
				padding: 5,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-around",
			}}
		>
			<h1>{title}</h1>
			<h2 className='text-3xl font-bold underline'>{description}</h2>
			{/* <div>Deadline: {deadline.toLocaleString()}</div> */}

			<h2>
				<Link href='/'>Back to home</Link>
			</h2>
		</div>
	)
}

export default TaskCard
