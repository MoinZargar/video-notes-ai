import { NextPage } from "next"
import Head from "next/head"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

const RefundPolicyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cancellation & Refund Policy | AI Notes</title>
        <meta 
          name="description" 
          content="Cancellation and refund policy for AI Notes subscriptions." 
        />
      </Head>
      
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Cancellation & Refund Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated on Feb 24, 2025</p>
        
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Subscription Cancellation</h2>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Users can cancel their subscription at any time through their account settings.</li>
            <li className="mb-2">Once canceled, the subscription will remain active until the end of the current billing cycle, after which access to premium features will be revoked.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. No Refund Policy</h2>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2"><strong>All payments made for subscriptions are non-refundable.</strong></li>
            <li className="mb-2">Once a subscription is purchased, no partial or full refunds will be issued, even if the user decides to stop using the service before the billing cycle ends.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. Changes to Subscription Plans</h2>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">NotesAI reserves the right to modify pricing, features, or plans at any time. </li>
          </ul>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-gray-600">
              If you have any questions about our cancellation and refund policy, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> moinbashir2019@gmail.com<br />
              <strong>Phone:</strong> +916005812088
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
}

export default RefundPolicyPage