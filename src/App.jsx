// src/App.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import {
  FiShoppingBag,
  FiX,
  FiTrash2,
  FiCheckCircle,
  FiArrowRight,
  FiPlus,
  FiMinus,
} from 'react-icons/fi';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Flower from './pages/Flower';
import About from './pages/About';
import './App.css';

/* ==========================================================================
   SAHIFA O'TISH ANIMATSIYA VARIANTLARI
   ========================================================================== */
const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 18,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: {
      duration: 0.26,
      ease: [0.4, 0, 1, 1],
    },
  },
};

/* ==========================================================================
   ROUTE O'ZGARGANDA SAHIFANI TEPAGA SCROLL QILISH
   ========================================================================== */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}

/* ==========================================================================
   NARXNI O'ZBEK SO'MIDA FORMATLASH YORDAMCHI FUNKSIYASI
   ========================================================================== */
export function formatPriceUZS(amount) {
  return `${Number(amount || 0).toLocaleString('uz-UZ')} so'm`;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Savat holati (localStorage bilan sinxron)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ibrohim_flowers_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sevimli gullar (wishlist) ID lari
  const [likedIds, setLikedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('ibrohim_flowers_likes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Savat yon paneli (Drawer) holati
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Qisqa bildirishnoma (Toast)
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('ibrohim_flowers_cart', JSON.stringify(cartItems));
    } catch {
      // Storage cheklangan bo'lsa xatolikni e'tiborsiz qoldiramiz
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('ibrohim_flowers_likes', JSON.stringify(likedIds));
    } catch {
      // Storage cheklangan bo'lsa xatolikni e'tiborsiz qoldiramiz
    }
  }, [likedIds]);

  const showToast = useCallback((message) => {
    setToastMessage(message);
  }, []);

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = setTimeout(() => {
      setToastMessage('');
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Savatga gul qo'shish
  const handleAddToCart = useCallback(
    (flower) => {
      const itemKey = flower.id || flower.name;
      setCartItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.key === itemKey);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          };
          return updated;
        }
        return [
          ...prev,
          {
            key: itemKey,
            name: flower.name,
            price: flower.price,
            image: flower.image,
            category: flower.category,
            quantity: 1,
          },
        ];
      });
      showToast(`"${flower.name}" savatga qo'shildi`);
    },
    [showToast]
  );

  // Savatdagi mahsulot sonini o'zgartirish
  const handleUpdateQty = useCallback((key, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // Savatdan o'chirish
  const handleRemoveFromCart = useCallback((key) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  // Buyurtmani rasmiylashtirish (Savatdan)
  const handleCheckoutFromCart = useCallback(() => {
    setCartItems([]);
    setIsCartOpen(false);
    showToast("Buyurtmangiz qabul qilindi! Operatorimiz tez orada bog'lanadi.");
  }, [showToast]);

  // Sevimlilarga qo'shish / olib tashlash
  const handleToggleLike = useCallback(
    (flower) => {
      const itemKey = flower.id || flower.name;
      setLikedIds((prev) => {
        const exists = prev.includes(itemKey);
        if (exists) {
          showToast(`"${flower.name}" sevimlilardan olib tashlandi`);
          return prev.filter((id) => id !== itemKey);
        }
        showToast(`"${flower.name}" sevimlilarga saqlandi`);
        return [...prev, itemKey];
      });
    },
    [showToast]
  );

  // Jami savatdagi mahsulotlar soni va summasi
  const totalCartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const totalCartAmount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  // Escape tugmasi bosilganda savat oynasini yopish
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-wrapper">
        <ScrollToTop />

        {/* Yuqori navigatsiya paneli */}
        <Header
          cartCount={totalCartCount}
          likedCount={likedIds.length}
          onOpenCart={() => setIsCartOpen(true)}
          onQuickOrder={() => {
            navigate('/flowers');
            showToast("O'zingizga yoqqan buketni tanlang");
          }}
        />

        {/* Sahifalar aro silliq o'tish */}
        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Routes location={location}>
                <Route
                  path="/"
                  element={
                    <Home
                      onAddToCart={handleAddToCart}
                      likedIds={likedIds}
                      onToggleLike={handleToggleLike}
                    />
                  }
                />
                <Route
                  path="/flowers"
                  element={
                    <Flower
                      onAddToCart={handleAddToCart}
                      likedIds={likedIds}
                      onToggleLike={handleToggleLike}
                    />
                  }
                />
                <Route
                  path="/about"
                  element={<About onShowToast={showToast} />}
                />
                <Route
                  path="*"
                  element={
                    <Home
                      onAddToCart={handleAddToCart}
                      likedIds={likedIds}
                      onToggleLike={handleToggleLike}
                    />
                  }
                />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Pastki qism (Footer) */}
        <Footer onShowToast={showToast} />

        {/* Savat yon paneli (Cart Drawer) */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div
                className="mobile-drawer-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                aria-hidden="true"
              />
              <motion.aside
                className="cart-drawer"
                aria-label="Xarid savati"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              >
                <div className="cart-drawer-header">
                  <h3>
                    <FiShoppingBag /> Savatingiz ({totalCartCount})
                  </h3>
                  <button
                    type="button"
                    className="mobile-close-btn"
                    onClick={() => setIsCartOpen(false)}
                    aria-label="Savatni yopish"
                  >
                    <FiX />
                  </button>
                </div>

                <div className="cart-items-list">
                  {cartItems.length === 0 ? (
                    <div className="cart-empty-state">
                      <FiShoppingBag className="cart-empty-icon" />
                      <h4>Savatingiz hozircha bo'sh</h4>
                      <p>
                        Katalogimizdan nafis gullar yoki qahva-gul to'plamlarini tanlang.
                      </p>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginTop: '20px' }}
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate('/flowers');
                        }}
                      >
                        Katalogga o'tish <FiArrowRight />
                      </button>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <motion.div
                        layout
                        key={item.key}
                        className="cart-item-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="cart-item-img"
                        />
                        <div className="cart-item-info">
                          <h4 className="cart-item-title">{item.name}</h4>
                          <p className="cart-item-price">
                            {formatPriceUZS(item.price * item.quantity)}
                          </p>
                          <div className="cart-qty-controls">
                            <button
                              type="button"
                              className="cart-qty-btn"
                              onClick={() => handleUpdateQty(item.key, -1)}
                              aria-label="Sonini kamaytirish"
                            >
                              <FiMinus />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              type="button"
                              className="cart-qty-btn"
                              onClick={() => handleUpdateQty(item.key, 1)}
                              aria-label="Sonini oshirish"
                            >
                              <FiPlus />
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="cart-remove-btn"
                          onClick={() => handleRemoveFromCart(item.key)}
                          aria-label={`${item.name} ni o'chirish`}
                        >
                          <FiTrash2 />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="cart-drawer-footer">
                    <div className="cart-total-row">
                      <span>Jami summa:</span>
                      <strong>{formatPriceUZS(totalCartAmount)}</strong>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                      onClick={handleCheckoutFromCart}
                    >
                      Buyurtmani rasmiylashtirish <FiArrowRight />
                    </button>
                  </div>
                )}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Pastki bildirishnoma (Toast) */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              className="toast-banner"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
            >
              <FiCheckCircle className="toast-icon" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export default App;