'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import { useBusinessAuth } from '../contexts/BusinessAuthContext';
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag, TrendingDown, Building2, Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { database } from '../firebase';
import { ref, push } from 'firebase/database';
import { AddressFinder } from "@ideal-postcodes/address-finder";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "../components/CheckoutPage";

interface Address {
  line_1: string;
  line_2: string;
  city: string;
  postal_code: string;
  country: string;
}

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
}

interface PaymentIntent {
  id: string;
  paymentMethodId: string;
  status?: string;
}

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("Missing Stripe public key");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `ORD-${timestamp.slice(-6)}-${random}`;
};

// Email sending function
const sendEmail = async (to: string, subject: string, htmlContent: string) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html: htmlContent.trim(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Email API error response:', errorData);
      throw new Error(`Failed to send email: ${errorData.error || response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Generate email content for order confirmation
const generateOrderConfirmationEmail = (orderData: any) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background-color: #ffffff;">
      <div style="background-color: #0f172a; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Užsakymo patvirtinimas</h1>
      </div>
      
      <div style="padding: 40px;">
        <h2 style="font-size: 24px; color: #2c2c2c; margin-bottom: 20px;">
          Užsakymas #${orderData.orderNumber}
        </h2>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; font-size: 18px; margin-bottom: 15px;">Jūsų duomenys:</h3>
          <p style="color: #666; line-height: 1.6; margin: 0;">
            ${orderData.customerDetails.name}<br>
            ${[
              orderData.customerDetails.address.line_1,
              orderData.customerDetails.address.line_2,
              orderData.customerDetails.address.city,
              orderData.customerDetails.address.postal_code,
              orderData.customerDetails.address.country
            ].filter(Boolean).join(", ")}<br>
            El. paštas: ${orderData.customerDetails.email}<br>
            Telefonas: ${orderData.customerDetails.phone}
          </p>
        </div>

        <hr style="border: 0; height: 2px; background-color: #e5e7eb; margin: 30px 0;">

        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; font-size: 18px; margin-bottom: 20px;">Užsakymo santrauka</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f8f8f8;">
                <th style="padding: 12px; text-align: left;">Produktas</th>
                <th style="padding: 12px; text-align: right;">Kaina</th>
                <th style="padding: 12px; text-align: right;">Kiekis</th>
                <th style="padding: 12px; text-align: right;">Viso</th>
              </tr>
            </thead>
            <tbody>
              ${orderData.items.map((item: any) => `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">
                    ${item.title}
                  </td>
                  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #eee;">€${item.price.toFixed(2)}</td>
                  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #eee;">${item.quantity}</td>
                  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #eee;">€${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="text-align: right; padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">Tarpinė suma:</td>
                <td style="text-align: right; padding: 12px; border-bottom: 1px solid #eee;">€${orderData.total.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right; padding: 12px; font-weight: bold; font-size: 18px;">Viso:</td>
                <td style="text-align: right; padding: 12px; font-weight: bold; font-size: 18px;">€${orderData.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div style="text-align: center; padding: 20px 0; color: #666;">
          <p style="margin: 5px 0;">Dėkojame už jūsų užsakymą!</p>
          <p style="margin: 5px 0;">&copy; ${new Date().getFullYear()} Jūsų parduotuvė. Visos teisės saugomos.</p>
        </div>
      </div>
    </div>
  `;
};

export default function KrepselisPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  const { isBusinessUser, businessAccount, discountRate } = useBusinessAuth();
  const shouldRender = useRef(true);

  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<'cart' | 'address' | 'payment' | 'confirmation'>('cart');
  const [orderNumber, setOrderNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  
  const [addressState, setAddressState] = useState<Address>({
    line_1: "",
    line_2: "",
    city: "",
    postal_code: "",
    country: "Lietuva"
  });

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!shouldRender.current) return;
    shouldRender.current = false;

    try {
      AddressFinder.watch({
        inputField: "#searchField",
        apiKey: "ak_m7er2krmNz1PZo176JAE6NOeAIsPl",
        onAddressRetrieved: (address: any) => {
          setAddressState({
            line_1: address.line_1 || "",
            line_2: address.line_2 || "",
            city: address.post_town || address.city || "",
            postal_code: address.postcode || address.postal_code || "",
            country: address.country || "Lietuva"
          });
        },
      });
    } catch (error) {
      console.error("Error initializing address finder:", error);
    }
  }, []);

  const handleCustomerInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentSuccess = async (paymentIntent: PaymentIntent): Promise<void> => {
    try {
      setIsSubmitting(true);
      setIsEmailSending(true);
      setEmailError(null);
      
      if (!addressState.line_1) {
        throw new Error('Prašome įvesti galiojantį adresą');
      }

      const newOrderNumber = generateOrderNumber();
      setOrderNumber(newOrderNumber);
      
      const orderItems = cart.map(item => ({
        productId: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        img: item.img
      }));
      
      const orderData = {
        orderNumber: newOrderNumber,
        customerDetails: {
          ...customerDetails,
          address: addressState,
          postcode: addressState.postal_code
        },
        items: orderItems,
        total: cartTotal,
        status: 'paid',
        paymentDetails: {
          method: 'stripe',
          paymentMethodId: paymentIntent.paymentMethodId,
          paymentIntentId: paymentIntent.id,
          timestamp: new Date().toISOString()
        },
        timestamp: new Date().toISOString()
      };

      try {
        const ordersRef = ref(database, 'orders');
        await push(ordersRef, orderData);
      } catch (dbError) {
        console.error('Error storing order in database:', dbError);
      }

      setCurrentStep('confirmation');

      try {
        await sendEmail(
          customerDetails.email,
          'Užsakymo patvirtinimas',
          generateOrderConfirmationEmail(orderData)
        );
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        setEmailError('Užsakymas apdorotas, bet patvirtinimo el. laiškas nebuvo išsiųstas.');
      }
    } catch (error) {
      console.error('Error in submission:', error);
      alert(error instanceof Error ? error.message : 'Įvyko klaida. Bandykite dar kartą.');
    } finally {
      setIsSubmitting(false);
      setIsEmailSending(false);
    }
  };

  const validateAddress = () => {
    if (!addressState.line_1 || !addressState.city || !addressState.postal_code) {
      alert('Prašome užpildyti visus privalomus adreso laukus');
      return false;
    }
    return true;
  };

  const validateCustomerDetails = () => {
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      alert('Prašome užpildyti visus asmeninius duomenis');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerDetails.email)) {
      alert('Prašome įvesti galiojantį el. pašto adresą');
      return false;
    }
    
    return true;
  };

  const handleContinueToPayment = () => {
    if (validateAddress() && validateCustomerDetails()) {
      setCurrentStep('payment');
    }
  };

  const formatPrice = (price: number) => {
    return `€${price.toFixed(2)}`;
  };

  if (!isMounted) return null;

  if (cart.length === 0 && currentStep === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-light text-gray-900 mb-4">Jūsų krepšelis tuščias</h2>
            <p className="text-gray-600 mb-8">Pradėkite apsipirkimą ir pridėkite produktų į krepšelį</p>
            <Link
              href="/produktai"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              Žiūrėti produktus
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Order Summary Component
  const OrderSummary = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
      <h3 className="text-xl font-medium text-gray-900 mb-6">Užsakymo santrauka</h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Tarpinė suma</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        {isBusinessUser && (
          <div className="flex justify-between text-teal-600 font-medium">
            <span>Verslo nuolaida ({discountRate}%)</span>
            <span>Pritaikyta</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>Pristatymas</span>
          <span className="text-sm">Skaičiuojamas vėliau</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-baseline">
            <span className="text-lg font-semibold text-gray-900">Viso</span>
            <span className="text-2xl font-bold text-gray-900">{formatPrice(cartTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-2">
            {currentStep === 'cart' ? 'Krepšelis' : 
             currentStep === 'address' ? 'Pristatymo informacija' :
             currentStep === 'payment' ? 'Apmokėjimo duomenys' :
             'Užsakymo patvirtinimas'}
          </h1>
          {currentStep === 'cart' && (
            <p className="text-gray-600">
              {cartCount} {cartCount === 1 ? 'prekė' : cartCount < 10 ? 'prekės' : 'prekių'}
            </p>
          )}
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items

-center ${currentStep === 'cart' ? 'text-slate-900' : 'text-gray-400'}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'cart' ? 'bg-slate-900 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2">Krepšelis</span>
            </div>
            <div className="w-12 h-1 mx-2 bg-gray-200"></div>
            <div className={`flex items-center ${currentStep === 'address' ? 'text-slate-900' : 'text-gray-400'}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'address' ? 'bg-slate-900 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2">Adresas</span>
            </div>
            <div className="w-12 h-1 mx-2 bg-gray-200"></div>
            <div className={`flex items-center ${currentStep === 'payment' ? 'text-slate-900' : 'text-gray-400'}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'payment' ? 'bg-slate-900 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2">Apmokėjimas</span>
            </div>
            <div className="w-12 h-1 mx-2 bg-gray-200"></div>
            <div className={`flex items-center ${currentStep === 'confirmation' ? 'text-slate-900' : 'text-gray-400'}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'confirmation' ? 'bg-slate-900 text-white' : 'bg-gray-200'}`}>
                4
              </div>
              <span className="ml-2">Patvirtinimas</span>
            </div>
          </div>
        </div>

        {/* Business Account Banner */}
        {isBusinessUser && businessAccount && currentStep === 'cart' && (
          <div className="mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-teal-800 text-white rounded-3xl p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Verslo paskyra</h3>
                <p className="text-white/60">{businessAccount.companyName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-teal-400/20 backdrop-blur-xl rounded-xl px-4 py-3 border border-teal-400/30">
              <TrendingDown className="w-5 h-5 text-teal-300" />
              <span className="text-sm">
                Pritaikyta <span className="font-semibold">{discountRate}% verslo nuolaida</span> visiems produktams
              </span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cart Items */}
            {currentStep === 'cart' && (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                        {item.img ? (
                          <Image
                            src={item.img}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-12 h-12 text-gray-300" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                            {item.title}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Pašalinti iš krepšelio"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {item.description && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {item.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                              aria-label="Sumažinti kiekį"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                              aria-label="Padidinti kiekį"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            {isBusinessUser && item.originalPrice && item.originalPrice !== item.price && (
                              <div className="text-sm text-gray-400 line-through">
                                {formatPrice(item.originalPrice * item.quantity)}
                              </div>
                            )}
                            <div className="text-xl font-semibold text-gray-900">
                              {formatPrice((item.price || 0) * item.quantity)}
                            </div>
                            {isBusinessUser && item.businessDiscount && (
                              <div className="text-xs text-teal-600 font-medium">
                                -{item.businessDiscount}% nuolaida
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart and Proceed Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setCurrentStep('address')}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl hover:bg-slate-800 transition-colors font-medium"
                  >
                    Pereiti prie užsakymo
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                  >
                    Išvalyti krepšelį
                  </button>
                </div>
              </div>
            )}

            {/* Address Form */}
            {currentStep === 'address' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                {/* Address Finder Section */}
                <div className="mb-6">
                  <h2 className="text-xl font-medium mb-4">Pristatymo adresas</h2>
                  <div>
                    <input
                      placeholder="Pradėkite rašyti adresą..."
                      id="searchField"
                      type="text"
                      className="mb-4 bg-transparent border border-gray-300 rounded-xl py-3 px-4 w-full text-base text-gray-600 shadow-none focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="line_1" className="block text-sm font-medium text-gray-700 mb-1">
                          Adresas 1 <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="line_1"
                          type="text"
                          value={addressState.line_1}
                          onChange={(e) => setAddressState({ ...addressState, line_1: e.target.value })}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="line_2" className="block text-sm font-medium text-gray-700 mb-1">
                          Adresas 2
                        </label>
                        <input
                          id="line_2"
                          type="text"
                          value={addressState.line_2}
                          onChange={(e) => setAddressState({ ...addressState, line_2: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          Miestas <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="city"
                          type="text"
                          value={addressState.city}
                          onChange={(e) => setAddressState({ ...addressState, city: e.target.value })}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 mb-1">
                          Pašto kodas <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="postal_code"
                          type="text"
                          value={addressState.postal_code}
                          onChange={(e) => setAddressState({ ...addressState, postal_code: e.target.value })}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Šalis
                      </label>
                      <input
                        id="country"
                        type="text"
                        value={addressState.country}
                        onChange={(e) => setAddressState({ ...addressState, country: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Details Section */}
                <div className="border-t pt-6 mt-6">
                  <h2 className="text-xl font-medium mb-4">Asmeniniai duomenys</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Vardas Pavardė <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={customerDetails.name}
                        onChange={handleCustomerInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        El. paštas <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={customerDetails.email}
                        onChange={handleCustomerInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefonas <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={customerDetails.phone}
                        onChange={handleCustomerInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setCurrentStep('cart')}
                    className="flex-1 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    Atgal į krepšelį
                  </button>
                  <button
                    onClick={handleContinueToPayment}
                    className="flex-1 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Tęsti į apmokėjimą
                  </button>
                </div>
              </div>
            )}

            {/* Payment Section */}
            {currentStep === 'payment' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-medium mb-6">Apmokėjimo duomenys</h2>
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <p>Pristatymas: {[
                      addressState.line_1,
                      addressState.city,
                      addressState.postal_code
                    ].filter(Boolean).join(", ")}</p>
                  </div>
                </div>
                
                <Elements
                  stripe={stripePromise}
                  options={{
                    mode: "payment",
                    amount: Math.round(cartTotal * 100),
                    currency: "eur",
                  }}
                >
                  <CheckoutPage 
                    amount={cartTotal}
                    onSuccessfulPayment={handlePaymentSuccess}
                    customerDetails={{
                      name: customerDetails.name,
                      email: customerDetails.email,
                      phone: customerDetails.phone,
                      address: addressState
                    }}
                  />
                </Elements>
                
                <div className="mt-6">
                  <button
                    onClick={() => setCurrentStep('address')}
                    className="w-full border border-gray-300 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Atgal į adresą
                  </button>
                </div>
              </div>
            )}

            {/* Confirmation Section */}
            {currentStep === 'confirmation' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-medium text-gray-900">Užsakymas patvirtintas!</h2>
                  <p className="text-gray-600 mt-2">Dėkojame už jūsų užsakymą</p>
                  <p className="text-sm font-medium mt-1">Užsakymo numeris: {orderNumber}</p>
                  
                  {isEmailSending ? (
                    <div className="mt-4 flex items-center justify-center text-gray-600">
                      <Loader2 className="animate-spin w-5 h-5 mr-2" />
                      Siunčiamas patvirtinimo el. laiškas...
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600 mt-2">
                        {emailError ? 
                          <span className="text-amber-600">{emailError}</span> : 
                          "Patvirtinimo el. laiškas išsiųstas"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-medium mb-4">Užsakymo detalės</h3>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden mr-3">
                            {item.img && (
                              <Image src={item.img} alt={item.title} width={48} height={48} className="object-cover" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-gray-500 text-sm">Kiekis: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">{formatPrice((item.price || 0) * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 mt-6 pt-4">
                    <div className="flex justify-between font-medium text-lg mt-2 pt-2 border-t">
                      <span>Viso</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8">
                  <div>
                    <p className="text-sm text-gray-600">Patvirtinimo el. laiškas išsiųstas:</p>
                    <p className="font-medium">{customerDetails.email}</p>
                  </div>
                  <Link
                    href="/produktai"
                    className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors inline-block"
                  >
                    Tęsti apsipirkimą
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            {currentStep !== 'confirmation' && <OrderSummary />}

            {/* Show compact items view for address and payment steps */}
            {(currentStep === 'address' || currentStep === 'payment') && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
                <h3 className="font-medium mb-4">Prekės krepšelyje</h3>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                        {item.img ? (
                          <Image
                            src={item.img}
                            alt={item.title}
                            width={64}
                            height={64}
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                        <p className="text-gray-500 text-xs">Kiekis: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-sm">{formatPrice((item.price || 0) * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}