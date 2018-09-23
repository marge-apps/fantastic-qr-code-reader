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
				const key = generateId();
				await props.saveItem(key, result.data);
				LayoutAnimation.spring();

				props.history.push({
					pathname: `/result`,
					state: {
						text: result.data,
						key: key
					}
				})
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
