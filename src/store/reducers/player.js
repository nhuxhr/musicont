import { player as playerState } from '../states';
import { DISPATCHES } from '../../constants';

const player = (state = playerState, { type = null, payload = {} }) => {
	switch (type) {
		case DISPATCHES.SET_CURRENT_SONG:
			const config = {
				playback: 'current',
				soundObj: 'current',
				detail: 'current',
				playbackStatus: 'current',
				...payload,
			};

			return {
				...state,
				currentSong: {
					playback: config?.playback === 'current' ? state?.currentSong?.playback : payload?.playback,
					soundObj: config?.soundObj === 'current' ? state?.currentSong?.soundObj : payload?.soundObj,
					detail: config?.detail === 'current' ? state?.currentSong?.detail : payload?.detail,
					playbackStatus: config?.playbackStatus === 'current' ? state?.currentSong?.playbackStatus : payload?.playbackStatus,
				},
			};

		default:
			return state;
	}
};

export default player;
