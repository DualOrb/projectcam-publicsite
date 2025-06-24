import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { COMPANY_INFO } from '@/utils/constants'

const TermsPage = () => {
  useEffect(() => {
    document.title = 'Terms of Service - Project Cam'
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
            Terms of Service
          </h1>
          
          <p className="text-brand-gray-medium mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                By signing up for early access to Project Cam or using our website, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                2. Description of Service
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                Project Cam is a project documentation application that combines voice recording, photo capture, 
                AI-powered reporting, and team collaboration features. We are currently in development and offering 
                early access signup for launch notifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                3. Early Access Program
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                By signing up for early access:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-brand-gray-dark mt-4">
                <li>You will receive notifications about Project Cam development and launch</li>
                <li>You may be invited to participate in beta testing (optional)</li>
                <li>You understand that the product is under development and subject to change</li>
                <li>No payment is required for early access notifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                4. User Responsibilities
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-brand-gray-dark mt-4">
                <li>Provide accurate and current information</li>
                <li>Use the service for lawful purposes only</li>
                <li>Respect intellectual property rights</li>
                <li>Not attempt to reverse engineer or hack our systems</li>
                <li>Report any security vulnerabilities responsibly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                All content, features, and functionality of Project Cam, including but not limited to text, graphics, 
                logos, software, and design, are owned by us and protected by intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                6. Privacy and Data Protection
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
                use, and protect your information. By using our service, you consent to our data practices as described in the Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                7. Disclaimer of Warranties
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                Project Cam is provided "as is" without warranties of any kind, either express or implied. 
                We do not warrant that the service will be uninterrupted, secure, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages arising out of your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                9. Termination
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                We may terminate or suspend your access to our service at any time, with or without cause or notice. 
                You may also terminate your participation by unsubscribing from our mailing list.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                10. Changes to Terms
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. We will notify users of any 
                material changes by posting the updated terms on our website and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                11. Governing Law
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction 
                in which our company is incorporated, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-brand-black mb-4">
                12. Contact Information
              </h2>
              <p className="text-brand-gray-dark leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
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

export default TermsPage