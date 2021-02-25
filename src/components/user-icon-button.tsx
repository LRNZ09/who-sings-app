import { useLinkProps } from '@react-navigation/native'
import React from 'react'
import { IconButton } from 'react-native-paper'

import { USER_ROUTE } from '../routes'

const UserIconButton: React.FC<{ tintColor?: string }> = ({ tintColor }) => {
	const userLinkProps = useLinkProps({ to: USER_ROUTE })

	return (
		<IconButton {...userLinkProps} color={tintColor} icon='account-circle' />
	)
}

export default UserIconButton
