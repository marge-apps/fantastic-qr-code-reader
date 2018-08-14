import React from 'react';
import {
	StatusBar,
	View
} from 'react-native';
import {compose, withStateHandlers, withProps, lifecycle} from 'recompose';
import ActionButton from 'react-native-action-button';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from 'react-navigation';
import {withHomePageStateHandlers, withCameraPermissionsAndResultNavigator, withStorageHandlers} from './enhancers'
import {Camera, Result, QrList} from './components'
import styles, {purple, statusColor} from './styles'

const App = props => (
	<View style={styles.container}>
		<QrList
			{...props}
		/>
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

const StackNavigator = createStackNavigator({
	Home: {
		screen: EnhancedApp,
		navigationOptions: {
			title: 'History',
			headerTitleStyle: {
				width: '100%'
			},
		}
	},
	Camera: {
		screen: Camera,
		navigationOptions: props => ({
			title: 'Camera',
			headerRight: (
				<TouchableOpacity
					style={{paddingRight: 16}}
					onPress={props.navigation.state.params.toggleFlash}>
					<IonIcon name="md-flash" style={styles.actionButtonIcon} />
				</TouchableOpacity>
			)
		})
	},
	Result: {
		screen: Result,
		title: 'View'
	},
},
{
	navigationOptions: {
		title: 'Camera',
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
});

export default () => (
	<View style={{flex: 1}}>
		<StatusBar backgroundColor={statusColor} barStyle="light-content"/>
		<StackNavigator />
	</View>
);
