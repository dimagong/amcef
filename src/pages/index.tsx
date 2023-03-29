import Head from "next/head"
import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import { getTasksApi } from "../api/services"
import { TaskPropsType } from "./tasks/TaskCard"
import TaskList from "./../components/TaskList"
import React from "react"

const inter = Inter({ subsets: ["latin"] })

export type HomeProps = {
	tasks: TaskPropsType[]
}

const HomePage = ({ tasks }: HomeProps) => {
	return (
		<React.Profiler id='Home-page' onRender={() => console.log("Home page")}>
			<Head>
				<title>Tasks list</title>
				<meta name='description' content='Tasks list' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<TaskList tasks={tasks} />
			</main>
		</React.Profiler>
	)
}

export default HomePage

export async function getServerSideProps() {
	const res = await getTasksApi()
	const tasks = res.data
	return {
		props: {
			tasks,
		},
	}
}

// export async function getStaticProps() {
// 	const res = await getTasksApi()
// 	const tasks = res.data
// 	return {
// 		props: {
// 			tasks,
// 		},
// 	}
// }
