"use client";

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from "next/navigation"
import { plansData } from '@/lib/data';

export default function Subscription() {
    const displayPlans = plansData.slice(1);
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const createSubscription = async () => {
        try {
            setError(null)
            setLoading(true)
            const response = await axios.post("/api/subscriptions/create", {
                planId: process.env.NEXT_PUBLIC_RAZORPAY_MONTHLY_PLAN_ID!
            })
            const subscription = response.data;
            router.push(subscription?.paymentUrl)
        } catch (error: any) {
            setError(error?.response?.data?.error || "Something went wrong. Please try again")
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Upgrade Your Plan
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        You're currently on the Basic plan. Upgrade for unlimited access.
                    </p>
                </div>

                <div className="mt-12 flex justify-center">
                    {displayPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className="flex flex-col rounded-lg shadow-lg overflow-hidden border-2 border-gray-300 max-w-md w-full"
                        >
                            <div className="px-4 py-1 bg-black text-white text-center text-sm font-semibold">
                                PREMIUM PLAN
                            </div>
                            <div className="bg-white px-6 py-8">
                                <div>
                                    <h3 className="text-center text-2xl font-medium text-gray-900">
                                        {plan.name}
                                    </h3>
                                    <div className="mt-4 flex justify-center">
                                        <span className="px-2 flex items-start text-6xl tracking-tight text-gray-900">
                                            <span className="mt-2 mr-2 text-4xl font-medium">₹</span>
                                            <span className="font-extrabold">{plan.price}</span>
                                        </span>
                                        <span className="text-xl font-medium text-gray-500 self-end">/month</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6">
                                <ul className="space-y-4">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg
                                                    className="h-6 w-6 text-green-500"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="ml-3 text-base text-gray-700">{feature}</p>
                                        </li>
                                    ))}
                                </ul>
                                {error && (
                                    <div className="rounded-md bg-red-50 p-4 mt-2">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-red-700">{error}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="rounded-md shadow">
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                        disabled={loading}
                                        onClick={() => createSubscription()}
                                    >
                                        {loading ? (
                                            <div className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </div>
                                        ) : (
                                            <>Upgrade to {plan.name}</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>You're currently on the Basic plan with 2 AI chats, 2 PDF uploads, and 2 video processing per day.</p>
                </div>
            </div>
        </div>
    );
};

