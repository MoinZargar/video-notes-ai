import { NextPage } from "next"
import Head from "next/head"
import Footer from "@/components/Footer"
import Header from "@/components/Header" 

const PrivacyPolicyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | AI Notes</title>
        <meta 
          name="description" 
          content="Privacy policy for AI Notes service." 
        />
      </Head>
      
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated on Feb 24, 2025</p>
        
        <div className="prose max-w-none">
          <p className="mb-6">
            At NotesAI, we value your privacy and are committed to protecting your personal information. 
            This Privacy Policy outlines how we collect, use, and safeguard your data when you use our service.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Data Collection & Usage</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-3">We do not record your chat interactions with the AI anywhere in our database.</li>
            <li className="mb-3">If you sign up using credentials, your password is securely stored in a hashed format in our database.</li>
            <li className="mb-3">Your uploaded data, including videos and PDF notes, is securely stored in our database and is not shared with third parties.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">2. Data Protection & Security</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-3">We implement security measures to protect your personal data from unauthorized access.</li>
            <li className="mb-3">While we strive to keep your data secure, we cannot guarantee absolute security due to evolving cybersecurity threats.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">3. Third-Party Services</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-3">We do not sell, trade, or share your personal data with third-party services for marketing or advertising purposes.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">4. Changes to Privacy Policy</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-3">We may update this Privacy Policy from time to time.</li>
          </ul>
                 
          
          <h2 className="text-xl font-semibold mt-8 mb-4">5. Cookies</h2>
          <p className="mb-4">
            We use cookies to enhance your experience on our website. These cookies are essential for the functioning
            of our service and help us understand how you interact with our website.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">6. Contact Information</h2>
          <p className="mb-2">
            If you have any questions or concerns about our Privacy Policy, please contact us:
          </p>
          <p className="mb-6">
            <strong>Email:</strong> moinbashir2019@gmail.com<br />
            <strong>Phone:</strong> +916005812088<br />
            <strong>Address:</strong> House No. 88, Ward No. 8, Chinar Gali, Kishtwar, Jammu and Kashmir, India
          </p>
          
          <div className="bg-gray-100 p-6 rounded-lg mt-8">
            <p className="text-sm text-gray-600 italic">
              This privacy policy was last updated on February 24, 2025 and applies to all users of the AI Notes service.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
}

export default PrivacyPolicyPage