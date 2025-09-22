'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// Social media icons
import { 
  Mail, 
  Instagram, 
  Youtube, 
  Github, 
  Send,
  MapPin
} from 'lucide-react'
import { FaXTwitter, FaWhatsapp, FaSnapchat, FaTiktok } from 'react-icons/fa6'

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:jerrylarubafestus@gmail.com',
    icon: Mail
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/iamlrba?igsh=MXcwcTF3b3R6ZG9yeQ%3D%3D&utm_source=qr',
    icon: Instagram
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@iamlrba?_t=ZM-8yRqigzltXK&_r=1',
    icon: FaTiktok
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/i/status/1952162823766708588',
    icon: FaXTwitter
  },
  {
    name: 'GitHub',
    href: 'https://github.com/IamLRBA',
    icon: Github
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/256755915549',
    icon: FaWhatsapp
  },
  {
    name: 'Telegram',
    href: 'https://t.me/+256755915549',
    icon: Send
  },
  {
    name: 'Snapchat',
    href: 'https://t.snapchat.com/pQuWROd2',
    icon: FaSnapchat
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@iamlrba?si=u4gjLZ3rlje5KKj7',
    icon: Youtube
  }
]

export default function Footer() {
  return (
    <footer className="footer relative bg-gradient-to-br from-primary-800 to-primary-900 text-white overflow-hidden">
      {/* Modern Linear Wave */}
      <div className="footer-wave"></div>
      
      <div className="footer-content container-custom relative z-10">
        {/* Social Media Links */}
        <div className="social-links">
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Icon size={24} />
              </motion.a>
            )
          })}
        </div>
        
        {/* Footer Divider */}
        <div className="footer-divider"></div>
        
        {/* Copyright */}
        <div className="copyright-section">
          <p className="copyright">
            © {new Date().getFullYear()} FusionᑕᖇᗩᖴT STUDIOS. All rights reserved.
          </p>
          <p className="copyright2">
            Designed by <a href="https://github.com/IamLRBA" target="_blank" rel="noopener noreferrer">ᒪᖇᗷᗩ</a>
          </p>
          <div className="legal-links">
            <Link href="/privacy-policy" className="legal-link">
              Privacy Policy
            </Link>
            <span className="separator">•</span>
            <Link href="/terms-conditions" className="legal-link">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          position: relative;
        }
        
        .footer-wave {
          position: absolute;
          top: -10px;
          left: 0;
          width: 100%;
          height: 20px;
          background: linear-gradient(135deg, 
            transparent 0%, 
            transparent 30%, 
            var(--color-primary-300) 30%, 
            var(--color-primary-300) 35%, 
            transparent 35%, 
            transparent 65%, 
            var(--color-primary-300) 65%, 
            var(--color-primary-300) 70%, 
            transparent 70%, 
            transparent 100%
          );
          background-size: 40px 20px;
        }
        
        .footer-content {
          padding: 3rem 0 2rem;
          text-align: center;
        }
        
        .social-links {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: white;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .social-link:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }
        
        .footer-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.3) 50%, 
            transparent 100%
          );
          margin: 2rem 0;
        }
        
        .copyright-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .copyright {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }
        
        .copyright2 {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }
        
        .copyright2 a {
          color: var(--color-primary-300);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .copyright2 a:hover {
          color: white;
        }
        
        .legal-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        
        .legal-link {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.75rem;
          transition: color 0.3s ease;
        }
        
        .legal-link:hover {
          color: white;
        }
        
        .separator {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.75rem;
        }
        
        @media (max-width: 640px) {
          .social-links {
            gap: 1rem;
          }
          
          .social-link {
            width: 2.5rem;
            height: 2.5rem;
          }
          
          .social-link svg {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </footer>
  )
}
