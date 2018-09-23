import {withProps} from 'recompose';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default withProps(props => ({
	niceDate: timestamp => {
		const date = new Date(Number(timestamp));
		return (`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`);
	}
}));
