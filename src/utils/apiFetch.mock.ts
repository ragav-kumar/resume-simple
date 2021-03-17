import content from './content.json'
import { Endpoints } from "./types";

export const apiFetch = async <
	Request extends unknown,
	Response extends unknown
	>( endpoint: Endpoints, _data?: Request ):Promise<Response> => {
	switch (endpoint ) {
		case "pdf":
			return Promise.reject("Not Implemented");
		case "contact":
			return Promise.resolve(true as any as Response);
		case "content":
			return Promise.resolve(content as any as Response);
	}
	return Promise.reject("");
}
