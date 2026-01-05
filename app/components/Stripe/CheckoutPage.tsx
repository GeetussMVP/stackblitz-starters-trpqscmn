// --- TRANSLATED + LOCALIZED FOR LITHUANIAN CUSTOMERS ---

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubcurrency from "../../lib/convertToSubcurrency";

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
  const [successUrl, setSuccessUrl] = useState("https://dekoratoriai.lt/mokejimas-sekmingas");
  const [cancelUrl, setCancelUrl] = useState("https://dekoratoriai.lt/mokejimas-atsauktas");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (amount <= 0) return;

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        amount: convertToSubcurrency(amount),
        currency: "eur",
        customerDetails
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || `HTTP klaida ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          if (data.successUrl) setSuccessUrl(data.successUrl);
          if (data.cancelUrl) setCancelUrl(data.cancelUrl);
        } else {
          throw new Error("Serveris negrąžino „clientSecret“.");
        }
      })
      .catch((error) => {
        console.error("Klaida kuriant mokėjimo užklausą:", error);
        setErrorMessage(error instanceof Error ? error.message : "Nepavyko inicijuoti mokėjimo. Bandykite dar kartą.");
      });
  }, [amount, customerDetails]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(undefined);

    if (!stripe || !elements) {
      setLoading(false);
      setErrorMessage("Mokėjimo sistema šiuo metu nepasiekiama. Bandykite vėliau.");
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
        confirmParams: { return_url: successUrl },
        redirect: "if_required",
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else if ("paymentIntent" in result && onSuccessfulPayment) {
        await onSuccessfulPayment({
          id: result.paymentIntent.id,
          paymentMethodId: result.paymentIntent.payment_method,
          status: result.paymentIntent.status,
        });
      }
    } catch (e) {
      console.error("Mokėjimo patvirtinimo klaida:", e);
      setErrorMessage("Įvyko netikėta klaida. Bandykite dar kartą.");
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center p-8">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent"
          role="status"
        >
          <span className="sr-only">Įkeliama...</span>
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
        {!loading ? `Mokėti €${amount.toFixed(2)}` : "Apdorojama..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
