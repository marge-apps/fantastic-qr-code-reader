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
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				props.history.push('/');
			}
		} catch (err) {
			console.warn(err)
		}
	},
	goToResult: item => {
		if (item.text !== '') {
			props.history.push({pathname: `/result`, state: item})
		}
	}
}))
