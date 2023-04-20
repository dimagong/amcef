import React from "react"
import { dehydrate, QueryClient } from "@tanstack/react-query"

import Head from "next/head"

import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"

import { getTasksApi } from "../api/services"

import TaskList from "./../components/TaskList"

import { TaskPropsType } from "@/types"
import { TaskProvider } from "@/hooks"

const inter = Inter({ subsets: ["latin"] })

export type HomeProps = {
	tasks: TaskPropsType[]
}

const HomePage = () => {
	return (
		<React.Profiler id='Home-page' onRender={() => console.log("Home page")}>
			<Head>
				<title>Tasks list</title>
				<meta name='description' content='Tasks list' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<TaskProvider>
					<TaskList />
				</TaskProvider>
			</main>
		</React.Profiler>
	)
}

export default HomePage

export async function getServerSideProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ["tasks"],
		queryFn: async () => {
			const { data } = await getTasksApi()
			return data
		},
	})

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}
