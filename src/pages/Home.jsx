// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import {
  FiArrowRight,
  FiTruck,
  FiAward,
  FiCoffee,
  FiHeart,
  FiShield,
  FiClock,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiMinus,
  FiInstagram,
  FiStar,
  FiGift,
  FiSun,
} from 'react-icons/fi';
import { GiFlowerEmblem } from 'react-icons/gi';
import FlowerCard from '../components/FlowerCard';
import './Home.css';

/* ==========================================================================
   MASHHUR GULLAR MASSIVI (Home.jsx ichida const)
   ========================================================================== */
const POPULAR_FLOWERS = [
  {
    id: 'home-fl-1',
    name: 'Qirolicha Pushti Pion Buketi',
    category: 'Buketlar',
    price: 420000,
    oldPrice: 490000,
    discount: 14,
    rating: 5.0,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'home-fl-2',
    name: 'Baxmal Qizil Atirgullar (25 dona)',
    category: 'Atirgullar',
    price: 550000,
    rating: 4.9,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'home-fl-3',
    name: 'Oq Orxideya & Espresso To‘plami',
    category: "Sovg'a to'plamlari",
    price: 380000,
    oldPrice: 430000,
    discount: 12,
    rating: 4.9,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'home-fl-4',
    name: 'Nafis Kelinlik Buketi "Marvarid"',
    category: "To'ylar uchun",
    price: 680000,
    rating: 5.0,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'home-fl-5',
    name: 'Monstera Deliciosa Keramik Tuvakda',
    category: "O'simliklar",
    price: 310000,
    rating: 4.8,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'home-fl-6',
    name: 'Bahoriy Lola & Evkalipt Kompozitsiyasi',
    category: 'Buketlar',
    price: 295000,
    oldPrice: 340000,
    discount: 13,
    rating: 4.9,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'home-fl-7',
    name: 'Oltin Qutidagi Ekvador Atirgullari',
    category: "Sovg'a to'plamlari",
    price: 620000,
    rating: 5.0,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'home-fl-8',
    name: 'Zaytun Daraxti Mini Bonsai',
    category: "O'simliklar",
    price: 440000,
    rating: 4.8,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=800&q=80',
  },
];

/* ==========================================================================
   KATEGORIYALAR MA'LUMOTLARI
   ========================================================================== */
const CATEGORIES_LIST = [
  {
    id: 'cat-1',
    title: 'Buketlar',
    count: '45+ mualliflik buket',
    description: 'Har bir fasl ruhini aks ettiruvchi nafis va uyg‘un guldastalar.',
    icon: <GiFlowerEmblem />,
    image:
      'https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'cat-2',
    title: 'Atirgullar',
    count: '30+ premium nav',
    description: 'Gollandiya va Ekvadordan keltirilgan xushbo‘y va uzoq turuvchi atirgullar.',
    icon: <FiHeart />,
    image:
      'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'cat-3',
    title: "O'simliklar",
    count: '28+ xona o‘simligi',
    description: 'Uy va ofis interyeriga tirik nafas bag‘ishlovchi dekorativ o‘simliklar.',
    icon: <FiSun />,
    image:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'cat-4',
    title: "To'ylar uchun",
    count: '20+ eksklyuziv dizayn',
    description: 'Kelinlik buketi, zal bezaklari va unutilmas marosim floristikasi.',
    icon: <FiStar />,
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'cat-5',
    title: "Sovg'a to'plamlari",
    count: '25+ qahva & gul box',
    description: 'Mualliflik buketi, specialty qahva donalari va shokoladli sovg‘a qutilari.',
    icon: <FiGift />,
    image:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80',
  },
];

/* ==========================================================================
   NEGA AYNAN BIZ (6 TA XUSUSIYAT)
   ========================================================================== */
