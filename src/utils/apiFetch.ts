import { endpoints, Endpoints } from "./types";

const clientId = process.env.REACT_APP_CLIENT_ID || "";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost/";

interface FetchResponseSuccess<T extends unknown> {
	success: true;
	data: T;
	error: undefined;
}

interface FetchResponseFailure {
	success: false;
	data: undefined;
	error: string;
}

export const apiFetch = async <
	Request extends unknown,
	Response extends unknown
	>( endpoint: Endpoints, data?: Request ):Promise<Response> => {
	try {
		const body = new URLSearchParams({
			client_id: clientId,
			data: JSON.stringify(data),
		}).toString();

		const response = await fetch(apiUrl + endpoints[endpoint], {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Access-Control-Allow-Origin': '*',
			},
			body: body,
		});

		const json = (await response.json()) as FetchResponseSuccess<Response> | FetchResponseFailure;
		return json.success ? Promise.resolve(json.data) : Promise.reject(json.error);
	} catch ( e ) {
		console.log(e)
		return Promise.reject("Connection Error");
	}
}
