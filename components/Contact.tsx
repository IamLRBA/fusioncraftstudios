'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin,
  Send
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const contactInfo = [
  {
    title: "EᗰᗩIᒪ",
    subtitle: "jerrylarubafestus@gmail.com",
    icon: Mail,
    buttonText: "Email Us",
    action: () => window.open('mailto:jerrylarubafestus@gmail.com', '_blank'),
    color: "from-primary-500 to-primary-600"
  },
  {
    title: "ᑭᕼOᑎEᔕ",
    subtitle: "+256 774 948 086 & +256 755 915 549",
    icon: Phone,
    buttonText: "Call Us",
    action: () => {
      const numbers = ['+256774948086', '+256755915549']
      const selected = window.confirm(
        `Choose a number to call:\n1. ${numbers[0]}\n2. ${numbers[1]}`
      )
      if (selected !== null) {
        const number = numbers[selected ? 1 : 0]
        window.open(`tel:${number}`, '_blank')
      }
    },
    color: "from-accent-500 to-accent-600"
  },
  {
    title: "ᗯᕼᗩTᔕᗩᑭᑭ",
    subtitle: "+256 755 915 549",
    icon: FaWhatsapp,
    buttonText: "Message Us",
    action: () => window.open('https://wa.me/256755915549', '_blank'),
    color: "from-accent-500 to-accent-600"
  },
  {
    title: "ᒪOᑕᗩTIOᑎ",
    subtitle: "Kampala, Uganda",
    icon: MapPin,
    buttonText: "Find Us",
    action: () => window.open('https://maps.google.com/?q=Kampala,Uganda', '_blank'),
    color: "from-primary-500 to-primary-600"
  }
]

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [contactMethod, setContactMethod] = useState<'email' | 'whatsapp'>('email')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (contactMethod === 'email') {
        // Email submission logic
        const mailtoLink = `mailto:jerrylarubafestus@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
          `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`
        window.open(mailtoLink, '_blank')
      } else {
        // WhatsApp submission logic
        const whatsappMessage = `*New Contact Form Submission*\n\n*Name:* ${formData.firstName} ${formData.lastName}\n*Email:* ${formData.email}\n*Subject:* ${formData.subject}\n\n*Message:*\n${formData.message}`
        const whatsappLink = `https://wa.me/256755915549?text=${encodeURIComponent(whatsappMessage)}`
        window.open(whatsappLink, '_blank')
      }

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      })

      // Show success message
      alert('Message sent successfully!')
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Error sending message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-title"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
          GET Iᑎ <span className="text-accent-600">TOᑌᑕᕼ</span>
          </h2>
          <p className="text-xl text-primary-700 max-w-3xl mx-auto">
            Ready to start your next creative project? Let's discuss how we can bring your vision to life.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                className="group"
              >
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-primary-200">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-bold text-primary-800 mb-2">{info.title}</h4>
                    <p className="text-primary-600 text-sm leading-relaxed">{info.subtitle}</p>
                  </div>

                  {/* Button */}
                  <button
                    onClick={info.action}
                    className="w-full btn btn-outline text-sm py-2"
                  >
                    {info.buttonText}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 shadow-lg border border-primary-200">
            <h3 className="text-3xl font-bold text-primary-800 mb-8 text-center">
            ᔕEᑎᗪ ᑌᔕ ᗩ ᗰEᔕᔕᗩGE
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-primary-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-primary-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-primary-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="What is this about?"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              {/* Contact Method Selection */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-4">
                  How would you like to be contacted? *
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={contactMethod === 'email'}
                      onChange={(e) => setContactMethod(e.target.value as 'email' | 'whatsapp')}
                    />
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-primary-600" />
                      <span className="text-primary-700 font-medium">Email</span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="whatsapp"
                      checked={contactMethod === 'whatsapp'}
                      onChange={(e) => setContactMethod(e.target.value as 'email' | 'whatsapp')}
                    />
                    <div className="flex items-center space-x-2">
                      <FaWhatsapp className="w-5 h-5 text-primary-600" />
                      <span className="text-primary-700 font-medium">WhatsApp</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-outline text-lg px-8 py-4 inline-flex items-center space-x-2 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      {contactMethod === 'email' ? (
                        <>
                          <Mail className="w-5 h-5" />
                          <span>Send Email</span>
                        </>
                      ) : (
                        <>
                          <FaWhatsapp className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>


      </div>
    </section>
  )
}
