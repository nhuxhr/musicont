import { app as appState } from '../states';

const app = (state = appState, { type = null, payload = null }) => {
	switch (type) {
		default:
			return state;
	}
};

export default app;
