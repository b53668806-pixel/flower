// src/pages/About.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHeart,
  FiAward,
  FiCoffee,
  FiCheckCircle,
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiArrowRight,
  FiUsers,
  FiFeather,
  FiShield,
} from 'react-icons/fi';
import { GiFlowerEmblem } from 'react-icons/gi';
import './About.css';

/* ==========================================================================
   MISSIYA VA QADRIYATLAR KARTALARI
   ========================================================================== */
const VALUES_LIST = [
  {
    icon: <FiHeart />,
    title: 'Samimiylik va Mehr',
    description:
      'Har bir buket shunchaki gullar jamlanmasi emas, balki inson qalbidagi eng nozik tuyg‘ularni yetkazuvchi maktubdir.',
  },
  {
    icon: <FiFeather />,
    title: 'Estetik Mukammallik',
    description:
      'Ranglar uyg‘unligi, qadoqlash materiallari va oltin aksentlargacha bo‘lgan har bir detal yuksak did bilan tanlanadi.',
  },
  {
    icon: <FiCoffee />,
    title: 'Iliq Qahva Muhiti',
    description:
      'Studiyamizga tashrif buyurgan har bir mehmon yangi qovurilgan arabika qahvasi ifori va gullar tarovati og‘ushida dam oladi.',
  },
  {
    icon: <FiShield />,
    title: 'Halollik va Sifat Kafolati',
    description:
      'Biz faqat shu tong uzilgan, sertifikatlangan Gollandiya va mahalliy issiqxona gullaridan foydalanamiz.',
  },
];

/* ==========================================================================
   JAMOA A'ZOLARI (6 TA MUTAXASSIS)
   ========================================================================== */
const TEAM_MEMBERS = [
  {
    id: 'team-1',
    name: 'Ibrohim Karimov',
    role: 'Asoschi & Bosh Art-Direktor',
    experience: '12 yillik tajriba',
    bio: 'Yevropa floristika maktabi bitiruvchisi. Mualliflik kompozitsiyalari va brend estetikasi muallifi.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'team-2',
    name: 'Kamola Rustamova',
    role: 'Katta Florist & To‘y Dizayneri',
    experience: '9 yillik tajriba',
    bio: 'Kelinlik buketlari va hashamatli marosim zallarini jonli gullar bilan bezash bo‘yicha yetakchi mutaxassis.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'team-3',
    name: 'Azizbek Tursunov',
    role: 'Bosh Barista & Qahva Somelyesi',
    experience: '7 yillik tajriba',
    bio: 'IbrohimFlowers qahva burchagida specialty arabika navlari va mualliflik ichimliklari yaratuvchisi.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'team-4',
    name: 'Sevara Xolmatova',
    role: 'Botanik & Xona O‘simliklari Mutaxassisi',
    experience: '8 yillik tajriba',
    bio: 'Noyob ekzotik o‘simliklar parvarishi va interyer fitodizayni bo‘yicha maslahatchi.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'team-5',
    name: 'Jamshid Alimov',
    role: 'Logistika va Tezkor Yetkazish Rahbari',
    experience: '6 yillik tajriba',
    bio: 'Har bir guldasta 60 daqiqa ichida maxsus harorat sharoitida manzilga yetib borishini nazorat qiladi.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'team-6',
    name: 'Dilnoza Mirzayeva',
    role: 'Mijozlar Bilan Ishlash Menejeri',
    experience: '5 yillik tajriba',
    bio: 'Individual buyurtmalar, korporativ hamkorlik va maxsus tabriknomalar dizaynini muvofiqlashtiradi.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
  },
];

/* ==========================================================================
   YUTUQLAR TIMELINE (2016 - 2026)
   ========================================================================== */
const MILESTONES_LIST = [
  {
    year: '2016',
    title: 'Kichik ijodiy ustaxona sifatida ilk qadam',
    description:
      'Toshkent markazida atigi 3 nafar florist bilan ilk guldastalarimizni yig‘ishni boshladik.',
  },
  {
    year: '2019',
    title: 'Gollandiya va Ekvador bilan to‘g‘ridan-to‘g‘ri hamkorlik',
    description:
      'Eng sara atirgul va pion navlarini vositachilarsiz, to‘g‘ridan-to‘g‘ri havo yo‘llari orqali keltirish yo‘lga qo‘yildi.',
  },
  {
    year: '2022',
    title: 'Coffee & Flower Studio yangi formati',
    description:
      'Gullar do‘koni va specialty qahvaxona birlashgan Markaziy Osiyodagi ilk konseptual makon ochildi.',
  },
  {
    year: '2026',
    title: '5,200+ doimiy mijoz va onlayn ekotizim',
    description:
      'Bugun IbrohimFlowers Toshkentning eng ishonchli premium floristika studiyalaridan biri sifatida faoliyat yuritmoqda.',
  },
];

