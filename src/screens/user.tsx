import React, { useCallback } from 'react'
import { SectionList } from 'react-native'
import { ActivityIndicator, List, Text } from 'react-native-paper'

import useUser from '../hooks/use-user'
import styles from '../styles'

const UserScreen: React.FC = () => {
	const user = useUser()

	const keyExtractor = useCallback((item) => `${item}`, [])

	const renderSectionHeader = useCallback(
		({ section }) => <List.Subheader>{section.title}</List.Subheader>,
		[],
	)

	const renderItem = useCallback(({ item }) => <List.Item title={item} />, [])

	const renderItemAndIcon = useCallback(
		({ item }) => (
			<List.Item
				left={(props) => <List.Icon {...props} icon='menu-right' />}
				title={item}
			/>
		),
		[],
	)

	const sections = user.value?.username
		? [
				{ data: [user.value.username], title: 'Username' },
				{
					data: user.value.scores,
					title: 'Scores',
					renderItem: renderItemAndIcon,
				},
		  ]
		: []

	return (
		<SectionList<string | number, { title: string }>
			ListEmptyComponent={
				user.loading ? (
					<ActivityIndicator />
				) : (
					<Text>You haven&#39;t played yet</Text>
				)
			}
			contentContainerStyle={styles.container}
			sections={sections}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
			renderSectionHeader={renderSectionHeader}
		/>
	)
}

export default UserScreen
