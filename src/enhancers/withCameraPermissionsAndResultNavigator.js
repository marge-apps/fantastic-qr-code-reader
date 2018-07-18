import {withProps} from 'recompose';
import {PermissionsAndroid} from 'react-native'

export default withProps(props => ({
	askCameraPermission: async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.CAMERA,
				{
					'title': 'Allow Fantastic QR Code Reader to take pictures?',
					'message': 'message'
				}
			)
			alert(granted)
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				props.navigation.navigate('Camera', {
					onNavigateBack: props.updateHistory(),
					...props
				});
			}
		} catch (err) {
			console.warn(err)
		}
	},
	goToResult: text => {
		if (text !== '') {
			props.navigation.navigate('Result', {result: text})
		}
	}
}))
