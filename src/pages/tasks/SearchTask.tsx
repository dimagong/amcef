import React from "react"

const SearchTask = ({ onSearch }: any) => {
	return (
		<div className='block relative w-52'>
			<button className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<svg
					aria-hidden='true'
					className='w-4 h-4 text-gray-500 dark:text-gray-400'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
					></path>
				</svg>
			</button>
			<input
				onChange={onSearch}
				type='search'
				id='default-search'
				className='block w-fit px-2 py-1 pl-10 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				placeholder='Search...'
				required
			/>
		</div>
	)
}

export default SearchTask
