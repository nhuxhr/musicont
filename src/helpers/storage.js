import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = async (key, value, isJSON = false) => {
	try {
		await AsyncStorage.setItem(`@${key}`, !isJSON ? value : JSON.stringify(value));
	} catch (e) {
		console.log(`[AsyncStorage Error][store]: ${e?.message}`);
	}
};

export const get = async (key, isJSON = false) => {
	try {
		const value = await AsyncStorage.getItem(`@${key}`);
		return value != null ? (!isJSON ? value : JSON.parse(value)) : null;
	} catch (e) {
		console.log(`[AsyncStorage Error][get]: ${e?.message}`);
	}
};

export const remove = async (key) => {
	try {
		await AsyncStorage.removeItem(`@${key}`);
	} catch (e) {
		console.log(`[AsyncStorage Error][remove]: ${e?.message}`);
	}
};

export const clear = async (key) => {
	try {
		await AsyncStorage.clear();
	} catch (e) {
		console.log(`[AsyncStorage Error][clear]: ${e?.message}`);
	}
};
