import { useEffect, useState } from 'react';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ 
  ? TestIds.REWARDED 
  : 'ca-app-pub-9995650566626195/6482754281';

export function useRewardAd() {
  const [loaded, setLoaded] = useState(false);
  const [isRewarded, setIsRewarded] = useState(false);
  const [rewardedAd, setRewardedAd] = useState<RewardedAd | null>(null);

  useEffect(() => {
    // Create a new rewarded ad instance
    const ad = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['resume', 'cv', 'career']
    });

    setRewardedAd(ad);

    const unsubscribeLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log('Ad loaded');
      setLoaded(true);
    });

    const unsubscribeEarned = ad.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward: { type: string; amount: number }) => {
        console.log('User earned reward');
        setIsRewarded(true);
      },
    );

    const unsubscribeClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('Ad closed');
      // Load a new ad when the current one is closed
      setLoaded(false);
      ad.load();
    });

    // Load the initial ad
    ad.load();

    // Cleanup
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
    };
  }, []);

  const showAd = async () => {
    if (!rewardedAd || !loaded) {
      console.log('Ad not ready', { loaded, adInstance: !!rewardedAd });
      return false;
    }

    try {
      await rewardedAd.show();
      return true;
    } catch (error) {
      console.error('Error showing ad:', error);
      // If showing fails, try to load a new ad
      setLoaded(false);
      rewardedAd.load();
      return false;
    }
  };

  return {
    showAd,
    loaded,
    rewarded: isRewarded,
    setRewarded: setIsRewarded
  };
} 