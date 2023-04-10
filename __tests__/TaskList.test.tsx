import React from "react"
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { rest } from "msw"
import { setupServer } from "msw/node"
import TaskList from "./../src/components/TaskList"
import { useRouter } from "next/router"

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}))

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

// export const createTaskApi = (data: Partial<TaskPropsType>)  => {
//     return serviceApi.post("/tasks", data)
// }

// export const  getTasksApi = () => {
//     return serviceApi.get("/tasks")
// }
const server = setupServer(
	rest.get("https://640314fd302b5d671c467d24.mockapi.io/api/pages", (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json([
				{
					id: 1,
					title: "Title 01",
					description: "Description 01",
					deadline: `1-01-2024`,
					isCompleted: false,
					avatar: "",
					assigned: "No assigned",
				},
				{
					id: 2,
					title: "Title 02",
					description: "Description 02",
					deadline: `1-01-2024`,
					isCompleted: false,
					avatar: "",
					assigned: "No assigned",
				},
			])
		)
	})
)

const InitialTasks = [
	{
		id: 0,
		title: "Title 0",
		description: "Description 0",
		deadline: `1-01-2024`,
		isCompleted: false,
		avatar: "",
		assigned: "No assigned",
	},
]

beforeAll(() => server.listen())
afterEach(() => server.restoreHandlers())
afterAll(() => server.close())

describe("TaskList", () => {
	it("edit task, redirect to card task", () => {
		const pushMock = jest.fn()
		mockUseRouter.mockReturnValue({ push: pushMock } as any)
		render(<TaskList tasks={InitialTasks} />)
		const editButton = screen.getByText("Edit")
		expect(editButton).toBeInTheDocument()
		fireEvent.click(editButton)
		expect(pushMock).toHaveBeenCalled()
	})
	it("create task, open modal pop-up", async () => {
		// screen.debug()
		// screen.getByRole("")
		const user = userEvent.setup()
		const handleSubmit = jest.fn()
		//open modal pop-up
		render(<TaskList tasks={InitialTasks} />)
		//buttonCreateTask
		const createTaskButton = screen.getByRole("buttonCreateTask")
		//const createTaskButton = screen.getByText("Create task")
		expect(createTaskButton).toBeInTheDocument()
		fireEvent.click(createTaskButton)
		expect(screen.getByText("Create new task")).toBeInTheDocument()

		//fill fields
		const inputElementCreateTitle = screen.getByPlaceholderText("title")
		await user.type(inputElementCreateTitle, "Title 01")
		//fireEvent.change(inputElementCreateTitle, { target: { value: "Title 01" } })
		expect(inputElementCreateTitle).toHaveValue("Title 01")

		const inputElementCreateDecription = screen.getByPlaceholderText("description")
		await user.type(inputElementCreateDecription, "Description 01")
		//fireEvent.change(inputElementCreateDecription, { target: { value: "Description 01" } })
		expect(inputElementCreateDecription).toHaveValue("Description 01")

		const inputElementCreateDeadline = screen.getByPlaceholderText("deadline")
		await user.type(inputElementCreateDeadline, "04.11.2023")
		//fireEvent.change(inputElementCreateDeadline, { target: { value: "04.11.2023" } })
		expect(inputElementCreateDeadline).toHaveValue("04.11.2023")

		//click on 'crate task' button
		const buttonCreateTask = screen.getByText("Create")
		expect(buttonCreateTask).toBeInTheDocument()
		await user.click(buttonCreateTask)
		//fireEvent.click(buttonCreateTask)
		//fireEvent.submit(buttonCreateTask)

		await waitFor(() => expect(handleSubmit).toHaveBeenCalled())

		// waitFor(() => upDataSumbit)
		// expect(upDataSumbit).toHaveBeenCalled()

		expect(screen.queryByText("Create new task")).not.toBeInTheDocument()
		server.use(
			rest.get("/tasks", (req, res, ctx) => {
				return res(
					ctx.status(200),
					ctx.json([
						{
							id: 111,
							title: "Title 111",
							description: "Description 111",
							deadline: `1-01-2024`,
							isCompleted: false,
							avatar: "",
							assigned: "No assigned",
						},
						{
							id: 2,
							title: "Title 02",
							description: "Description 02",
							deadline: `1-01-2024`,
							isCompleted: false,
							avatar: "",
							assigned: "No assigned",
						},
					])
				)
			})
		)
		waitFor(() => expect(screen.getByText("Title 111")).toBeInTheDocument())
		//expect(buttonCreateTask).toBeInTheDocument()

		//
		// const createTaskButtonModal = screen.getByText("Create")
		// expect(createTaskButtonModal).toBeInTheDocument()
		//form-role
		// const formElem = screen.getByRole("form-role")
		// expect(formElem).toBeInTheDocument()
	})
})
