import {withStateHandlers} from 'recompose';

export default withStateHandlers(
	() => ({
		cameraPermission: false,
		barcodeResult: '',
		isModalVisible: false,
		isLoading: false
	}),
	{
		resetState: () => ({
			cameraPermission: false,
			barcodeResult: '',
			isModalVisible: false
		}),
		toggleModal: ({isModalVisible}) => () =>  ({isModalVisible: !isModalVisible}),
		setLoading: () => value => ({isLoading: value}),
		setBarcodeResult: () => value => ({barcodeResult: value})
	}
);
