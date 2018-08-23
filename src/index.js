import React from 'react';
import {
	StatusBar,
	TouchableOpacity,
	View,
	Text
} from 'react-native';
import {compose, withStateHandlers, withProps, lifecycle} from 'recompose';
import ActionButton from 'react-native-action-button';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {DrawerActions, createStackNavigator, createDrawerNavigator} from 'react-navigation';
import {withHomePageStateHandlers, withCameraPermissionsAndResultNavigator, withStorageHandlers} from './enhancers'
import {Camera, Result, QrList} from './components'
import styles, {purple, statusColor} from './styles'

const App = props => (
	<View style={styles.container}>
		<QrList {...props}/>
		<ActionButton
			buttonColor={purple}
			title="Scan"
			renderIcon={() => <IonIcon name="md-camera" style={styles.actionButtonIcon} />}
			onPress={props.askCameraPermission}
		/>
	</View>
);

const initializeList = lifecycle({
	async componentDidMount() {
		this.props.setLoading(true)
		const history = await this.props.getHistory()
		this.props.setList(history)
		this.props.setLoading(false)
	}
})

const withUpdateHistory = withProps(props => ({
	updateHistory: async () => props.setList(await props.getHistory())
}))

const EnhancedApp = compose(
	withStorageHandlers,
	withHomePageStateHandlers,
	withUpdateHistory,
	initializeList,
	withCameraPermissionsAndResultNavigator
)(App);

// const AppWithHeader = {
// 	Home: {
// 		screen: createStackNavigator({screen:})
// 	}
// }
const routes = {
	Home: {
		screen: createDrawerNavigator({
			Home: {
				screen: EnhancedApp
			}
		}, {
			navigationOptions: {
				title: 'Home',
				drawerLabel: 'Home',
				headerTitleStyle: purple,
				headerTintColor: purple
			}
		}),
		navigationOptions: props => ({
			title: 'Fantastic Qr Code Reader',
			headerLeft:
			<TouchableOpacity onPress={() => {props.navigation.dispatch(DrawerActions.toggleDrawer())} }>
				<IonIcon name="md-menu" style={styles.menuButton}/>
			</TouchableOpacity>,
			headerTitleStyle: {
				width: '100%'
			},
		})
	},
	Camera: {
		screen: Camera,
		navigationOptions: {
			title: 'Camera'
		}
	},
	Result: {
		screen: Result,
		navigationOptions: {
			title: 'View'
		}
	}
};

const StackNavigator = createStackNavigator(
	routes, {
		navigationOptions: {
			headerStyle: {
				backgroundColor: purple,
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
			headerTitleStyle: {
				width: '100%'
			}
		}
	}
);

export default () => (
	<View style={{flex: 1}}>
		<StatusBar backgroundColor={statusColor} barStyle="light-content"/>
		<StackNavigator />
	</View>
);
