declare global {
	namespace NodeJS {
		interface ProcessEnv {
			CLIENT_ID: string;
			API_URL: string;
		}
	}
}

export {}