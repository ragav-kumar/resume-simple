export const endpoints = {
	/** Represents all site content that hails from the DB. Might as well load this in one go */
	content: "content",
	/** For PDF Generation */
	pdf: "pdf",
	/** For Contact form submissions */
	contact: "contact",
} as const;

export type Endpoints = keyof typeof endpoints;

export const routes = {
	profile: "/",
	competency: "/competencies",
	education: "/education",
	contact: "/contact",
	history: "/experience",
	pdf: "/pdf",
} as const;

/**
 * No parameters for the content request.
 * Only reason it's not pre-loaded is because of the fancy loading spinner
 */
export type ContentRequest = undefined;
export interface ContentResponse {
	profile: string[];
	competencies: Competency[];
	education: Education[];
	experience: Experience[];
}

export interface CompetencyItem {
	label: string|null;
	text: string;
}
export interface Competency {
	name: string;
	items: CompetencyItem[];
}

export interface Education {
	title: string;
	location: string;
	start: string;
	end: string|null;
	dateOverride: string|null;
}
export interface Experience {
	title: string;
	employer: string;
	location: string;
	start: string;
	end: string|null;
	dateOverride: string|null;
}
