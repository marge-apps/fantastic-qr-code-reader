import React from 'react';
import {
	StatusBar,
	TouchableOpacity,
	View,
	Text
} from 'react-native';
import {Switch, NativeRouter, Route, BackButton} from 'react-router-native';
import {compose} from 'recompose';
import {withHomePageStateHandlers, withStorageHandlers, withNiceDate} from './enhancers'
import {About, Camera, Result, QrList} from './components'
import styles, {statusColor} from './styles'

export default compose(
	withStorageHandlers,
	withHomePageStateHandlers,
	withNiceDate
)(props => (
	<NativeRouter>
		<BackButton>
			<View style={{ flex: 1 }}>
				<StatusBar backgroundColor={statusColor} barStyle="light-content" />
			<Route exact path="/" render={routerProps => <Camera {...routerProps} {...props}/>}/>
				<Route exact path="/history" render={routerProps => <QrList {...routerProps} {...props}/>}/>
			<Route exact path="/about" component={About}/>
			<Route exact path="/result" render={routerProps => <Result {...routerProps} {...props}/>}/>
		</View>
	</BackButton>
</NativeRouter>
));
