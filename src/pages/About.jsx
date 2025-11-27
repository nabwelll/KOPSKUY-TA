import { FiMapPin, FiPhone, FiMail, FiInstagram, FiClock, FiCoffee, FiHeart, FiUser } from 'react-icons/fi'
import Header from '../components/Header'
import './About.css'

const About = () => {
  return (
    <>
      <Header />
      <main className="about-page">
        {/* Profile Header */}
        <section className="about-hero">
          <div className="about-logo">
            <FiCoffee />
          </div>
          <h1 className="about-title">KOPSKUY!</h1>
          <p className="about-tagline">Kopi Enak, Harga Merakyat</p>
        </section>

        {/* About Description */}
        <section className="about-section">
          <h2 className="about-section-title">
            <FiHeart /> Tentang Kami
          </h2>
          <p className="about-description">
            KOPSKUY! adalah kedai kopi yang berdiri sejak 2023 dengan misi menghadirkan 
            kopi berkualitas tinggi dengan harga yang terjangkau untuk semua kalangan. 
            Kami percaya bahwa kenikmatan secangkir kopi yang baik seharusnya bisa 
            dinikmati oleh semua orang.
          </p>
          <p className="about-description">
            Biji kopi kami dipilih langsung dari petani lokal terbaik di Indonesia, 
            diroasting dengan teknik yang tepat untuk menghasilkan cita rasa yang 
            kaya dan aromatis. Setiap cangkir adalah dedikasi kami untuk memberikan 
            pengalaman ngopi yang memorable.
          </p>
        </section>

        {/* Founder Profile */}
        <section className="about-section">
          <h2 className="about-section-title">
            <FiUser /> Tim Pendiri
          </h2>
          <div className="founder-card">
            <div className="founder-avatar">
              <span className="founder-initials">NBA</span>
            </div>
            <div className="founder-info">
              <h3 className="founder-name">Nabil Bintang Ardiansyah Purwanto</h3>
              <span className="founder-label">Pendiri KOPSKUY</span>
              <div className="founder-details">
                <div className="founder-detail-item">
                  <span className="founder-detail-label">NIM</span>
                  <span className="founder-detail-value">21120123140121</span>
                </div>
                <div className="founder-detail-item">
                  <span className="founder-detail-label">Kelompok</span>
                  <span className="founder-detail-value">01 PrakPPB</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Operating Hours */}
        <section className="about-section">
          <h2 className="about-section-title">
            <FiClock /> Jam Operasional
          </h2>
          <div className="hours-list">
            <div className="hours-item">
              <span className="hours-day">Senin - Jumat</span>
              <span className="hours-time">07:00 - 22:00</span>
            </div>
            <div className="hours-item">
              <span className="hours-day">Sabtu - Minggu</span>
              <span className="hours-time">08:00 - 23:00</span>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="about-section">
          <h2 className="about-section-title">
            <FiMapPin /> Hubungi Kami
          </h2>
          <div className="contact-list">
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="contact-item">
              <div className="contact-icon">
                <FiMapPin />
              </div>
              <div className="contact-info">
                <span className="contact-label">Alamat</span>
                <span className="contact-value">Jl. Kopi Nikmat No. 123, Jakarta Selatan</span>
              </div>
            </a>
            <a href="tel:+6281234567890" className="contact-item">
              <div className="contact-icon">
                <FiPhone />
              </div>
              <div className="contact-info">
                <span className="contact-label">Telepon</span>
                <span className="contact-value">+62 812-3456-7890</span>
              </div>
            </a>
            <a href="mailto:hello@kopskuy.id" className="contact-item">
              <div className="contact-icon">
                <FiMail />
              </div>
              <div className="contact-info">
                <span className="contact-label">Email</span>
                <span className="contact-value">hello@kopskuy.id</span>
              </div>
            </a>
            <a href="https://instagram.com/kopskuy" target="_blank" rel="noopener noreferrer" className="contact-item">
              <div className="contact-icon">
                <FiInstagram />
              </div>
              <div className="contact-info">
                <span className="contact-label">Instagram</span>
                <span className="contact-value">@kopskuy</span>
              </div>
            </a>
          </div>
        </section>

        {/* App Info */}
        <section className="about-section app-info">
          <p className="app-version">KOPSKUY! App v1.0.0</p>
          <p className="app-copyright">© 2025 KOPSKUY! All rights reserved.</p>
          <p className="app-developer">Tugas Akhir Praktikum PPB 2025</p>
        </section>
      </main>
    </>
  )
}

export default About
