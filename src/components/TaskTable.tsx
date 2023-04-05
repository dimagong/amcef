import React, { FC } from "react"
import classnames from "classnames"

import Image from "next/image"

import { TaskPropsType } from "@/types"
import { UserIcon } from "@/assets/icons/UserIcon"

export type TaskListPropsType = {
	tasks: TaskPropsType[]
	onDeleteTask: (taskId: number) => void
	onEditeTask: (taskId: number) => void
}

const TaskTable: FC<TaskListPropsType> = ({ tasks = [], onDeleteTask, onEditeTask }) => {
	return (
		<div>
			<div className='mt-9 max-h-[32rem] overflow-y-auto'>
				<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								{`N(${tasks.length})`}
							</th>

							<th scope='col' className='px-6 py-3'>
								Task
							</th>
							<th scope='col' className='px-6 py-3'>
								Assigned
							</th>
							<th scope='col' className='px-6 py-3'>
								Description
							</th>
							<th scope='col' className='px-6 py-3'>
								Deadline
							</th>
							<th scope='col' className='px-6 py-3'>
								Status
							</th>
							<th scope='col' className='px-6 py-3'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task, idx) => (
							<tr
								key={task?.id}
								className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
							>
								<th
									scope='row'
									className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
								>
									{idx + 1}
								</th>
								<td className='px-6 py-4'>{task?.title}</td>
								<th scope='row' className='text-gray-900 whitespace-nowrap dark:text-white'>
									<div className='flex items-center h-100'>
										<Image
											placeholder='blur'
											blurDataURL='./../assets/icons/UserIcon.tsx'
											src={task?.avatar}
											alt={task?.assigned}
											className='rounded-full'
											width={25}
											height={25}
										/>
										<div className='pl-3 pr-5'>
											<div className='text-base font-semibold'>{task?.assigned}</div>
										</div>
									</div>
								</th>
								<td className='px-6 py-4'>{task?.description}</td>
								<td className='px-6 py-4'>{new Date(task.deadline).toLocaleDateString()}</td>
								<td className='px-6 py-4'>
									<div className='flex items-center'>
										<div
											className={classnames("h-2.5 w-2.5 rounded-full  mr-2", {
												"bg-green-500": task?.isCompleted,
												"bg-red-500": !task?.isCompleted,
											})}
										/>
										{task.isCompleted ? (
											<span className='whitespace-nowrap'>Completed</span>
										) : (
											<span className='whitespace-nowrap'>In process</span>
										)}
									</div>
								</td>
								<td className='px-6 py-4 '>
									<button
										onClick={() => onEditeTask(task?.id)}
										className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
									>
										Edit
									</button>
									<button
										onClick={() => onDeleteTask(task?.id)}
										className='mt-4 font-medium text-red-600 dark:text-red-500 hover:underline'
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default TaskTable
