// TODO: Make it better
import { Audio } from 'expo-av';

export const init = async (defaultConfigs = {}) => {
	try {
		const configs = {
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			shouldDuckAndroid: true,
			staysActiveInBackground: true,
			playThroughEarpieceAndroid: false,
			...defaultConfigs,
		};

		await Audio.setAudioModeAsync(configs);
	} catch (error) {
		console.log(`[Audio Error][init]: ${error?.message}`);
	}
};

export const playbackStatusUpdate =
	(playbackObject) =>
	(next = (status) => console.log({ status })) => {
		if ('setOnPlaybackStatusUpdate' in playbackObject) {
			playbackObject.setOnPlaybackStatusUpdate(next);
		}
	};

export const play =
	(playbackObject, uri, shouldPlay = true) =>
	(next = () => {}) =>
	(onPlaybackStatusUpdate = () => {}) => {
		(async () => {
			try {
				const soundObj = await playbackObject?.loadAsync({ uri }, { shouldPlay });
				playbackStatusUpdate(playbackObject)(onPlaybackStatusUpdate);
				next(soundObj);
			} catch (error) {
				console.log(`[Audio Error][play]: ${error?.message}`);
			}
		})();
	};

export const configAndPlay =
	(uri, shouldPlay = true) =>
	(next = () => {}) =>
	(onPlaybackStatusUpdate = () => {}) => {
		(async () => {
			try {
				const playbackObject = new Audio.Sound();
				play(
					playbackObject,
					uri,
					shouldPlay
				)((soundObj) => {
					next(playbackObject, soundObj);
				})(onPlaybackStatusUpdate);
			} catch (error) {
				console.log(`[Audio Error][configAndPlay]: ${error?.message}`);
			}
		})();
	};

export const pause =
	(playbackObject) =>
	(next = () => {}) => {
		(async () => {
			try {
				const soundObj = await playbackObject?.pauseAsync();
				next(soundObj);
			} catch (error) {
				console.log(`[Audio Error][pause]: ${error?.message}`);
			}
		})();
	};

export const resume =
	(playbackObject) =>
	(next = () => {}) => {
		(async () => {
			try {
				const soundObj = await playbackObject?.playAsync();
				next(soundObj);
			} catch (error) {
				console.log(`[Audio Error][resume]: ${error?.message}`);
			}
		})();
	};

export const seek =
	(playbackObject, millis) =>
	(next = () => {}) =>
	(onPlaybackStatusUpdate = () => {}) => {
		(async () => {
			try {
				const soundObj = await playbackObject?.playFromPositionAsync(millis);
				playbackStatusUpdate(playbackObject)(onPlaybackStatusUpdate);
				next(soundObj);
			} catch (error) {
				console.log(`[Audio Error][seek]: ${error?.message}`);
			}
		})();
	};

export const stop =
	(playbackObject) =>
	(next = () => {}) => {
		(async () => {
			try {
				if ('stopAsync' in playbackObject && 'unloadAsync' in playbackObject) {
					const soundObj = await playbackObject?.stopAsync();
					await playbackObject?.unloadAsync();
					next(soundObj);
				} else {
					next(null);
				}
			} catch (error) {
				console.log(`[Audio Error][stop]: ${error?.message}`);
			}
		})();
	};
