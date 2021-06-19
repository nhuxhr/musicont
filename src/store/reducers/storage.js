import { storage as storageState } from '../states';
import { DISPATCHES } from '../../constants';

const storage = (state = storageState, { type, payload }) => {
	switch (type) {
		case DISPATCHES.STORAGE:
			const config = {
				favourites: 'current',
				recents: 'current',
				playlists: 'current',
				...payload,
			};

			return {
				...state,
				favourites: config?.favourites === 'current' ? state?.favourites : payload?.favourites,
				recents: config?.recents === 'current' ? state?.recents : payload?.recents,
				playlists: config?.playlists === 'current' ? state?.playlists : payload?.playlists,
			};

		default:
			return state;
	}
};

export default storage;
