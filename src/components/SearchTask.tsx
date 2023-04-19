import React from "react"

const SearchTask = ({ onSearch }: any) => {
	return (
		<div className='block relative w-52'>
			<button className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<svg
					aria-hidden='true'
					className='w-4 h-4 '
					//text-gray-500 dark:text-gray-400
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
				className='block w-fit px-2 py-1 pl-10 text-sm text-gray-900 border  border-gray-400  bg-gray-50 rounded'
				placeholder='Search...'
				required
			/>
		</div>
	)
}

export default SearchTask
