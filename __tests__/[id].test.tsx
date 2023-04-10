import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import TaskCard from "../src/pages/tasks/[id]"
import { initialTask } from "./../src/pages/tasks/[id]"
import { useRouter } from "next/router"

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}))

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

describe("ID task page", () => {
	it("should display number of tasks", () => {
		mockUseRouter.mockReturnValue({ isFallback: false } as any)
		render(<TaskCard task={initialTask} hasError={false} />)
		const numberTasks = screen.getByRole("number-of-tasks")
		expect(numberTasks).toBeInTheDocument()
		expect(numberTasks).toHaveTextContent("The task N 0")
	})
	it("should display loading ", () => {
		mockUseRouter.mockReturnValue({ isFallback: true } as any)
		render(<TaskCard task={initialTask} hasError={false} />)
		const loadingElem = screen.getByText("Loading...")
		expect(loadingElem).toBeInTheDocument()
	})
	it("handles onchange", async () => {
		mockUseRouter.mockReturnValue({ isFallback: false } as any)
		render(<TaskCard task={initialTask} hasError={false} />)
		const inputElementTitle = screen.getByRole("input-task-title")
		fireEvent.change(inputElementTitle, { target: { value: "title", name: "title" } })
		expect((inputElementTitle as HTMLInputElement).value).toBe("title")
	})
})
