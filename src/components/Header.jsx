// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShoppingBag,
  FiHeart,
  FiMenu,
  FiX,
  FiPhoneCall,
  FiArrowRight,
  FiChevronRight,
} from 'react-icons/fi';
import { GiFlowerEmblem } from 'react-icons/gi';

const navLinks = [
  { path: '/', label: 'Bosh sahifa' },
  { path: '/flowers', label: 'Gullar katalogi' },
  { path: '/about', label: 'Biz haqimizda' },
];

function Header({ cartCount = 0, likedCount = 0, onOpenCart, onQuickOrder }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll holatini kuzatish (glass/blur effekt uchun)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sahifa o'zgarganda mobil menyuni avtomatik yopish
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Mobil menyu ochiq bo'lganda sahifa scrollini bloklash
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Brend Logotipi */}
          <Link
            to="/"
            className="brand-logo"
            aria-label="IbrohimFlowers bosh sahifaga o'tish"
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

          {/* Desktop Navigatsiya */}
          <nav className="desktop-nav" aria-label="Asosiy navigatsiya">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? 'active' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="headerActiveUnderline"
                        className="nav-active-underline"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* O'ng tarafdagi harakat tugmalari */}
          <div className="header-actions">
            {/* Sevimlilar (Wishlist) indikatori */}
            <Link
              to="/flowers"
              className="icon-action-btn"
              aria-label={`Sevimli gullar: ${likedCount} ta`}
              title="Sevimli gullar"
            >
              <FiHeart />
              {likedCount > 0 && (
                <span className="action-badge gold">{likedCount}</span>
              )}
            </Link>

            {/* Savat tugmasi (badge bilan) */}
            <motion.button
              type="button"
              className="icon-action-btn"
              onClick={onOpenCart}
              whileTap={{ scale: 0.92 }}
              aria-label={`Savatni ochish, ${cartCount} ta mahsulot`}
              title="Savat"
            >
              <FiShoppingBag />
              <AnimatePresence mode="popLayout">
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    className="action-badge"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Buyurtma berish CTA tugmasi */}
            <motion.button
              type="button"
              className="btn btn-primary header-order-btn"
              onClick={onQuickOrder}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Buyurtma berish <FiArrowRight />
            </motion.button>

            {/* Mobil burger tugmasi */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isMobileMenuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobil Slide-in Menyu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              id="mobile-navigation-drawer"
              className="mobile-drawer"
              aria-label="Mobil navigatsiya menyusi"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div>
                <div className="mobile-drawer-header">
                  <Link
                    to="/"
                    className="brand-logo"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="brand-logo-icon" aria-hidden="true">
                      <GiFlowerEmblem />
                    </span>
                    <span className="brand-logo-text">
                      <span className="brand-name">
                        Ibrohim<span>Flowers</span>
                      </span>
                    </span>
                  </Link>
                  <button
                    type="button"
                    className="mobile-close-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Menyuni yopish"
                  >
                    <FiX />
                  </button>
                </div>

                <nav className="mobile-nav-list">
                  {navLinks.map((item, idx) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * idx }}
                    >
                      <NavLink
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                          `mobile-nav-link ${isActive ? 'active' : ''}`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>{item.label}</span>
                        <FiChevronRight />
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="mobile-drawer-footer">
                <a href="tel:+998901234567" className="mobile-drawer-contact">
                  <FiPhoneCall />
                  <span>+998 (90) 123-45-67 — Tezkor aloqa</span>
                </a>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onQuickOrder) onQuickOrder();
                  }}
                >
                  Buyurtma berish <FiArrowRight />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;