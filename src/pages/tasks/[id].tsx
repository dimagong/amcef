import React, { FC, useState } from "react"
import { useRouter } from "next/router"
import { GetStaticProps, GetStaticPaths } from "next"
import { getTaskByIDApi, getTasksApi, updateTaskApi } from "@/api/services"
import moment from "moment"

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

const TaskCard = (
	props: { task: TaskPropsType; hasError: boolean } = { task: initialTask, hasError: false }
) => {
	const { id } = props.task
	const router = useRouter()
	const [taskDetails, upTaskDetails] = useState<TaskPropsType>(() => {
		return { ...props.task }
	})

	const onChange = (event: React.ChangeEvent<any>) => {
		const { value, name } = event.target
		if (name === "status") {
			let status = value === "false" ? true : false
			upTaskDetails((prevState) => ({ ...prevState, isCompleted: status }))
		}
		upTaskDetails((prevState) => ({ ...prevState, [name]: value }))
	}

	const onSaveChange = () => {
		//taskDetails
		updateTaskApi(taskDetails.id, { ...taskDetails })
	}

	if (router.isFallback) {
		return <h1 role='loading'>Loading...</h1>
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