const FEATURES_LIST = [
  {
    icon: <FiSun />,
    title: 'Har kuni yangi uzilgan gullar',
    description:
      'Gullarimiz har tong Gollandiya va mahalliy issiqxonalardan to‘g‘ridan-to‘g‘ri studiyamizga keltiriladi.',
  },
  {
    icon: <FiTruck />,
    title: '60 daqiqada tezkor yetkazish',
    description:
      'Toshkent shahri bo‘ylab maxsus harorat nazoratiga ega kuryerlarimiz buketni bekamu-ko‘st yetkazadi.',
  },
  {
    icon: <FiCoffee />,
    title: 'Coffee & Flower konsepsiyasi',
    description:
      'Buket tanlash jarayonida studiyamizda yangi qovurilgan arabika qahvasidan bahramand bo‘ling.',
  },
  {
    icon: <FiAward />,
    title: '10+ yillik tajribali floristlar',
    description:
      'Xalqaro ko‘rgazmalar ishtirokchisi bo‘lgan floristlarimiz har bir buyurtmani san’at asaridek yaratadi.',
  },
  {
    icon: <FiShield />,
    title: '7 kunlik tarovat kafolati',
    description:
      'Har bir buket bilan maxsus ozuqa eritmasi va parvarish qo‘llanmasi bepul taqdim etiladi.',
  },
  {
    icon: <FiClock />,
    title: 'Yetkazishdan oldin foto-hisobot',
    description:
      'Tayyor bo‘lgan guldasta rasmini kuryer yo‘lga chiqishidan avval Telegram orqali sizga yuboramiz.',
  },
];

/* ==========================================================================
   BUYURTMA BERISH BOSQICHLARI (4 QADAMLI TIMELINE)
   ========================================================================== */
const ORDER_STEPS = [
  {
    step: '01',
    title: 'Buket yoki to‘plamni tanlang',
    description:
      'Katalogdan tayyor guldastani tanlang yoki floristimizga o‘z g‘oyangizni ayting.',
  },
  {
    step: '02',
    title: 'Shaxsiy tabriknoma qo‘shing',
    description:
      'Murojaat matnini yozing — biz uni oltin muhrli dizaynerlik otkritkasiga tushiramiz.',
  },
  {
    step: '03',
    title: 'Foto-tasdiqlashni oling',
    description:
      'Florist buketni yig‘ib bo‘lgach, yakuniy ko‘rinishini sizga suratga olib yuboradi.',
  },
  {
    step: '04',
    title: 'Tezkor va ehtiyotkor yetkazish',
    description:
      'Belgilangan vaqtda maxsus suvli kapsulada yaqiningiz qo‘liga topshiramiz.',
  },
];

/* ==========================================================================
   MIJOZLAR FIKRLARI (CAROUSEL)
   ========================================================================== */
const TESTIMONIALS_LIST = [
  {
    id: 'rev-1',
    name: 'Madina Karimova',
    role: 'Doimiy mijoz',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    text: 'Onamning tug‘ilgan kuniga "Qirolicha Pushti Pion" buketini buyurtma qildim. Gullar shu qadar yangi va xushbo‘y ediki, ikki haftagacha so‘limay turdi. Otkritka dizayni ham juda nafis!',
  },
  {
    id: 'rev-2',
    name: 'Sardor Rahimov',
    role: 'Tadbirkor',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    text: 'IbrohimFlowers studiyasining qahva va gul to‘plamlari bizning korporativ sovg‘alarimiz uchun eng zo‘r yechim bo‘ldi. Yetkazib berish aniqligi va servis darajasi yuqori.',
  },
  {
    id: 'rev-3',
    name: 'Nilufar Azimova',
    role: 'Kelinlik buketi buyurtmachisi',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    text: 'To‘yim uchun kelinlik buketi va zal bezaklarini ishonib topshirdim. Har bir detal ko‘ylagim rangiga mos tushdi. Barcha mehmonlar gullarning go‘zalligini maqtashdi!',
  },
];

/* ==========================================================================
   INSTAGRAM GALEREYA RASMLARI
   ========================================================================== */
const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    alt: 'Pushti va oq atirgullardan iborat mualliflik buketi',
    likes: '1.2k',
    image:
      'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ig-2',
    alt: 'IbrohimFlowers studiyasida qahva va yangi gullar',
    likes: '980',
    image:
      'https://images.unsplash.com/photo-1444930694458-01babf71870c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ig-3',
    alt: 'Florist ish jarayonida guldasta tayyorlamoqda',
    likes: '1.5k',
    image:
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ig-4',
    alt: 'Bahoriy pion va evkalipt guldastasi',
    likes: '2.1k',
    image:
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ig-5',
    alt: 'To‘y marosimi uchun nafis gullar kompozitsiyasi',
    likes: '1.7k',
    image:
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ig-6',
    alt: 'Sovg‘a qutisidagi gullar va oltin lenta',
    likes: '1.4k',
    image:
      'https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?auto=format&fit=crop&w=600&q=80',
  },
];

/* ==========================================================================
   KO'P BERILADIGAN SAVOLLAR (FAQ)
   ========================================================================== */
