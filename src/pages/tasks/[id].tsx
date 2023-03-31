import React, { FC, useState } from "react"
import { useRouter } from "next/router"
import { GetStaticProps, GetStaticPaths } from "next"
import Link from "next/link"
import { getTaskByIDApi, getTasksApi, updateTaskApi } from "@/api/services"

export type TaskPropsType = {
	id: number
	title: string
	description: string
	deadline: string
	isCompleted: boolean
}

export const TaskCard = (props: { task: TaskPropsType; hasError: boolean }) => {
	const {
		title = "No Title",
		id,
		description = "No Description",
		deadline,
		isCompleted,
	} = props.task
	const router = useRouter()
	const [taskDetails, upTaskDetails] = useState<TaskPropsType>(() => {
		return { ...props.task }
	})

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target
		console.log("event.target", event.target)
		upTaskDetails((prevState) => ({ ...prevState, [name]: value }))
	}

	const onSaveChange = () => {
		//taskDetails
		updateTaskApi(taskDetails.id, { ...taskDetails })
	}

	// const { id } = router.query
	// console.log("Page ID", id)

	if (router.isFallback) {
		return <h1>Loading...</h1>
	}
	return (
		<div className='w-full h-screen flex  justify-center items-center'>
			<div className='overflow-hidden bg-white shadow sm:rounded-lg max-w-xl'>
				<div className='px-4 py-5 sm:px-6'>
					<h3 className='text-base font-semibold leading-6 text-gray-900'>The task N {id}</h3>
					<p className='mt-1 max-w-2xl text-sm text-gray-500'>Task details</p>
				</div>
				<div className='border-t border-gray-200'>
					<dl>
						<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Title</dt>
							<input
								onChange={onChange}
								name='title'
								type='text'
								className='mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0'
								value={taskDetails.title}
							/>
							<button
								onClick={onSaveChange}
								className='ml-auto h-8 w-28 px-1 py-1 text-sm text-silver-600 font-semibold rounded-full border border-silver-200 hover:text-white hover:bg-slate-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'
							>
								Save change
							</button>
						</div>
						<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Description</dt>
							<input
								onChange={onChange}
								name='description'
								type='text'
								className='mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0'
								value={taskDetails.description}
							/>
							<button
								onClick={onSaveChange}
								className='ml-auto h-8 w-28 px-1 py-1 text-sm text-silver-600 font-semibold rounded-full border border-silver-200 hover:text-white hover:bg-slate-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'
							>
								Save change
							</button>
						</div>
						<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Deadline</dt>
							<input
								onChange={onChange}
								name='deadline'
								type='text'
								className='mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0'
								value={taskDetails.deadline}
							/>
							<button
								onClick={onSaveChange}
								className='ml-auto h-8 w-28 px-1 py-1 text-sm text-silver-600 font-semibold rounded-full border border-silver-200 hover:text-white hover:bg-slate-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'
							>
								Save change
							</button>
						</div>
						<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Status</dt>
							<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
								{taskDetails.isCompleted ? "Completed" : "Not completed"}
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	)
}

export default TaskCard

export const getStaticPaths: GetStaticPaths = async () => {
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
