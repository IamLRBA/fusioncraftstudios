'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Users, FileText } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Eye,
      title: 'Information We Collect',
      content: [
        'Personal information (name, email, phone number) when you contact us',
        'Usage data and analytics to improve our services',
        'Cookies and similar technologies for website functionality',
        'Information you provide through our contact forms'
      ]
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'To provide and maintain our services',
        'To communicate with you about our services',
        'To improve our website and user experience',
        'To comply with legal obligations'
      ]
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: [
        'We do not sell, trade, or rent your personal information',
        'We may share information with trusted service providers',
        'We may disclose information if required by law',
        'Your information is protected by strict confidentiality agreements'
      ]
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: [
        'We implement appropriate security measures',
        'Your data is encrypted during transmission',
        'We regularly review and update our security practices',
        'Access to your information is limited to authorized personnel'
      ]
    },
    {
      icon: FileText,
      title: 'Your Rights',
      content: [
        'Right to access your personal information',
        'Right to correct inaccurate information',
        'Right to request deletion of your data',
        'Right to opt-out of marketing communications'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 text-primary-800 hover:text-primary-600 transition-colors">
              <span className="font-semibold">⟸</span>
              <span className="font-semibold">Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold text-primary-900">Privacy Policy</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            At FusionCRAFT STUDIOS, we are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
          <p className="text-sm text-neutral-500 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 mb-8"
        >
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Introduction</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            This Privacy Policy describes how FusionCRAFT STUDIOS ("we," "us," or "our") collects, uses, and protects your personal information 
            when you visit our website, use our services, or interact with us in any way.
          </p>
          <p className="text-neutral-700 leading-relaxed">
            By using our services, you agree to the collection and use of information in accordance with this policy. 
            If you have any questions about this Privacy Policy, please contact us.
          </p>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <section.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-primary-900">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-neutral-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 mt-8"
        >
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Contact Us</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="space-y-2 text-neutral-700">
            <p><strong>Email:</strong> jerrylarubafestus@gmail.com</p>
            <p><strong>Phone:</strong> +256774948086</p>
            <p><strong>Address:</strong> Kampala, Uganda</p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-12"
        >
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300 font-medium"
          >
            Return to Homepage
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
