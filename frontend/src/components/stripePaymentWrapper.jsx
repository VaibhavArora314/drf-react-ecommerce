import React, {useState, useEffect} from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import httpService from "../services/httpService";
import PaymentForm from "./paymentForm";

const stripePromise = loadStripe(
  "pk_test_51MgL0WSGdHX9RzyM44mjtkZiGn07tevTIybSNbE3R5REj6iAx0MNXt9b0m0xDlXnQnrq63fLdVm63XMOqyJWE2AN00eNUmHq6I"
);

export default function StripePaymentWrapper({id}) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data } = await httpService.post("/api/stripe-payment/",{order:id});
        setClientSecret(data.clientSecret);
      } catch (ex) {
        console.log(ex);
      }
    };
    createPaymentIntent();
  }, []);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="payment">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm id={id}/>
        </Elements>
      )}
    </div>
  );
}
