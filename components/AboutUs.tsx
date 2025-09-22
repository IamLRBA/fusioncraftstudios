'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import MissionVisionCard from './MissionVisionCard'
import { 
  Building2, 
  Music, 
  Palette, 
  Code, 
  Shirt,
  Linkedin,
  Instagram,
  Send,
  Mail,
  ExternalLink,
  Eye,
  Zap,
  Heart
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const teamMembers = [
  {
    id: 1,
    name: "ᒍOᔕᕼᑌᗩ",
    position: "Creative Director",
    description: "A visionary artist with over 8 years of experience in digital design and creative direction.  Joshua leads our artistic vision and ensures every project meets the highest creative standards.",
    image: "/assets/images/team/joshua-nsereko.jpg",
    hoverImage: "/assets/images/team/joshua-nsereko-hover.jpg",
    social: {
      linkedin: "https://linkedin.com/in/sarahchen",
      instagram: "https://instagram.com/sarahchen",
      x: "https://x.com/sarahchen",
      whatsapp: "+1234567890",
      email: "sarah@fusioncraft.com"
    }
  },
  {
    id: 2,
    name: "ᑎOᗩᕼ",
    position: "Technical Lead",
    description: "A seasoned software engineer with expertise in full-stack development and emerging technologies. Noah ensures our digital solutions are cutting-edge and scalable.",
    image: "/assets/images/team/noah-tayebwa.png",
    hoverImage: "/assets/images/team/noah-tayebwa-hover.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/ndacyayisenga-droid/",
      instagram: "https://www.instagram.com/p/DCKOuHEChyu/?igsh=MW5uemhmaW15dTRtag==",
      x: "https://twitter.com/NdacyayisengaN1",
      whatsapp: "https://wa.me/256750571027",
      email: "mailto:ndacyayinoah@gmail.com"
    }
  },
  {
    id: 3,
    name: "ᗪIᑎGᗯᗩ",
    position: "Fashion Curator",
    description: "A trendsetter in the fashion industry with a keen eye for style and innovation. Dingwa curates our fashion portfolio and ensures every look tells a story.",
    image: "/assets/images/team/dingwa.jpg",
    hoverImage: "/assets/images/team/dingwa-hover.jpg",
    social: {
      linkedin: "https://linkedin.com/in/elenapetrov",
      instagram: "https://instagram.com/elenapetrov",
      x: "https://x.com/elenapetrov",
      whatsapp: "+1234567890",
      email: "elena@fusioncraft.com"
    }
  }
]



