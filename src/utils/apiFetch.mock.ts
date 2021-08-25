import { ContentResponse, Endpoints } from "./types";
import reciprocity from "../img/reciprocity.png";
import cityautobahn from "../img/cityautobahn.png";
import acc from "../img/accredited-accommodations.png";

export const apiFetch = async <
	Request extends unknown,
	Response extends unknown
	>( endpoint: Endpoints, _data?: Request ):Promise<Response> => {

	switch (endpoint ) {
		case "pdf":
			return Promise.resolve(process.env.REACT_APP_API_URL! + "/resume.pdf" as Response);
		case "contact":
			return Promise.resolve(true as any as Response);
		case "content":
			return Promise.resolve(await fetchMockContent() as Response);
	}
	return Promise.reject("");
}

const fetchMockContent = async ():Promise<ContentResponse> => {
	const fetchResponse = await fetch(process.env.REACT_APP_API_URL! + "/content.json", {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': "*",
		},
	});
	const json = await fetchResponse.json() as ContentResponse;

	json.portfolio.delivered.forEach(( { imgUrl }, index) => {
		switch (imgUrl ) {
			case "reciprocity":
				json.portfolio.delivered[index].imgUrl = reciprocity;
				break;
			case "cityautobahn":
				json.portfolio.delivered[index].imgUrl = cityautobahn;
				break;
			case "acc":
				json.portfolio.delivered[index].imgUrl = acc;
				break;
		}
	})

	return json;
}
