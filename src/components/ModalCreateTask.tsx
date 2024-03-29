import React from "react"
import { useFormik } from "formik"
import { createTaskApi, getTasksApi } from "@/api/services"
import * as Yup from "yup"
import moment from "moment"
import { TaskActionTypes } from "@/types"
import { useContextState } from "@/hooks/useContextState"

const validationSchema = Yup.object({
	title: Yup.string().required("please enter a title").trim().min(1).max(10),
	description: Yup.string().required("please enter a description").trim().min(1).max(20),
	deadline: Yup.date()
		.typeError("please enter a valid date MM/DD/YYYY")
		.required()
		.min(moment().subtract(1, "day"), "The date is too early")
		.max(moment().add(1, "month"), "The date is too late. Not later than one month"),
	assigned: Yup.string().required("please enter a name").trim().min(1).max(20),
})

export const ModalCreateTask = () => {
	const { dispatch, state } = useContextState()
	const open = state.isOpen

	const onCloseModal = () => {
		dispatch({ type: TaskActionTypes.OPEN_FORM_TASK, payload: false })
	}

	const onUpdateListTasks = async () => {
		const res = await getTasksApi()
		const tasks = res.data
		dispatch({ type: TaskActionTypes.CREATE_TASK, payload: tasks })
	}

	const upDataSumbit = async (data: any) => {
		await createTaskApi(data)
		await onUpdateListTasks()
	}

	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			deadline: "",
			assigned: "",
		},
		validationSchema,
		onSubmit: (values) => {
			const data = {
				...values,
				isCompleted: false,
			}

			upDataSumbit(data)
		},
	})

	if (open) {
		return (
			<div>
				<div
					id='authentication-modal'
					// tabIndex={-1}
					aria-hidden='true'
					className='fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full'
				>
					<div className='relative w-full h-full max-w-md md:h-auto'>
						<div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
							<button
								onClick={onCloseModal}
								type='button'
								className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
								data-modal-hide='authentication-modal'
							>
								<svg
									aria-hidden='true'
									className='w-5 h-5'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fill-rule='evenodd'
										d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
										clip-rule='evenodd'
									></path>
								</svg>
								<span className='sr-only'>Close modal</span>
							</button>
							<div className='px-6 py-6 lg:px-8'>
								<h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>
									Create new task
								</h3>

								<form role='form-role' className='space-y-6' onSubmit={formik.handleSubmit}>
									<div>
										<label
											htmlFor='title'
											className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
										>
											Title
										</label>
										<input
											role='create-new-title'
											onChange={formik.handleChange}
											value={formik.values.title}
											type='text'
											name='title'
											id='title'
											className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
											placeholder='...enter title'
											required
										/>
										{formik.errors.title ? (
											<div style={{ color: `red` }}>{formik.errors.title}</div>
										) : null}
									</div>
									<div>
										<label
											htmlFor='description'
											className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
										>
											Task description
										</label>
										<input
											onChange={formik.handleChange}
											value={formik.values.description}
											type='text'
											name='description'
											id='description'
											placeholder='...enter description'
											className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
											required
										/>
										{formik.errors.description ? (
											<div style={{ color: ` red` }}>{formik.errors.description}</div>
										) : null}
									</div>
									<div>
										<label
											htmlFor='deadline'
											className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
										>
											Deadline
										</label>
										<input
											onChange={formik.handleChange}
											value={formik.values.deadline}
											type='text'
											name='deadline'
											id='deadline'
											placeholder='...enter date in format MM/DD/YYYY'
											className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
											required
										/>
										{formik.errors.deadline ? (
											<div style={{ color: ` red` }}>{formik.errors.deadline}</div>
										) : null}
									</div>
									<div>
										<label
											htmlFor='assigned'
											className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
										>
											Assigned
										</label>
										<input
											onChange={formik.handleChange}
											value={formik.values.assigned}
											type='text'
											name='assigned'
											id='assigned'
											placeholder='...enter name'
											className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
											required
										/>
										{formik.errors.deadline ? (
											<div style={{ color: ` red` }}>{formik.errors.deadline}</div>
										) : null}
									</div>

									<button
										id='submit-pw-change'
										disabled={
											!!formik.errors.title ||
											!!formik.errors.description ||
											!!formik.errors.deadline
										}
										type='submit'
										className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
									>
										Create
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return null
	}
}
