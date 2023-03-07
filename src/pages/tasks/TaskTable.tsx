import { ActiveIcon, CompletedIcon, DeleteIcon } from "@/assets/icons"
import React, { FC } from "react"
import { TaskPropsType } from "./TaskCard"

export type TaskListPropsType = {
	tasks: TaskPropsType[]
	onDeleteTask: (taskId: number) => void
}

export const TaskTable: FC<TaskListPropsType> = ({ tasks = [], onDeleteTask }) => {
	return (
		<div className='mt-9 max-h-screen h-4/6 overflow-y-scroll'>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
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
								Description
							</th>
							<th scope='col' className='px-6 py-3'>
								Deadline
							</th>
							<th scope='col' className='px-6 py-3'>
								Active/Completed Delete
							</th>
							<th scope='col' className='px-6 py-3'>
								Delete
							</th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task, idx) => (
							<tr key={idx} className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
								<th
									scope='row'
									className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
								>
									{idx + 1}
								</th>
								<td className='px-6 py-4'>{task.title}</td>
								<td className='px-6 py-4'>{task.description}</td>
								<td className='px-6 py-4'>{new Date(task.deadline).toLocaleDateString()}</td>
								<td className='px-6 py-4'>
									{task.isCompleted ? <CompletedIcon /> : <ActiveIcon />}
								</td>
								<td className='px-6 py-4'>
									<DeleteIcon onDelete={() => onDeleteTask(task.id || 0)} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
