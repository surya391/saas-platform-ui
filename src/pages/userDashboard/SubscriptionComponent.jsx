import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeUser, checkSubscriptionUsability, resetSubscriptionState } from '../../slices/plansSlice';
import { fetchUserProfile } from '../../slices/profileSlice';
import { useNavigate } from 'react-router-dom';

const SubscriptionComponent = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile.data);
  const profileLoading = useSelector((state) => state.profile.isLoading);

  const {
    subscriptionLoading,
    subscriptionError,
    subscriptionSuccess,
    usabilityLoading,
    usabilityStatus,
  } = useSelector((state) => state.plans);

  // Fetch user profile on mount and after subscription success
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, userId]);

  // When subscription succeeds, re-fetch profile to get updated subscription_id
  useEffect(() => {
    if (subscriptionSuccess) {
      dispatch(fetchUserProfile(userId));
      dispatch(resetSubscriptionState());
    }
  }, [subscriptionSuccess, dispatch, userId]);

  // When profile data changes and has subscription_id, check usability
  useEffect(() => {
    if (profile && profile.subscription_id) {
      dispatch(checkSubscriptionUsability(profile.subscription_id));
    }
  }, [dispatch, profile]);

  // Redirect if usabilityStatus is true
  useEffect(() => {
    if (usabilityStatus) {
      navigate('/plancard');
    }
  }, [usabilityStatus, navigate]);

  const handleSubscribe = () => {
    if (!subscriptionLoading && userId) {
      // For example, planId can be static or from props
      const planId = 'plan_123';
      dispatch(subscribeUser({ userId, planId }));
    }
  };

  const isSubscribed = profile?.subscription_id;

  return (
    <div>
      <h2>Subscribe to Plan</h2>

      {profileLoading && <p>Loading profile...</p>}

      {subscriptionError && <p style={{ color: 'red' }}>Error: {subscriptionError}</p>}

      {usabilityLoading && <p>Checking subscription usability...</p>}

      <button
        onClick={handleSubscribe}
        disabled={subscriptionLoading || !!isSubscribed}
      >
        {subscriptionLoading ? 'Subscribing...' : isSubscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  );
};

export default SubscriptionComponent;
