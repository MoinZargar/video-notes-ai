import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AI Notes</h3>
            <p className="text-gray-400 text-sm">Transforming video lectures into detailed notes with AI.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-gray-400 hover:text-white text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-400 hover:text-white text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-400 hover:text-white text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <section id="contact">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400 text-sm mb-2">Email: moinbashir2019@gmail.com</p>
            <p className="text-gray-400 text-sm">Phone: +916005812088</p>
          </section>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} AI Notes. All rights reserved.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-8">
            <Link href="https://merchant.razorpay.com/policy/PzSGaypZPc87T6/refund" className="text-gray-400 hover:text-white text-sm">
              Cancellation & Refund
            </Link>
            <Link href="https://merchant.razorpay.com/policy/PzSGaypZPc87T6/terms" className="text-gray-400 hover:text-white text-sm">
              Terms & Conditions
            </Link>
            <Link href="https://merchant.razorpay.com/policy/PzSGaypZPc87T6/shipping" className="text-gray-400 hover:text-white text-sm">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}