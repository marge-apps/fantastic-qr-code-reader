import React from 'react';
import {
	Dimensions,
	StatusBar,
	LayoutAnimation,
	StyleSheet,
	Text,
	Button,
	TouchableOpacity,
	View
} from 'react-native';
import {
	compose,
	withLifecycle,
	withStateHandlers,
	withProps,
	lifecycle
} from 'recompose';
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
	</RNCamera>
);

const withFlashHandler = lifecycle({
	componentWillMount() {
		this.props.navigation.setParams({
			toggleFlash: this.props.toggleFlash
		})
	}
})

const stateOfCamera = withStateHandlers(
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
	stateOfCamera,
	withResultPageHandlers,
	withFlashHandler
)(CameraPage)
