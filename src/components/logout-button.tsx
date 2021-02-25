import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLinkProps } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { IconButton } from 'react-native-paper'

import useUser from '../hooks/use-user'
import { USER_KEY } from '../keys'
import { HOME_ROUTE } from '../routes'

const LogoutButton: React.FC<{ tintColor?: string }> = ({ tintColor }) => {
	const { onPress: homeLinkOnPress, ...homeLinkProps } = useLinkProps({
		to: HOME_ROUTE,
	})

	const user = useUser()

	const handleOnLogoutPress = useCallback(async () => {
		await AsyncStorage.removeItem(USER_KEY)

		homeLinkOnPress()
	}, [homeLinkOnPress])

	return (
		<IconButton
			{...homeLinkProps}
			color={tintColor}
			disabled={!user.value?.username}
			icon='logout'
			onPress={handleOnLogoutPress}
		/>
	)
}

export default LogoutButton
