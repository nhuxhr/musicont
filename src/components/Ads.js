/**
 * Package: expo-ads-admob
 * Homepage: https://docs.expo.io/versions/latest/sdk/admob/
 * Repository: https://github.com/expo/expo
 */
// TODO: Make it better

// Set global test device ID
(async () => {
	await setTestDeviceIDAsync('EMULATOR');
})();

import {
	AdMobBanner as AdMobBannerComponent,
	AdMobInterstitial,
	PublisherBanner as PublisherBannerComponent,
	AdMobRewarded,
	setTestDeviceIDAsync, //
} from 'expo-ads-admob';

const adUnitID = Object.freeze({
	banner: 'ca-app-pub-3940256099942544/6300978111', // Your Admob unit ID
	interstitial: 'ca-app-pub-3940256099942544/1033173712', // Your Admob unit ID
	reward: 'ca-app-pub-3940256099942544/5224354917', // Your Admob unit ID
});

// Set global test device ID
(async () => {
	await setTestDeviceIDAsync('EMULATOR');
})();

export const AdMobBanner = ({ bannerSize = 'fullBanner' }) => {
	// TODO: Add events! Kindly see: https://docs.expo.io/versions/latest/sdk/admob/#admobinterstitials

	const bannerError = (error) => {
		// Do something!
	};

	return (
		<AdMobBannerComponent
			bannerSize={bannerSize} // Banner size (banner | fullBanner | largeBanner | leaderboard | mediumRectangle | smartBannerLandscape | smartBannerPortrait)
			adUnitID={adUnitID?.banner}
			servePersonalizedAds // true or false
			onDidFailToReceiveAdWithError={bannerError}
		/>
	);
};

export const PublisherBanner = ({ bannerSize = 'fullBanner' }) => {
	// TODO: Add events! Kindly see: https://docs.expo.io/versions/latest/sdk/admob/#admobinterstitials

	const bannerError = (error) => {
		// Do something!
	};

	const adMobEvent = (e) => {
		// Do something!
	};

	return (
		<PublisherBannerComponent
			bannerSize={bannerSize} // Banner size (banner | fullBanner | largeBanner | leaderboard | mediumRectangle | smartBannerLandscape | smartBannerPortrait)
			adUnitID={adUnitID?.banner}
			onDidFailToReceiveAdWithError={bannerError}
			onAdMobDispatchAppEvent={adMobEvent}
		/>
	);
};

export const interstitialAds = async () => {
	return new Promise(async (resolve) => {
		await AdMobInterstitial.setAdUnitID(adUnitID?.interstitial);
		await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
		await AdMobInterstitial.showAdAsync();

		// TODO: Add events! Kindly see: https://docs.expo.io/versions/latest/sdk/admob/#admobinterstitials

		resolve();
	});
};

// TODO: Make it better
export const rewardAds = async ({
	rewardedVideoUserDidEarnReward = () => {},
	rewardedVideoDidLoad = () => {},
	rewardedVideoDidFailToLoad = () => {},
	rewardedVideoDidPresent = () => {},
	rewardedVideoDidFailToPresent = () => {},
	rewardedVideoDidDismiss = () => {},
}) => {
	return new Promise(async (resolve) => {
		await AdMobRewarded.setAdUnitID(adUnitID?.reward);
		await AdMobRewarded.requestAdAsync();
		await AdMobRewarded.showAdAsync();

		AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', rewardedVideoUserDidEarnReward);
		AdMobRewarded.addEventListener('rewardedVideoDidLoad', rewardedVideoDidLoad);
		AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad', rewardedVideoDidFailToLoad);
		AdMobRewarded.addEventListener('rewardedVideoDidPresent', rewardedVideoDidPresent);
		AdMobRewarded.addEventListener('rewardedVideoDidFailToPresent', rewardedVideoDidFailToPresent);
		AdMobRewarded.addEventListener('rewardedVideoDidDismiss', rewardedVideoDidDismiss);

		resolve();
	});
};
