import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import {
	ActivityIndicator,
	Provider as PaperProvider,
} from 'react-native-paper'
import { SWRConfig } from 'swr'

import LogoutButton from '../components/logout-button'
import UserIconButton from '../components/user-icon-button'
import { HOME_ROUTE, RANKING_ROUTE, USER_ROUTE } from '../routes'
import HomeScreen from '../screens/home'
import RankingScreen from '../screens/ranking'
import UserScreen from '../screens/user'
import theme from '../theme'
import defaultFetcher from '../utils/default-fetcher'

const NAVIGATION_LINKING = {
	config: {
		screens: {
			Home: HOME_ROUTE,
			Ranking: RANKING_ROUTE,
			User: USER_ROUTE,
		},
	},
	prefixes: ['whosings://'],
}

const Stack = createStackNavigator()

const App: React.FC = () => {
	return (
		<SWRConfig
			value={{
				fetcher: defaultFetcher,
				revalidateOnFocus: false,
			}}
		>
			<PaperProvider theme={theme}>
				<NavigationContainer
					fallback={<ActivityIndicator />}
					linking={NAVIGATION_LINKING}
				>
					<Stack.Navigator>
						<Stack.Screen
							name='Home'
							component={HomeScreen}
							options={{ headerRight: UserIconButton, title: 'Who Sings?' }}
						/>
						<Stack.Screen name='Ranking' component={RankingScreen} />
						<Stack.Screen
							name='User'
							component={UserScreen}
							options={{ headerRight: LogoutButton }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</PaperProvider>
		</SWRConfig>
	)
}

export default App
