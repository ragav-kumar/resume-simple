import content from './content.json'
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
			return Promise.reject("Not Implemented");
		case "contact":
			return Promise.resolve(true as any as Response);
		case "content":
			return Promise.resolve(filterImages(content) as Response);
	}
	return Promise.reject("");
}

const filterImages = (content:any):ContentResponse => {
	const response = content as ContentResponse;
	response.portfolio.delivered.forEach(( { imgUrl }, index) => {
		switch (imgUrl ) {
			case "reciprocity":
				response.portfolio.delivered[index].imgUrl = reciprocity;
				break;
			case "cityautobahn":
				response.portfolio.delivered[index].imgUrl = cityautobahn;
				break;
			case "acc":
				response.portfolio.delivered[index].imgUrl = acc;
				break;
		}
	})

	return response;
}
