import {compose, withStateHandlers, withProps, lifecycle} from 'recompose';

export default withStateHandlers(
	() => ({
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
