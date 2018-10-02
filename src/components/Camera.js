import React from 'react';
import {TouchableOpacity, View, Text, Linking, AppState} from 'react-native';
import {compose, withStateHandlers} from 'recompose';
import AndroidOpenSettings from 'react-native-android-open-settings'
import Icon from 'react-native-vector-icons/Ionicons';
import {RNCamera} from 'react-native-camera';
import {purple} from '../styles';
import MenuDrawer from './MenuDrawer';
import {withResultPageHandlers} from '../enhancers';

const flashModeOrder = {
	off: 'torch',
	torch: 'off'
};

const NotAuthorizedView = () => (
	<View style={{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}}>
		<View style={{paddingBottom: 20}}>
			<Icon
				name="md-camera"
				type="entypo"
				size={36}
			/>
		</View>
		<Text style={{textAlign: 'center'}}>
			In order to scan QR codes we need to access your camera.
		</Text>
		<Text style={{color: purple}} onPress={AndroidOpenSettings.appDetailsSettings}>
			Go to Application settings
		</Text>
	</View>
)

const CameraPage = props => (
	<MenuDrawer
		{...props}
		title="Scan"
		activeItem="scan">
	<RNCamera
		onBarCodeRead={props.handleBarcodeRead}
		flashMode={props.flash}
		notAuthorizedView={<NotAuthorizedView {...props}/>}
		style={{
			flex: 1,
		}}>
		<TouchableOpacity
			style={{
				padding: 50,
				marginTop: 'auto',
				alignSelf: 'flex-end'
			}}
			onPress={props.toggleFlash}>
			<Icon name="md-flash" style={{
				color: 'white',
				fontSize: 35
			}} />
		</TouchableOpacity>
	</RNCamera>
	</MenuDrawer>
);

const withCameraHandlers = withStateHandlers(
	() => ({
		barcodeResult: '' ,
		flash: 'off',
		appState: AppState.currentState
	}),
	{
		refresh: () => () => ({}),
		setBarcodeResult: () => value => ({barcodeResult: value}),
		toggleFlash: ({flash}) => () => ({flash: flashModeOrder[flash]})
	}
);

export default compose(
	withCameraHandlers,
	withResultPageHandlers
)(CameraPage)
