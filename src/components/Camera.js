import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {compose, withStateHandlers} from 'recompose';
import Icon from 'react-native-vector-icons/Ionicons';
import {RNCamera} from 'react-native-camera';
import MenuDrawer from './MenuDrawer'
import {withResultPageHandlers} from '../enhancers';
import styles from '../styles'

const flashModeOrder = {
	off: 'torch',
	torch: 'off'
};

const CameraPage = props => (
	<MenuDrawer
		{...props}
		title="Camera"
		activeItem="camera">
	<RNCamera
		onBarCodeRead={props.handleBarcodeRead}
		flashMode={props.flash}
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
		flash: 'off'
	}),
	{
		setBarcodeResult: () => value => ({barcodeResult: value}),
		toggleFlash: ({flash}) => () => ({flash: flashModeOrder[flash]})
	}
);

export default compose(
	withCameraHandlers,
	withResultPageHandlers
)(CameraPage)
