import React, { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { GetStaticProps, GetStaticPaths } from "next"
import { getTaskByIDApi, getTasksApi, updateTaskApi } from "@/api/services"
import moment from "moment"
import { QueryClient, dehydrate } from "@tanstack/react-query"
import { useTaskIDQuery } from "@/hooks"
import { useTaskUpdateQuery } from "@/hooks/useTaskUpdateQuery"
import { Loader } from "@/components/Loader"

type TaskPropsType = {
	id: number
	title: string
	description: string
	deadline: string
	isCompleted: boolean
	avatar: string
	assigned: string
}

export const initialTask = {
	id: 0,
	title: "No title",
	description: "No description",
	deadline: `1-01-2024`,
	isCompleted: false,
	avatar: "",
	assigned: "No assigned",
}

const TaskCard = () => {
	const router = useRouter()
	const id = typeof router.query?.id === "string" ? router.query.id : ""

	const { data: task, isError, isLoading } = useTaskIDQuery(id)
	const { mutate } = useTaskUpdateQuery()

	const [taskDetails, upTaskDetails] = useState<TaskPropsType>(() => {
		return { ...task }
	})

	useEffect(() => {
		if (task) upTaskDetails(task)
	}, [task])

	const onChange = (event: React.ChangeEvent<any>) => {
		const { value, name } = event.target
		if (name === "status") {
			let status = value === "false" ? true : false
			upTaskDetails((prevState) => ({ ...prevState, isCompleted: status }))
		}
		upTaskDetails((prevState) => ({ ...prevState, [name]: value }))
	}

	const onSaveChange = () => {
		mutate({ id, data: { ...taskDetails } })
	}

	if (router.isFallback || isLoading) {
		return <Loader />
	}
	if (isError) {
		return <h1 role='loading'>Something went wrong...</h1>
	}

	return (
		<div className='w-full h-screen flex  justify-center items-center'>
			<div className='w-2/5 overflow-hidden bg-white shadow sm:rounded-lg '>
				<div className='px-4 py-5 sm:px-6'>
					<h3 role='number-of-tasks' className='text-base font-semibold leading-6 text-gray-900'>
						The task N {id}
					</h3>
					<p className='mt-1 max-w-2xl text-sm text-gray-500'>Task details</p>
				</div>
				<div className='border-t border-gray-200'>
					<dl>
						<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Title</dt>
							<input
								role='input-task-title'
								onChange={onChange}
								name='title'
								type='text'
								className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'
								value={taskDetails.title}
							/>
						</div>
						<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Description</dt>
							<textarea
								onChange={onChange}
								name='description'
								rows={5}
								className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'
								value={taskDetails.description}
							/>
						</div>
						<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Deadline</dt>
							<input
								onChange={onChange}
								name='deadline'
								type='text'
								className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'
								value={`${moment(taskDetails.deadline).format("DD-MM-YYYY")}`}
							/>
						</div>
						<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Status</dt>
							<dd className='flex items-center mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
								<input
									className=''
									type='checkbox'
									id='status'
									name='status'
									value={`${taskDetails.isCompleted}`}
									checked={taskDetails.isCompleted}
									onChange={onChange}
								/>
								<label htmlFor='status' className='ml-2 h-6'>
									{taskDetails.isCompleted ? "Completed" : "Not completed"}
								</label>
							</dd>
						</div>
						<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<button
								onClick={onSaveChange}
								className='sm:col-span-3 mx-auto h-8 w-28 px-1 py-1 text-sm text-silver-600 font-semibold rounded-full border border-silver-200 hover:text-white hover:bg-slate-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2'
							>
								Save change
							</button>
						</div>
					</dl>
				</div>
			</div>
		</div>
	)
}

export default TaskCard

export const getStaticProps: GetStaticProps = async (context) => {
	const id = context.params?.id as string
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(["task", id], async () => {
		const { data } = await getTaskByIDApi(id)
		return data
	})

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: "blocking",
	}
}
