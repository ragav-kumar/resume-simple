import React, { useContext } from 'react'
import { BulletList, ContentWrap } from './pageStyles';
import { DbContext } from "../utils/db";

export const Profile = () => {
	const { profile } = useContext(DbContext);

	return (
		<ContentWrap>
			<BulletList items={profile} />
		</ContentWrap>
	);
}