export default function AboutUs() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])

  return (
    <section ref={containerRef} className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-title"
          style={{ y: titleY, scale: titleScale }}
        >
          <h2 className="text-5xl md:text-5xl font-bold text-primary-800 mb-6">
          ᗩᗷOᑌT <span className="text-accent-600">Us</span>
          </h2>
          <p className="text-xl text-primary-700 max-w-3xl mx-auto">
            We are FusionCRAFT STUDIOS, a creative powerhouse where innovation meets craftsmanship. 
            Our mission is to materialize ideas through structural ingenuity across multiple creative dimensions.
          </p>
        </motion.div>

        {/* Company Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-primary-600 leading-relaxed mb-6">
              At FusionCRAFT STUDIOS, we believe that creativity knows no boundaries. Our multidisciplinary approach 
              brings together architecture, music, art, technology, and fashion to create experiences that inspire 
              and innovate. Every project we undertake is a testament to our commitment to excellence and our 
              passion for pushing creative boundaries.
            </p>
            <div className="inline-flex items-center space-x-2 bg-primary-100 px-6 py-3 rounded-full">
              <span className="text-primary-800 font-semibold">Our Catchphrase:</span>
              <span className="text-accent-600 font-bold italic">"Materializing ideas through structural ingenuity"</span>
            </div>
          </div>
        </motion.div>

        {/* CEO Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-20"
        >
          <h3 className="text-3xl font-bold text-primary-800 mb-8">ᗰEET Oᑌᖇ ᑕEO</h3>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              {/* CEO Card */}
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="w-32 h-32 mx-auto mb-6 relative overflow-hidden rounded-full border-4 border-white shadow-lg">
                  <img
                    src="/assets/images/team/lrba.jpg"
                    alt="LRBA - CEO"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <img
                    src="/assets/images/team/lrba-hover.jpg"
                    alt="LRBA - CEO"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                
                <h4 className="text-2xl font-bold text-primary-800 mb-2">ᒪᖇᗷᗩ</h4>
                <p className="text-lg text-primary-700 mb-6">CEO & Founder</p>
                
                <Link 
                  href="/ceo-profile"
                  className="btn btn-outline inline-flex items-center space-x-2"
                >
                  <span>View Profile</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Members */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-primary-800 mb-12 text-center">Oᑌᖇ TEᗩᗰ</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                className="group"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-primary-100 relative overflow-hidden">
                  {/* Member Image */}
                  <div className="w-32 h-32 mx-auto mb-6 relative overflow-hidden rounded-full border-4 border-primary-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <img
                      src={member.hoverImage}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>
                  
                  {/* Member Info - Always Visible */}
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold text-primary-800 mb-2">{member.name}</h4>
                    <p className="text-primary-600 font-medium">{member.position}</p>
                  </div>
                  
                  {/* Description - Hidden by default, shown on hover */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredMember === member.id ? 1 : 0,
                      height: hoveredMember === member.id ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-primary-600 text-sm leading-relaxed mb-4">
                      {member.description}
                    </p>
                  </motion.div>
                  
                  {/* Social Links - Hidden by default, shown on hover */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredMember === member.id ? 1 : 0,
                      height: hoveredMember === member.id ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="overflow-hidden"
                  >
                    <div className="flex justify-center space-x-3 pt-4 border-t border-primary-100">
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors duration-200"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors duration-200"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a
                        href={member.social.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors duration-200"
                      >
                        <Send className="w-4 h-4" />
                      </a>
                                             <a
                         href={`https://wa.me/${member.social.whatsapp}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors duration-200"
                       >
                         <FaWhatsapp className="w-4 h-4" />
                       </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors duration-200"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                  
                  {/* Hover Indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-primary-800 mb-12 text-center">Oᑌᖇ ᐯᗩᒪᑌEᔕ
          </h3>
          
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            {/* Value Item 1 */}
                         <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.1 }}
               className="flex flex-row items-center space-x-4 md:space-x-12"
             >
               <div className="flex-shrink-0 bg-gradient-to-br from-primary-800/30 to-primary-600/30 rounded-2xl border border-primary-500/30 overflow-hidden shadow-2xl p-4 md:p-8">
                 <img 
                   src="/assets/images/sections/home/values-1.jpg" 
                   alt="Innovation" 
                   className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-xl"
                 />
               </div>
               <div className="flex flex-col text-left">
                 <div className="text-4xl md:text-6xl font-bold text-primary-400 mb-2 md:mb-4">01</div>
                 <h4 className="text-xl md:text-3xl font-bold text-primary-800 mb-2">Innovation</h4>
                 <p className="text-primary-600 text-sm md:text-lg max-w-xs md:max-w-md">
                   Pushing boundaries in every creative field, constantly exploring new possibilities and approaches.
                 </p>
               </div>
             </motion.div>
            
            {/* Value Item 2 */}
                         <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="flex flex-row items-center space-x-4 md:space-x-12"
             >
               <div className="flex-shrink-0 bg-gradient-to-br from-primary-600/30 to-primary-400/30 rounded-2xl border border-primary-400/30 overflow-hidden shadow-2xl p-4 md:p-8">
                 <img 
                   src="/assets/images/sections/home/values-2.jpg" 
                   alt="Passion" 
                   className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-xl"
                 />
               </div>
               <div className="flex flex-col text-left">
                 <div className="text-4xl md:text-6xl font-bold text-primary-300 mb-2 md:mb-4">02</div>
                 <h4 className="text-xl md:text-3xl font-bold text-primary-800 mb-2">Passion</h4>
                 <p className="text-primary-600 text-sm md:text-lg max-w-xs md:max-w-md">
                   Infusing every project with genuine enthusiasm and dedication to creative excellence.
                 </p>
               </div>
             </motion.div>
            
            {/* Value Item 3 */}
                         <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="flex flex-row items-center space-x-4 md:space-x-12"
             >
               <div className="flex-shrink-0 bg-gradient-to-br from-primary-400/30 to-primary-200/30 rounded-2xl border border-primary-300/30 overflow-hidden shadow-2xl p-4 md:p-8">
                 <img 
                   src="/assets/images/sections/home/values-3.jpg" 
                   alt="Excellence" 
                   className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-xl"
                 />
               </div>
               <div className="flex flex-col text-left">
                 <div className="text-4xl md:text-6xl font-bold text-primary-200 mb-2 md:mb-4">03</div>
                 <h4 className="text-xl md:text-3xl font-bold text-primary-800 mb-2">Excellence</h4>
                 <p className="text-primary-600 text-sm md:text-lg max-w-xs md:max-w-md">
                   Maintaining the highest standards of quality in every aspect of our creative work.
                 </p>
               </div>
             </motion.div>
            
            {/* Value Item 4 */}
                         <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="flex flex-row items-center space-x-4 md:space-x-12"
             >
               <div className="flex-shrink-0 bg-gradient-to-br from-primary-200/30 to-primary-100/30 rounded-2xl border border-primary-200/30 overflow-hidden shadow-2xl p-4 md:p-8">
                 <img 
                   src="/assets/images/sections/home/values-4.jpg" 
                   alt="Collaboration" 
                   className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-xl"
                 />
               </div>
               <div className="flex flex-col text-left">
                 <div className="text-4xl md:text-6xl font-bold text-primary-200 mb-2 md:mb-4">04</div>
                 <h4 className="text-xl md:text-3xl font-bold text-primary-800 mb-2">Collaboration</h4>
                 <p className="text-primary-600 text-sm md:text-lg max-w-xs md:max-w-md">
                   Working together to achieve extraordinary results through teamwork and shared vision.
                 </p>
               </div>
             </motion.div>
          </div>
        </motion.div>

        {/* Missions Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-primary-800 mb-12 text-center">Oᑌᖇ ᗰIᔕᔕIOᑎᔕ</h3>
          
          <div className="space-y-16 flex flex-col items-center">
            {/* Mission Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-800/30 to-primary-600/30 rounded-2xl border border-primary-500/30 overflow-hidden shadow-2xl p-8">
                <img 
                  src="/assets/images/sections/home/missions-1.jpg" 
                  alt="Vision" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="text-6xl font-bold text-primary-400 mb-4">01</div>
                <h4 className="text-3xl font-bold text-primary-800 mb-2">Leadership</h4>
                <p className="text-primary-600 text-lg max-w-md">
                  To become the leading creative studio that transforms ideas into extraordinary experiences across all dimensions of human expression.
                </p>
              </div>
            </motion.div>
            
            {/* Mission Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-600/30 to-primary-400/30 rounded-2xl border border-primary-400/30 overflow-hidden shadow-2xl p-8">
                <img 
                  src="/assets/images/sections/home/missions-2.jpg" 
                  alt="Innovation" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="text-6xl font-bold text-primary-300 mb-4">02</div>
                <h4 className="text-3xl font-bold text-primary-800 mb-2">Innovation</h4>
                <p className="text-primary-600 text-lg max-w-md">
                  To push the boundaries of creativity and technology, creating solutions that inspire and amaze.
                </p>
              </div>
            </motion.div>
            
            {/* Mission Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-400/30 to-primary-200/30 rounded-2xl border border-primary-300/30 overflow-hidden shadow-2xl p-8">
                <img 
                  src="/assets/images/sections/home/missions-3.jpg" 
                  alt="Impact" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="text-6xl font-bold text-primary-200 mb-4">03</div>
                <h4 className="text-3xl font-bold text-primary-800 mb-2">Impact</h4>
                <p className="text-primary-600 text-lg max-w-md">
                  To make a meaningful difference in people's lives through creative excellence and innovative design.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission & Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-primary-800 mb-12 text-center">ᗰIᔕᔕIOᑎ & ᐯIᔕIOᑎ</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { 
                icon: Heart, 
                title: "Mission Statement", 
                description: "To materialize ideas through structural ingenuity across multiple creative dimensions, delivering exceptional experiences that inspire and transform. We commit to pushing boundaries, embracing innovation, and crafting solutions that exceed expectations while maintaining the highest standards of quality and creativity." 
              },
              { 
                icon: Eye, 
                title: "Vision Statement", 
                description: "To become the leading creative studio that transforms ideas into extraordinary experiences across all dimensions of human expression. We envision a future where our innovative approach to creativity and technology sets new industry standards and inspires the next generation of creative professionals." 
              }
            ].map((item, index) => (
              <MissionVisionCard key={index} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
