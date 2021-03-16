import { createContext } from 'react';
import { ContentResponse, routes } from "./types";
/**
 * Mockup of DB data. Replace with a link to a mySQL DB later.
 */

/**
 * All data for a given section
 */
export type SectionData = {
	menuLabel: string;
	header: string;
	path: string;
};
/**
 * Menu Sections. Defined here cause it's used in multiple places
 */
export const sections: SectionData[] = [
	{
		menuLabel: "Profile",
		header: "Professional Profile",
		path: routes.profile,
	}, {
		menuLabel: "Competencies",
		header: "Professional Competencies",
		path: routes.competency,
	}, {
		menuLabel: "Education",
		header: "Education",
		path: routes.education,
	}, {
		menuLabel: "Experience",
		header: "Employment History",
		path: routes.history,
	},
];

export type DbContextType = ContentResponse;

export const blankContext: DbContextType = {
	profile: [],
	competencies: [],
	education: [],
	experience: [],
}
export const DbContext = createContext<DbContextType>(blankContext);
