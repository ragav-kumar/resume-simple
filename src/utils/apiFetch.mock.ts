import content from './content.json'
import { ContentResponse, Endpoints } from "./types";

export const apiFetch = async <
	Request extends unknown,
	Response extends unknown
	>( endpoint: Endpoints, _data?: Request ) => {
	switch (endpoint ) {
		case "pdf":
			return Promise.reject("Not Implemented");
		case "contact":
			return Promise.reject("Not Implemented");
		case "content":
			return Promise.resolve(content as ContentResponse);
	}
	return Promise.reject("");
}