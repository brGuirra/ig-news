import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

import { getStripeJs } from '../../services/stripe-js';
import { api } from '../../services/api';

import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    // Check if user is logged in
    if (!session) {
      signIn('github');
      return;
    }

    // Redirect user to posts page if he/she
    // has an active subscription and click in
    // subscription button again
    if (session.activeSubscription) {
      router.push('/posts');
      return;
    }

    // Create checkout session and redirect user to
    // checkout page
    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type='button'
      className={styles.subscribeButton}
      onClick={handleSubscribe}>
      Subscribe now
    </button>
  );
}
