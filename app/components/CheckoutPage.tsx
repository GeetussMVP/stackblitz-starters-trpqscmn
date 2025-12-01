import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "../lib/convertToSubcurrency";

// Define the props interface
export interface CheckoutPageProps {
  amount: number;
  onSuccessfulPayment?: (paymentIntent: any) => Promise<void>;
  customerDetails?: any;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ 
  amount, 
  onSuccessfulPayment,
  customerDetails 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [successUrl, setSuccessUrl] = useState("https://trustedkitchenappliances.co.uk/payment-success");
  const [cancelUrl, setCancelUrl] = useState("https://trustedkitchenappliances.co.uk/payment-cancelled");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (amount <= 0) return;
    
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        amount: convertToSubcurrency(amount),
        currency: "gbp",
        customerDetails
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.error || `HTTP error ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          if (data.successUrl) setSuccessUrl(data.successUrl);
          if (data.cancelUrl) setCancelUrl(data.cancelUrl);
        } else {
          throw new Error('No client secret returned from server');
        }
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error);
        setErrorMessage(error instanceof Error ? error.message : 'Failed to initialize payment. Please try again.');
      });
  }, [amount, customerDetails]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(undefined);

    if (!stripe || !elements) {
      setLoading(false);
      setErrorMessage("Payment system not available. Please try again later.");
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    try {
      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: successUrl,
        },
        redirect: 'if_required', // Only redirect for 3DS if required
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else if ('paymentIntent' in result && onSuccessfulPayment) {
        // The payment succeeded, pass the payment intent to the callback
        await onSuccessfulPayment({
          id: result.paymentIntent.id,
          paymentMethodId: result.paymentIntent.payment_method,
          status: result.paymentIntent.status
        });
      }
    } catch (e) {
      console.error('Payment confirmation error:', e);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center p-8">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && (
        <div className="text-red-600 mt-4 text-sm">{errorMessage}</div>
      )}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-4 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay £${amount.toFixed(2)}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;