import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { COMPANY_INFO } from '@/utils/constants'

const PrivacyPage = () => {
  useEffect(() => {
    document.title = 'Privacy Policy - Project Cam'
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <Link
            to="/"
            className="inline-flex items-center text-brand-orange hover:text-brand-orange-dark transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container-custom py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-4xl font-display font-bold text-brand-black mb-8">
            Privacy Policy
          </h1>
          
          <p className="text-brand-gray-medium mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                1. Information We Collect
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                When you sign up for early access to Project Cam, we collect your email address and optionally your name. 
                We use this information solely to notify you about Project Cam updates, launch announcements, and relevant product information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-brand-gray-dark">
                <li>Send you updates about Project Cam development and launch</li>
                <li>Notify you when the app becomes available</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>Improve our products and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                3. Information Sharing
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties. 
                We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-brand-gray-dark mt-4">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                4. Data Security
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. Your data is stored securely using industry-standard encryption.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                5. Your Rights
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-brand-gray-dark mt-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your information</li>
                <li>Unsubscribe from our mailing list at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                6. Cookies and Tracking
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                Our website may use cookies and similar tracking technologies to improve your browsing experience 
                and analyze website traffic. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                7. Changes to This Policy
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any significant changes 
                by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                8. Contact Us
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-brand-gray-light p-6 rounded-xl mt-4">
                <p className="text-brand-black font-medium">{COMPANY_INFO.name}</p>
                <p className="text-brand-gray-dark">Email: {COMPANY_INFO.email}</p>
                <p className="text-brand-gray-dark">Website: {COMPANY_INFO.website}</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PrivacyPage