import { NextPage } from "next"
import Head from "next/head"
import Footer from "@/components/Footer"
import Header from "@/components/Header" 

const TermsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Terms & Conditions | AI Notes</title>
        <meta 
          name="description" 
          content="Terms and conditions for using the AI Notes service." 
        />
      </Head>
      
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated on Feb 24, 2025</p>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Welcome to NotesAI! These Terms and Conditions govern your use of our website and services. 
            By accessing or using NotesAI, you agree to abide by these terms. If you do not agree with 
            any part of these terms, please do not use our services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. General Terms</h2>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">NotesAI is an online software service provided by an individual.</li>
            <li className="mb-2">We reserve the right to update, modify, or discontinue our service at any time without prior notice.</li>
            <li className="mb-2">By using our services, you agree that you are responsible for ensuring compliance with applicable laws in your region.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. Use of Service</h2>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">You are responsible for maintaining the confidentiality of your account and password.</li>
            <li className="mb-2">You agree not to misuse our service, including attempting to hack, distribute harmful software, or engage in fraudulent activities.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. Subscription & Payments</h2>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">NotesAI operates on a subscription model. By subscribing, you agree to our pricing and payment terms.</li>
            <li className="mb-2">We use third-party payment processors (such as Razorpay) to handle transactions securely.</li>
            <li className="mb-2">We are not responsible for any issues caused by payment providers.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. Intellectual Property</h2>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">All content, trademarks, and intellectual property on NotesAI are owned by or licensed to us. You may not copy, reproduce, or distribute our content without prior consent.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Limitation of Liability</h2>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">We do not guarantee that our services will always be available, uninterrupted, or error-free.</li>
            <li className="mb-2">We are not responsible for any loss or damages resulting from the use or inability to use our service.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Termination of Service</h2>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">We reserve the right to suspend or terminate your access if you violate any terms or engage in unlawful activities.</li>
          </ul>
          
  
        </div>
      </main>
      
      <Footer />
    </>
  )
}

export default TermsPage