const FAQ_ITEMS = [
  {
    question: 'Buyurtma qancha vaqt ichida yetkazib beriladi?',
    answer:
      'Toshkent shahri bo‘ylab tayyor buketlar 45–60 daqiqa ichida yetkazib beriladi. Individual murakkab kompozitsiyalar uchun esa 2 soat oldin buyurtma berish tavsiya etiladi.',
  },
  {
    question: 'Gullar uzoq vaqt yangi turishi uchun nima qilasizlar?',
    answer:
      'Barcha gullar maxsus sovutgich kameralarda saqlanadi, yetkazib berishda esa poyalar maxsus namlantiruvchi akva-kapsulaga joylanadi va bepul ozuqa paketi qo‘shib beriladi.',
  },
  {
    question: 'Buyurtmani yuborishdan oldin buket rasmini ko‘ra olamanmi?',
    answer:
      'Albatta! Floristimiz guldastani yakunlagach, sifatli suratini sizning Telegram yoki WhatsApp raqamingizga yuboradi va tasdiqlashingizdan so‘ng kuryerga topshiradi.',
  },
  {
    question: 'Qahva va gul to‘plamlarini o‘zimiz xohlagan tarkibda yig‘sa bo‘ladimi?',
    answer:
      'Ha, istalgan buket yoniga yangi qovurilgan specialty qahva donalari, qo‘l mehnati shokoladlari yoki xushbo‘y shamlar qo‘shib shaxsiy sovg‘a qutisini yaratishingiz mumkin.',
  },
  {
    question: 'To‘lov usullari qanday?',
    answer:
      'To‘lovni Click, Payme, Uzum Bank, Visa/Mastercard kartalari orqali onlayn yoki kuryer yetkazib berganda naqd pul ko‘rinishida amalga oshirishingiz mumkin.',
  },
];

/* ==========================================================================
   ANIMATSIYA VARIANTLARI
   ========================================================================== */
const staggerGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ==========================================================================
   ANIMATSIYALI STATISTIKA COUNTER KOMPONENTI
   ========================================================================== */
function AnimatedCounter({ target, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!isInView) return undefined;
    let startTime = null;
    const duration = 1800;

    const animateStep = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animateStep);
      } else {
        setCount(target);
      }
    };

    const frameId = requestAnimationFrame(animateStep);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target]);

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-number">
        {count.toLocaleString('uz-UZ')}
        <span>{suffix}</span>
      </div>
      <p className="stat-label">{label}</p>
    </div>
  );
}

