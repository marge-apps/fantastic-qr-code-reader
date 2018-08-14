import React from 'react';
import {TouchableOpacity} from 'react-native';
import {compose, withStateHandlers} from 'recompose';
import Icon from 'react-native-vector-icons/Ionicons';
import {RNCamera} from 'react-native-camera';
import {withResultPageHandlers} from '../enhancers';
import styles from '../styles'

const flashModeOrder = {
  off: 'torch',
  torch: 'off',
};

const CameraPage = props => (
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
