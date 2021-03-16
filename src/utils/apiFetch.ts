import { endpoints, Endpoints } from "./types";
import * as process from "process";

const clientId = process.env.CLIENT_ID || "";
const apiUrl = process.env.API_URL || "http://localhost/";

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
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
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