/* ==========================================================================
   SIFAT KAFOLATI BOSQICHLARI
   ========================================================================== */
const QUALITY_GUARANTEES = [
  {
    step: '1',
    title: 'Tonggi saralash nazorati',
    description:
      'Har kuni soat 06:30 da kelgan har bir gul poyasi va bargi floristlarimiz tomonidan birma-bir tekshiriladi.',
  },
  {
    step: '2',
    title: 'Maxsus iqlim kamerasi',
    description:
      'Gullar +4°C harorat va 85% namlik saqlanadigan zamonaviy vitrinalarda o‘z tabiiy tarovatini yo‘qotmaydi.',
  },
  {
    step: '3',
    title: 'Akva-kapsula va ozuqa paketi',
    description:
      'Yetkazib berish vaqtida buket suvsiz qolmasligi uchun maxsus namlantiruvchi kapsula va Chrysal ozuqasi qo‘shiladi.',
  },
];

/* ==========================================================================
   ANIMATSIYA VARIANTLARI
   ========================================================================== */
const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function About({ onShowToast }) {
  // Kontakt formasi holati (controlled inputs)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    occasion: 'Shaxsiy buket buyurtmasi',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Iltimos, ismingizni kamida 2 ta harf bilan kiriting.';
    }
    const cleanPhone = formData.phone.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      errors.phone = 'Iltimos, to‘g‘ri telefon raqamingizni kiriting.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Xabaringiz kamida 10 ta belgidan iborat bo‘lishi kerak.';
    }
    return errors;
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    setIsSubmitted(true);
    setFormData({
      fullName: '',
      phone: '',
      occasion: 'Shaxsiy buket buyurtmasi',
      message: '',
    });

    if (onShowToast) {
      onShowToast("Murojaatingiz yuborildi! Tez orada siz bilan bog'lanamiz.");
    }
  };

  return (
    <div className="about-page">
      {/* ====================================================================
          1. ABOUT HERO SEKSIYASI
          ==================================================================== */}
      <section className="about-hero">
        <div className="container about-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <GiFlowerEmblem /> Bizning Falsafamiz
            </span>
            <h1 className="about-hero-title">
              Gullar va qahva uyg‘unligida yaratilgan <span>nafis</span> makon
            </h1>
            <p className="about-hero-subtitle">
              2016-yildan buyon IbrohimFlowers Toshkent aholisiga eng sara
              guldastalar, iliq mehmondo‘stlik va unutilmas his-tuyg‘ularni
              ulashib kelmoqda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          2. HIKOYAMIZ (RASM + MATN)
          ==================================================================== */}
      <section className="section-padding">
        <div className="container about-story-grid">
          <motion.div
            className="about-story-media"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
          >
            <div className="about-story-main-img">
              <img
                src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=85"
                alt="IbrohimFlowers floristika studiyasi ichki ko'rinishi"
                loading="lazy"
              />
            </div>
            <div className="about-story-badge glass-card">
              <FiAward />
              <div>
                <strong>10+ Yillik Tajriba</strong>
                <span>Toshkentning №1 Flower &amp; Coffee studiyasi</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-story-content"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
          >
            <span className="section-badge">Bizning hikoyamiz</span>
            <h2 className="section-title">
              Kichik orzudan boshlangan <span>katta</span> ijodiy studiya
            </h2>
            <p>
              IbrohimFlowers g‘oyasi oddiy, ammo samimiy istakdan tug‘ilgan:
              har bir inson yaqinlariga gul tanlayotganda shoshilmasdan, iliq
              qahva ifori ostida haqiqiy san’at asarini yaratsin.
            </p>
            <p>
              Bugun studiyamizda Gollandiya, Ekvador va mahalliy bog‘lardan
              keltirilgan 140 dan ortiq gul navlari bilan bir qatorda, maxsus
              qovurilgan arabika qahva burchagimiz ham faoliyat yuritadi. Har bir
              buyurtma biz uchun alohida hikoya va mas’uliyatdir.
            </p>

            <div className="about-story-highlights">
              <div className="story-highlight-item">
                <FiCheckCircle />
                <span>Har kuni yangilanadigan jonli gullar</span>
              </div>
              <div className="story-highlight-item">
                <FiCheckCircle />
                <span>Individual to‘y va tadbir bezaklari</span>
              </div>
              <div className="story-highlight-item">
                <FiCheckCircle />
                <span>Ekologik toza premium qadoqlash</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          3. MISSIYA VA QADRIYATLAR KARTALARI
          ==================================================================== */}
      <section className="section-padding about-values-section">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="section-badge">Qadriyatlarimiz</span>
            <h2 className="section-title">
              Bizni har kuni ilhomlantiruvchi <span>tamoyillar</span>
            </h2>
          </motion.div>

          <motion.div
            className="about-values-grid"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {VALUES_LIST.map((val) => (
              <motion.div
                key={val.title}
                variants={fadeUpVariants}
                whileHover={{ y: -6 }}
                className="about-value-card"
              >
                <div className="about-value-icon" aria-hidden="true">
                  {val.icon}
                </div>
                <h3>{val.title}</h3>
                <p>{val.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          4. JAMOA A'ZOLARI (6 KISHI)
          ==================================================================== */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="section-badge">
              <FiUsers /> Bizning jamoa
            </span>
            <h2 className="section-title">
              Go‘zallik yaratuvchi <span>mohir</span> ustalarimiz
            </h2>
            <p className="section-subtitle">
              Har bir guldasta va har bir finjon qahva ortida o‘z kasbini
              chin dildan sevuvchi mutaxassislar mehnati turadi.
            </p>
          </motion.div>

          <motion.div
            className="about-team-grid"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {TEAM_MEMBERS.map((member) => (
              <motion.article
                key={member.id}
                variants={fadeUpVariants}
                whileHover={{ y: -6 }}
                className="team-member-card"
              >
                <div className="team-member-photo">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                  />
                  <span className="team-exp-badge">{member.experience}</span>
                </div>
                <div className="team-member-info">
                  <h3>{member.name}</h3>
                  <span className="team-member-role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          5. YUTUQLAR TIMELINE & SIFAT KAFOLATI
          ==================================================================== */}
      <section className="section-padding about-timeline-section">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="section-badge">Rivojlanish yo‘li</span>
            <h2 className="section-title">
              Muhim <span>yutuqlar</span> va bosqichlar
            </h2>
          </motion.div>

          <motion.div
            className="milestones-grid"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {MILESTONES_LIST.map((item) => (
              <motion.div
                key={item.year}
                variants={fadeUpVariants}
                className="milestone-card glass-card"
              >
                <span className="milestone-year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Sifat kafolati jarayoni */}
          <div className="quality-box">
            <div className="quality-box-header">
              <span className="section-badge">Sifat nazorati</span>
              <h2>7 kunlik tarovat kafolati qanday ta&apos;minlanadi?</h2>
            </div>

            <div className="quality-steps-grid">
              {QUALITY_GUARANTEES.map((q) => (
                <div key={q.step} className="quality-step-card">
                  <span className="quality-step-num">{q.step}</span>
                  <div>
                    <h3>{q.title}</h3>
                    <p>{q.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. KONTAKT BLOKI + INTERAKTIV FORMA (Controlled inputs + validatsiya)
          ==================================================================== */}
      <section className="section-padding" id="contact-section">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="section-badge">Aloqa</span>
            <h2 className="section-title">
              Studiyamizga tashrif buyuring yoki <span>xabar</span> qoldiring
            </h2>
            <p className="section-subtitle">
              Individual buket, to‘y floristikasi yoki korporativ hamkorlik
              bo‘yicha barcha savollaringizga mamnuniyat bilan javob beramiz.
            </p>
          </motion.div>

          <div className="about-contact-grid">
            {/* Chap ustun: Manzil va Kontakt ma'lumotlari */}
            <div className="contact-info-card">
              <h3>IbrohimFlowers Studiyasi</h3>
              <p className="contact-info-desc">
                Har kuni sizni yangi gullar ifori va issiq qahva bilan kutib
                olamiz. Studiya oldida qulay avtoturargoh mavjud.
              </p>

              <ul className="contact-details-list">
                <li>
                  <span className="contact-detail-icon">
                    <FiMapPin />
                  </span>
                  <div>
                    <strong>Manzilimiz</strong>
                    <span>Toshkent sh., Amir Temur shoh ko‘chasi, 45-uy</span>
                  </div>
                </li>
                <li>
                  <span className="contact-detail-icon">
                    <FiPhone />
                  </span>
                  <div>
                    <strong>Telefon raqam</strong>
                    <a href="tel:+998901234567">+998 (90) 123-45-67</a>
                  </div>
                </li>
                <li>
                  <span className="contact-detail-icon">
                    <FiMail />
                  </span>
                  <div>
                    <strong>Elektron pochta</strong>
                    <a href="mailto:info@ibrohimflowers.uz">
                      info@ibrohimflowers.uz
                    </a>
                  </div>
                </li>
                <li>
                  <span className="contact-detail-icon">
                    <FiClock />
                  </span>
                  <div>
                    <strong>Ish tartibi</strong>
                    <span>Har kuni: 08:00 dan 22:00 gacha</span>
                  </div>
                </li>
              </ul>

              <div className="contact-studio-preview">
                <img
                  src="https://images.unsplash.com/photo-1444930694458-01babf71870c?auto=format&fit=crop&w=800&q=80"
                  alt="IbrohimFlowers do'kon vitrinasi"
                  loading="lazy"
                />
              </div>
            </div>

            {/* O'ng ustun: Kontakt formasi */}
            <div className="contact-form-card glass-card">
              <h3>Onlayn murojaat qoldirish</h3>
              <p className="contact-form-sub">
                Ma&apos;lumotlaringizni qoldiring — floristimiz 15 daqiqa ichida
                siz bilan bog&apos;lanadi.
              </p>

              <form onSubmit={handleContactSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="contact-fullName">Ismingiz *</label>
                  <input
                    id="contact-fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Masalan: Jasur Abdullayev"
                    className={`form-control ${
                      formErrors.fullName ? 'has-error' : ''
                    }`}
                  />
                  {formErrors.fullName && (
                    <span className="form-error-text" role="alert">
                      {formErrors.fullName}
                    </span>
                  )}
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label htmlFor="contact-phone">Telefon raqamingiz *</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+998 90 123 45 67"
                      className={`form-control ${
                        formErrors.phone ? 'has-error' : ''
                      }`}
                    />
                    {formErrors.phone && (
                      <span className="form-error-text" role="alert">
                        {formErrors.phone}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-occasion">Murojaat mavzusi</label>
                    <select
                      id="contact-occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="Shaxsiy buket buyurtmasi">
                        Shaxsiy buket buyurtmasi
                      </option>
                      <option value="To'y va marosim floristikasi">
                        To&apos;y va marosim floristikasi
                      </option>
                      <option value="Korporativ sovg'alar">
                        Korporativ sovg&apos;alar
                      </option>
                      <option value="Qahva va gul to'plami">
                        Qahva va gul to&apos;plami
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Xabaringiz *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Qanday gullar yoki kompozitsiya haqida o'ylayapsiz? Batafsil yozing..."
                    className={`form-control ${
                      formErrors.message ? 'has-error' : ''
                    }`}
                  />
                  {formErrors.message && (
                    <span className="form-error-text" role="alert">
                      {formErrors.message}
                    </span>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Xabarni yuborish <FiSend />
                </motion.button>

                {isSubmitted && (
                  <div className="form-success-banner" role="status">
                    <FiCheckCircle />
                    <span>
                      Xabaringiz muvaffaqiyatli yuborildi! Mutaxassisimiz tez
                      orada bog&apos;lanadi.
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. YAKUNIY CTA SEKSIYASI
          ==================================================================== */}
      <section className="about-final-cta">
        <div className="container">
          <div className="about-cta-card">
            <h2>Yaqinlaringizga bugun quvonch ulashishga tayyormisiz?</h2>
            <p>
              Katalogimizdagi 140 dan ortiq nafis buket va qahva-gul
              to‘plamlaridan birini tanlang.
            </p>
            <Link to="/flowers" className="btn btn-gold">
              Katalogni ko‘rish <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;