import React, { FC } from "react"
import { useRouter } from "next/router"
import { GetStaticProps, GetStaticPaths } from "next"
import Link from "next/link"
import { getTaskByIDApi, getTasksApi } from "@/api/services"

export type TaskPropsType = {
	id: number
	title: string
	description: string
	deadline: string
	isCompleted: boolean
}

export const TaskCard = (props: any) => {
	console.log("props", props)
	//const { title = "No Title", description = "No Description", deadline = new Date() } = props

	const title = "No Title",
		description = "No Description",
		deadline = new Date()
	const router = useRouter()
	// const { id } = router.query
	// console.log("Page ID", id)

	if (router.isFallback) {
		return <h1>Loading...</h1>
	}
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

// export async function getStaticProps() {
// 	const res = await getTasksApi()
// 	const tasks = res.data
// 	return {
// 		props: {
// 			tasks,
// 		},
// 	}
// }

export const getStaticPaths: GetStaticPaths = async () => {
	// const data = await getData();
	// const pathsWithParams = data.stars.map((star: starInterface) => ({ params: { something: star.id }}))

	// return {
	//     paths: pathsWithParams,
	//     fallback: true
	// }
	const res = await getTasksApi()
	const tasks = res.data
	const paths = tasks.map((task: any) => ({
		params: { id: task.id },
	}))

	// { fallback: false } means other routes should 404
	return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
	const itemID = context.params?.id
	const res = await getTaskByIDApi(itemID as string)

	const task = res.data
	return {
		props: {
			task,
		},
	}
}
