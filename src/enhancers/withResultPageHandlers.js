import {withProps} from 'recompose';
import {LayoutAnimation} from 'react-native';

const generateId = () => {
	const timestamp = new Date().getTime();
	return timestamp.toString()
}

export default withProps(props => ({
	handleBarcodeRead: async result => {
		if (result.data !== props.barcodeResult) {
				try {
					await props.navigation.state.params.saveItem(generateId(), result.data);
					LayoutAnimation.spring();
					props.setBarcodeResult(result.data);
					props.navigation.replace('Result', {
						onNavigateBack: props.navigation.state.params.updateHistory(),
						result: result.data
					});
				} catch (error) {
					console.log(error)
				}
		}
	},
	copyToClipBoard: async () => {
		await Clipboard.setString(props.barcodeResult)
		ToastAndroid.showWithGravity(
			'Copied to clipboard!',
			ToastAndroid.SHORT,
			ToastAndroid.CENTER
		);
	}
}));