function Home({ onAddToCart, likedIds = [], onToggleLike }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Hero parallax harakatlari
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const heroFloatY = useTransform(scrollYProgress, [0, 1], [0, -55]);

  // Mijozlar fikrlari karuseli holati
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // FAQ accordion holati
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS_LIST.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + TESTIMONIALS_LIST.length) % TESTIMONIALS_LIST.length
    );
  };

  const currentReview = TESTIMONIALS_LIST[activeTestimonial];

  return (
    <div className="home-page">
      {/* ====================================================================
          1. HERO SEKSIYASI (Parallax, suzuvchi elementlar, 2 ta CTA)
          ==================================================================== */}
      <section ref={heroRef} className="hero-section">
        <div className="hero-blob hero-blob-pink" aria-hidden="true" />
        <div className="hero-blob hero-blob-green" aria-hidden="true" />

        <div className="container hero-grid">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-eyebrow">
              <FiStar /> Toshkentdagi Premium Gul &amp; Qahva Studiyasi
            </span>

            <h1 className="hero-title">
              Har bir gulda — <span>nafis tuyg‘ular</span> va unutilmas lahzalar
            </h1>

            <p className="hero-subtitle">
              IbrohimFlowers studiyasida yangi uzilgan mualliflik buketlari va
              xushbo‘y specialty qahva uyg‘unligini kashf eting. Yaqinlaringizga
              60 daqiqada quvonch ulashing.
            </p>

            <div className="hero-cta-group">
              <Link to="/flowers" className="btn btn-primary">
                Katalogni ko‘rish <FiArrowRight />
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Studiyamiz haqida
              </Link>
            </div>

            <div className="hero-trust-row">
              <div className="hero-trust-item">
                <FiCheckCircle />
                <span>100% yangi Gollandiya gullari</span>
              </div>
              <div className="hero-trust-item">
                <FiCheckCircle />
                <span>Yetkazishdan oldin foto-hisobot</span>
              </div>
            </div>
          </motion.div>

          {/* Hero o'ng taraf rasmlar va suzuvchi kartalar */}
          <div className="hero-visual">
            <motion.div
              className="hero-main-frame"
              style={{ y: heroImgY }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85"
                alt="IbrohimFlowers mualliflik pushti pion va atirgul buketi"
                loading="lazy"
                className="hero-main-img"
              />
            </motion.div>

            {/* Suzuvchi ikkinchi rasm */}
            <motion.div
              className="hero-floating-photo"
              style={{ y: heroFloatY }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=500&q=80"
                alt="Qahva va yangi gullar uyg'unligi"
                loading="lazy"
              />
            </motion.div>

            {/* Glassmorphism suzuvchi reyting kartasi */}
            <motion.div
              className="hero-glass-badge glass-card"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="hero-badge-icon">
                <FiStar />
              </div>
              <div>
                <strong>4.9 / 5.0 Reyting</strong>
                <span>5,000+ mamnun mijozlar tanlovi</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. STATISTIKA COUNTER SEKSIYASI
          ==================================================================== */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid glass-card">
            <AnimatedCounter target={5200} suffix="+" label="Mamnun mijozlar" />
            <AnimatedCounter target={140} suffix="+" label="Noyob gul turlari" />
            <AnimatedCounter target={45} suffix=" daq" label="O‘rtacha yetkazish" />
            <AnimatedCounter target={10} suffix=" yil" label="Floristika tajribasi" />
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. MASHHUR GULLAR SEKSIYASI
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
            <span className="section-badge">Eng ko‘p tanlangan</span>
            <h2 className="section-title">
              Mashhur <span>mualliflik</span> buketlari
            </h2>
            <p className="section-subtitle">
              Mijozlarimiz eng ko‘p sevib xarid qiladigan nafis guldastalar va
              qahva-gul sovg‘a to‘plamlari bilan tanishing.
            </p>
          </motion.div>

          <motion.div
            className="popular-flowers-grid"
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {POPULAR_FLOWERS.map((flower) => (
              <FlowerCard
                key={flower.id}
                {...flower}
                isLiked={likedIds.includes(flower.id)}
                onAddToCart={onAddToCart}
                onToggleLike={onToggleLike}
              />
            ))}
          </motion.div>

          <div className="section-center-action">
            <Link to="/flowers" className="btn btn-primary">
              Barcha gullarni ko‘rish <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. KATEGORIYALAR SEKSIYASI
          ==================================================================== */}
      <section className="section-padding categories-section">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="section-badge">Yo‘nalishlar</span>
            <h2 className="section-title">
              Har bir marosim uchun <span>maxsus</span> toifalar
            </h2>
            <p className="section-subtitle">
              Romantik uchrashuvdan tortib hashamatli to‘y marosimlarigacha —
              o‘zingizga mos bo‘limni tanlang.
            </p>
          </motion.div>

          <motion.div
            className="categories-grid"
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {CATEGORIES_LIST.map((cat) => (
              <motion.div
                key={cat.id}
                variants={fadeUpVariants}
                whileHover={{ y: -6 }}
                className="category-card"
              >
                <Link to="/flowers" className="category-card-link">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="category-card-bg"
                  />
                  <div className="category-card-overlay" />
                  <div className="category-card-content">
                    <span className="category-icon-box" aria-hidden="true">
                      {cat.icon}
                    </span>
                    <span className="category-count-pill">{cat.count}</span>
                    <h3>{cat.title}</h3>
                    <p>{cat.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          5. NEGA AYNAN BIZ (6 TA XUSUSIYAT)
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
            <span className="section-badge">Afzalliklarimiz</span>
            <h2 className="section-title">
              Nega aynan <span>IbrohimFlowers</span>?
            </h2>
            <p className="section-subtitle">
              Biz shunchaki gul sotmaymiz — biz har bir mijoz uchun samimiy his-tuyg‘u
              va yuksak xizmat madaniyatini taqdim etamiz.
            </p>
          </motion.div>

          <motion.div
            className="features-grid"
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {FEATURES_LIST.map((feat) => (
              <motion.div
                key={feat.title}
                variants={fadeUpVariants}
                whileHover={{ y: -6 }}
                className="feature-card"
              >
                <div className="feature-icon-wrap" aria-hidden="true">
                  {feat.icon}
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          6. QANDAY BUYURTMA BERILADI (4 QADAMLI TIMELINE)
          ==================================================================== */}
      <section className="section-padding steps-section">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="section-badge">Oson va tez</span>
            <h2 className="section-title">
              Qanday <span>buyurtma</span> beriladi?
            </h2>
            <p className="section-subtitle">
              Atigi 4 ta oddiy qadam orqali yaqiningizga unutilmas syurpriz
              tayyorlang.
            </p>
          </motion.div>

          <motion.div
            className="steps-timeline"
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {ORDER_STEPS.map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUpVariants}
                className="step-item"
              >
                <div className="step-number-circle">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          7. MIJOZLAR FIKRLARI (CAROUSEL + AnimatePresence)
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
            <span className="section-badge">Mijozlar e’tirofi</span>
            <h2 className="section-title">
              Biz haqimizda <span>samimiy</span> fikrlar
            </h2>
          </motion.div>

          <div className="testimonial-wrapper glass-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview.id}
                className="testimonial-slide"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="testimonial-stars" aria-label="5 yulduzli baho">
                  {Array.from({ length: currentReview.rating }).map((_, i) => (
                    <FiStar key={i} />
                  ))}
                </div>

                <blockquote className="testimonial-quote">
                  &ldquo;{currentReview.text}&rdquo;
                </blockquote>

                <div className="testimonial-author">
                  <img
                    src={currentReview.avatar}
                    alt={currentReview.name}
                    loading="lazy"
                    className="testimonial-avatar"
                  />
                  <div>
                    <strong>{currentReview.name}</strong>
                    <span>{currentReview.role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="testimonial-controls">
              <button
                type="button"
                className="testimonial-nav-btn"
                onClick={handlePrevTestimonial}
                aria-label="Oldingi fikr"
              >
                <FiChevronLeft />
              </button>

              <div className="testimonial-dots">
                {TESTIMONIALS_LIST.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`testimonial-dot ${
                      index === activeTestimonial ? 'active' : ''
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                    aria-label={`${index + 1}-fikrni ko'rish`}
                  />
                ))}
              </div>

              <button
                type="button"
                className="testimonial-nav-btn"
                onClick={handleNextTestimonial}
                aria-label="Keyingi fikr"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. CTA BANNER SEKSIYASI
          ==================================================================== */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-banner"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-banner-text">
              <span className="cta-pill">Maxsus taklif</span>
              <h2>Birinchi buyurtmangizga 15% chegirma va bepul tabriknoma!</h2>
              <p>
                Bugunoq o‘zingizga yoqqan guldastani tanlang yoki individual buket
                yig‘ish uchun floristimiz bilan bog‘laning.
              </p>
              <div className="cta-banner-actions">
                <Link to="/flowers" className="btn btn-gold">
                  Hozir buyurtma berish <FiArrowRight />
                </Link>
                <Link to="/about" className="btn btn-outline-light">
                  Biz bilan bog‘lanish
                </Link>
              </div>
            </div>

            <div className="cta-banner-visual">
              <img
                src="https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=700&q=80"
                alt="IbrohimFlowers maxsus sovg'a buketi"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          9. INSTAGRAM GALEREYA & FAQ ACCORDION
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
            <span className="section-badge">@ibrohimflowers.uz</span>
            <h2 className="section-title">
              Studiyamizdan <span>jonli</span> lahzalar
            </h2>
            <p className="section-subtitle">
              Kundalik ijodiy jarayonlarimiz va eng so‘nggi guldastalarimizni
              Instagram sahifamizda kuzatib boring.
            </p>
          </motion.div>

          <motion.div
            className="instagram-grid"
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {INSTAGRAM_POSTS.map((post) => (
              <motion.a
                key={post.id}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUpVariants}
                className="instagram-card"
                aria-label={post.alt}
              >
                <img src={post.image} alt={post.alt} loading="lazy" />
                <div className="instagram-hover-overlay">
                  <FiInstagram />
                  <span>{post.likes} yoqtirish</span>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* FAQ Accordion */}
          <div className="faq-wrapper">
            <div className="section-header" style={{ marginTop: '84px' }}>
              <span className="section-badge">Savol-javob</span>
              <h2 className="section-title">
                Ko‘p beriladigan <span>savollar</span>
              </h2>
            </div>

            <div className="faq-list">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={item.question}
                    className={`faq-item ${isOpen ? 'open' : ''}`}
                  >
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.question}</span>
                      <span className="faq-toggle-icon" aria-hidden="true">
                        {isOpen ? <FiMinus /> : <FiPlus />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="faq-answer-wrap"
                        >
                          <p className="faq-answer-text">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;