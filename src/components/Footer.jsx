// src/components/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiInstagram,
  FiSend,
  FiPhone,
  FiMapPin,
  FiMail,
  FiArrowUp,
  FiChevronRight,
  FiCoffee,
} from 'react-icons/fi';
import { FaFacebookF, FaYoutube } from 'react-icons/fa';
import { GiFlowerEmblem } from 'react-icons/gi';

const quickLinks = [
  { path: '/', label: 'Bosh sahifa' },
  { path: '/flowers', label: 'Gullar katalogi' },
  { path: '/about', label: 'Biz haqimizda' },
  { path: '/flowers', label: 'To‘y buketlari' },
  { path: '/flowers', label: 'Qahva & Gul to‘plamlari' },
];

const workingHours = [
  { day: 'Dushanba — Juma', time: '08:00 – 22:00' },
  { day: 'Shanba', time: '09:00 – 23:00' },
  { day: 'Yakshanba', time: '09:00 – 21:00' },
  { day: 'Tezkor yetkazish', time: '24/7 (oldindan buyurtma)' },
];

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: <FiInstagram />,
  },
  {
    name: 'Telegram',
    href: 'https://t.me',
    icon: <FiSend />,
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: <FaFacebookF />,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: <FaYoutube />,
  },
];

function Footer({ onShowToast }) {
  const [email, setEmail] = useState('');
  const [subscribedMsg, setSubscribedMsg] = useState('');

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setSubscribedMsg('Iltimos, to‘g‘ri elektron pochta manzilini kiriting.');
      return;
    }
    setSubscribedMsg('Rahmat! Maxsus chegirmalar va yangiliklarga obuna bo‘ldingiz.');
    setEmail('');
    if (onShowToast) {
      onShowToast('Yangiliklar va 10% chegirma promo-kodi yuborildi!');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* 1-ustun: Brend haqida va ijtimoiy tarmoqlar */}
          <div>
            <Link
              to="/"
              className="brand-logo footer-logo"
              aria-label="IbrohimFlowers bosh sahifa"
            >
              <span className="brand-logo-icon" aria-hidden="true">
                <GiFlowerEmblem />
              </span>
              <span className="brand-logo-text">
                <span className="brand-name">
                  Ibrohim<span>Flowers</span>
                </span>
                <span className="brand-tagline">Flower &amp; Coffee Studio</span>
              </span>
            </Link>

            <p className="footer-about-text">
              IbrohimFlowers — yangi uzilgan nafis gullar va xushbo‘y specialty
              qahva uyg‘unlashgan zamonaviy studiya. Har bir buket mehr, did va
              mualliflik yondashuvi bilan tayyorlanadi.
            </p>

            <div className="footer-socials" aria-label="Ijtimoiy tarmoqlar">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.name}
                  title={social.name}
                  whileHover={{ y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* 2-ustun: Tezkor havolalar */}
          <div>
            <h3 className="footer-col-title">Tezkor havolalar</h3>
            <ul className="footer-links-list">
              {quickLinks.map((link, idx) => (
                <li key={`${link.label}-${idx}`}>
                  <Link to={link.path} className="footer-link">
                    <FiChevronRight aria-hidden="true" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3-ustun: Ish vaqti */}
          <div>
            <h3 className="footer-col-title">Ish vaqti</h3>
            <ul className="footer-hours-list">
              {workingHours.map((item) => (
                <li key={item.day} className="footer-hours-item">
                  <span>{item.day}</span>
                  <span>{item.time}</span>
                </li>
              ))}
            </ul>
            <p
              style={{
                marginTop: '14px',
                fontSize: '0.84rem',
                color: 'rgba(255, 255, 255, 0.65)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <FiCoffee style={{ color: 'var(--color-gold-light)', flexShrink: 0 }} />
              <span>Qahva burchagimiz har kuni 08:00 dan ochiq</span>
            </p>
          </div>

          {/* 4-ustun: Aloqa va Newsletter */}
          <div>
            <h3 className="footer-col-title">Aloqa &amp; Obuna</h3>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <FiMapPin className="footer-contact-icon" aria-hidden="true" />
                <span>Toshkent sh., Amir Temur shoh ko‘chasi, 45-uy</span>
              </li>
              <li className="footer-contact-item">
                <FiPhone className="footer-contact-icon" aria-hidden="true" />
                <a href="tel:+998901234567">+998 (90) 123-45-67</a>
              </li>
              <li className="footer-contact-item">
                <FiMail className="footer-contact-icon" aria-hidden="true" />
                <a href="mailto:info@ibrohimflowers.uz">info@ibrohimflowers.uz</a>
              </li>
            </ul>

            <form
              className="footer-newsletter-form"
              onSubmit={handleNewsletterSubmit}
              noValidate
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Elektron pochta manzilingiz
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (subscribedMsg) setSubscribedMsg('');
                }}
                placeholder="Email manzilingiz..."
                className="footer-newsletter-input"
              />
              <button type="submit" className="footer-newsletter-btn">
                Obuna
              </button>
            </form>
            {subscribedMsg && (
              <p className="footer-newsletter-msg" role="status">
                {subscribedMsg}
              </p>
            )}
          </div>
        </div>

        {/* Eng pastki qator: Copyright va Tepaga qaytish tugmasi */}
        <div className="footer-bottom">
          <p>
            © {currentYear} IbrohimFlowers. Barcha huquqlar himoyalangan. Mehr bilan
            yaratilgan.
          </p>
          <motion.button
            type="button"
            className="scroll-top-btn"
            onClick={handleScrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Sahifa tepasiga qaytish"
          >
            <span>Tepaga qaytish</span>
            <FiArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;