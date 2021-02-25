import React, { useCallback } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { ActivityIndicator, List, Text } from 'react-native-paper'

import useRanking from '../hooks/use-ranking'
import styles from '../styles'
import RankingEntry from '../typings/ranking-entry'

const INDEX_ICON_LIST = ['podium-gold', 'podium-silver', 'podium-bronze']

const RankingScreen: React.FC = () => {
	const ranking = useRanking()

	const keyExtractor = useCallback((item: RankingEntry) => item.username, [])

	const renderHiscoreItem = useCallback(
		({ index, item }: { index: number; item: RankingEntry }) => {
			const icon = INDEX_ICON_LIST[index]
			return (
				<List.Item
					left={(props) => <List.Icon {...props} icon={icon} />}
					title={item.hiscore}
					description={item.username}
				/>
			)
		},
		[],
	)

	return (
		<FlatList<RankingEntry>
			ListHeaderComponent={<List.Subheader>Ranking</List.Subheader>}
			ListEmptyComponent={
				ranking.loading ? <ActivityIndicator /> : <Text>No entries yet</Text>
			}
			contentContainerStyle={styles.container}
			data={ranking.value ?? []}
			keyExtractor={keyExtractor}
			renderItem={renderHiscoreItem}
		/>
	)
}

export default RankingScreen
