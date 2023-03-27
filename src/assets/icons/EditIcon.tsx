import * as React from "react"

export const EditIcon = ({ onEdit }: any) => {
	return (
		<button
			onClick={onEdit}
			className='bg-orange-100  text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
		>
			<svg
				className='h-6 w-6 text-red-500'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='2'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				{" "}
				<path stroke='none' d='M0 0h24v24H0z' />{" "}
				<path d='M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4' />{" "}
				<line x1='13.5' y1='6.5' x2='17.5' y2='10.5' />
			</svg>
		</button>
	)
}
