import React from 'react';
import { Provider as RRProvider } from 'react-redux';

import store from './src/store';
import Screens from './src/screens';

export default function App() {
	return (
		<RRProvider store={store}>
			<Screens />
		</RRProvider>
	);
}
