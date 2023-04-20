import { useEffect, useState } from "react"

export const useDebounce = (value: any, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState<any>(value)

	useEffect(() => {
		if (value) {
			const handler = setTimeout(() => {
				setDebouncedValue(value)
			}, delay)

			return () => {
				clearTimeout(handler)
			}
		}
	}, [value])

	return debouncedValue
}
