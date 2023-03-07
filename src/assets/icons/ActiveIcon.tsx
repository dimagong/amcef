import * as React from "react"

export const ActiveIcon = () => {
	return (
		<button className='bg-orange-100  text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className='w-6 h-6'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
				/>
			</svg>
		</button>
	)
}
