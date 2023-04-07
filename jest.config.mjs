import nextJest from "next/jest.js"

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
	// Add more setup options before each test is run
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		"^@/api/(.*)$": "<rootDir>/src/api/services",
		"^@/components/(.*)$": "<rootDir>/components/$1",
		// '^@/pages/(.*)$': '<rootDir>/pages/$1',
		// '^@/ui/(.*)$': '<rootDir>/ui/$1',
		// '^@/api/(.*)$': '<rootDir>/api/$1',
		// '^@/components/(.*)$': '<rootDir>/components/$1',
		// '^@/context/(.*)$': '<rootDir>/context/$1',
		// '^@/styles/(.*)$': '<rootDir>/styles/$1',
		// '^@/lib/(.*)$': '<rootDir>/lib/$1',
		// '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
		// '^@/utils/(.*)$': '<rootDir>/utils/$1',
	},
	testEnvironment: "jest-environment-jsdom",
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
