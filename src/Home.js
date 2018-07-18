import React from 'react';
import {
	Alert,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	ToastAndroid,
	TouchableHighlight,
	TouchableOpacity,
	View
} from 'react-native';
import {compose, withStateHandlers, withProps, lifecycle} from 'recompose';
import ActionButton from 'react-native-action-button';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from 'react-navigation';
import {withCameraPermissionsAndResultNavigator, withStorageHandlers} from './enhancers'
import {Camera, Result, QrList} from './components'
import styles, {purple, gray, statusColor} from './styles'

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

const enhanceWithStateHandlers = withStateHandlers(
	props => ({
		cameraPermission: false,
		barcodeResult: '',
		isModalVisible: false,
		isLoading: false,
		list: []
	}),
	{
		resetState: () => ({
			cameraPermission: false,
			barcodeResult: '',
			isModalVisible: false
		}),
		toggleModal: ({isModalVisible}) => () =>  ({isModalVisible: !isModalVisible}),
		setLoading: () => value => ({isLoading: value}),
		setBarcodeResult: () => value => ({barcodeResult: value}),
		setCameraPermission: () => value => ({cameraPermission: value}),
		setList: () => list => ({list}),
		handleDeleteItem: ({list}, props) => key => {
			try {
				props.deleteItem(key)
				return {
					list: [...list.filter(l => l.key !== key)]
				}
			} catch (error) {
				console.log(error)
			}
		}
	}
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
	enhanceWithStateHandlers,
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
