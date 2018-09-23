import React from 'react';
import {StatusBar, View, Text} from 'react-native';
import {NativeRouter, Route, BackButton} from 'react-router-native';
import {compose} from 'recompose';
import {withHomePageStateHandlers, withStorageHandlers, withNiceDate} from './enhancers'
import {About, Camera, Result, QrList} from './components'
import {statusColor} from './styles'

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
			<Route exact path="/about" render={routerProps => <About {...routerProps} {...props}/>}/>
			<Route exact path="/result" render={routerProps => <Result {...routerProps} {...props}/>}/>
		</View>
	</BackButton>
</NativeRouter>
));
