// src/pages/Flower.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiX,
  FiSliders,
  FiRotateCcw,
  FiPlusCircle,
  FiStar,
  FiHeart,
} from 'react-icons/fi';
import { GiFlowerEmblem } from 'react-icons/gi';
import FlowerCard from '../components/FlowerCard';
import './Flower.css';

/* ==========================================================================
   KATALOG GULLAR MASSIVI (Flower.jsx ichida const, 16 ta mahsulot)
   ========================================================================== */
const CATALOG_FLOWERS = [
  {
    id: 'cat-fl-1',
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
    id: 'cat-fl-2',
    name: 'Baxmal Qizil Atirgullar (25 dona)',
    category: 'Atirgullar',
    price: 550000,
    rating: 4.9,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-fl-3',
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
    id: 'cat-fl-4',
    name: 'Nafis Kelinlik Buketi "Marvarid"',
    category: "To'ylar uchun",
    price: 680000,
    rating: 5.0,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-fl-5',
    name: 'Monstera Deliciosa Keramik Tuvakda',
    category: "O'simliklar",
    price: 310000,
    rating: 4.8,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-fl-6',
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
    id: 'cat-fl-7',
    name: 'Oltin Qutidagi Ekvador Atirgullari',
    category: "Sovg'a to'plamlari",
    price: 620000,
    rating: 5.0,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-fl-8',
    name: 'Zaytun Daraxti Mini Bonsai',
    category: "O'simliklar",
    price: 440000,
    rating: 4.8,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-fl-9',
    name: 'Shampan Rangli Atirgul Buketi (19 dona)',
    category: 'Atirgullar',
    price: 470000,
    oldPrice: 520000,
    discount: 10,
    rating: 4.9,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-fl-10',
    name: 'To‘y Arkasi va Stol Floristika To‘plami',
    category: "To'ylar uchun",
    price: 1250000,
    rating: 5.0,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-fl-11',
    name: 'Fikus Lyrata Designer Tuvakda',
    category: "O'simliklar",
    price: 390000,
    oldPrice: 450000,
    discount: 13,
    rating: 4.7,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-fl-12',
    name: 'Arabica Qahva, Makaron va Pion Box',
    category: "Sovg'a to'plamlari",
    price: 510000,
    rating: 5.0,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-fl-13',
    name: 'Nozik Gortenziya va Lavanda Guldastasi',
    category: 'Buketlar',
    price: 365000,
    rating: 4.8,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-fl-14',
    name: '51 Dona Qip-Qizil Premium Atirgul',
    category: 'Atirgullar',
    price: 980000,
    oldPrice: 1120000,
    discount: 12,
    rating: 5.0,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-fl-15',
    name: 'Oq Ranunkulyus Kelinlik Kompozitsiyasi',
    category: "To'ylar uchun",
    price: 740000,
    rating: 4.9,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-fl-16',
    name: 'Sukkulentlar Bog‘i Shisha Terrariumda',
    category: "O'simliklar",
    price: 260000,
    rating: 4.8,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1446071103084-c257b5f70672?auto=format&fit=crop&w=800&q=80',
  },
];

const CATEGORY_TABS = [
  'Barchasi',
  'Buketlar',
  'Atirgullar',
  "O'simliklar",
  "To'ylar uchun",
  "Sovg'a to'plamlari",
];

const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_STEP = 4;

function Flower({ onAddToCart, likedIds = [], onToggleLike }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [sortBy, setSortBy] = useState('default');
  const [onlyLiked, setOnlyLiked] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const filteredFlowers = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const filtered = CATALOG_FLOWERS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Barchasi' || item.category === selectedCategory;

      const matchesSearch =
        !normalizedSearch ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.category.toLowerCase().includes(normalizedSearch);

      const matchesLiked = !onlyLiked || likedIds.includes(item.id);

      return matchesCategory && matchesSearch && matchesLiked;
    });

    const sorted = [...filtered];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    }

    return sorted;
  }, [searchQuery, selectedCategory, sortBy, onlyLiked, likedIds]);

  const visibleFlowers = useMemo(
    () => filteredFlowers.slice(0, visibleCount),
    [filteredFlowers, visibleCount]
  );

  const hasMoreItems = visibleCount < filteredFlowers.length;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Barchasi');
    setSortBy('default');
    setOnlyLiked(false);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  };

  return (
    <div className="flower-catalog-page">
      {/* ====================================================================
          1. KATALOG HERO / BANNER
          ==================================================================== */}
      <section className="catalog-banner">
        <div className="container catalog-banner-inner">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-badge">
              <FiStar /> Eksklyuziv Kolleksiya
            </span>
            <h1 className="catalog-title">
              IbrohimFlowers <span>Gullar Katalogi</span>
            </h1>
            <p className="catalog-subtitle">
              Har bir guldasta tajribali floristlarimiz tomonidan eng sarxil va
              xushbo‘y gullardan qo‘lda yig‘iladi. Qidiruv va filtrlar orqali
              o‘zingizga mos sovg‘ani osongina toping.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          2. QIDIRUV, FILTR VA SARALASH PANELI
          ==================================================================== */}
      <section className="catalog-main section-padding">
        <div className="container">
          <div className="catalog-controls-box glass-card">
            <div className="catalog-top-controls">
              <div className="catalog-search-wrap">
                <FiSearch className="catalog-search-icon" aria-hidden="true" />
                <label htmlFor="flower-search-input" className="sr-only">
                  Gul nomi yoki turini qidirish
                </label>
                <input
                  id="flower-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(INITIAL_VISIBLE_COUNT);
                  }}
                  placeholder="Masalan: Pion, Atirgul, Orxideya, Qahva..."
                  className="catalog-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="catalog-clear-search"
                    onClick={() => setSearchQuery('')}
                    aria-label="Qidiruv matnini tozalash"
                  >
                    <FiX />
                  </button>
                )}
              </div>

              <div className="catalog-right-controls">
                <button
                  type="button"
                  className={`liked-filter-btn ${onlyLiked ? 'active' : ''}`}
                  onClick={() => {
                    setOnlyLiked((prev) => !prev);
                    setVisibleCount(INITIAL_VISIBLE_COUNT);
                  }}
                  aria-pressed={onlyLiked}
                >
                  <FiHeart />
                  <span>Sevimlilar ({likedIds.length})</span>
                </button>

                <div className="catalog-sort-wrap">
                  <FiSliders aria-hidden="true" />
                  <label htmlFor="flower-sort-select" className="sr-only">
                    Saralash turi
                  </label>
                  <select
                    id="flower-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="catalog-sort-select"
                  >
                    <option value="default">Tavsiya etilgan</option>
                    <option value="price-asc">Narx: arzondan qimmatga</option>
                    <option value="price-desc">Narx: qimmatdan arzonga</option>
                    <option value="rating">Yuqori reyting bo‘yicha</option>
                    <option value="newest">Avval yangilari</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              className="catalog-category-tabs"
              role="tablist"
              aria-label="Gullar kategoriyalari"
            >
              {CATEGORY_TABS.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`category-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="catalog-results-bar">
            <p className="catalog-count-text">
              Jami <strong>{filteredFlowers.length}</strong> ta gul topildi
              {selectedCategory !== 'Barchasi' && (
                <>
                  {' '}
                  — <span>{selectedCategory}</span> bo‘limida
                </>
              )}
            </p>

            {(searchQuery ||
              selectedCategory !== 'Barchasi' ||
              sortBy !== 'default' ||
              onlyLiked) && (
              <button
                type="button"
                className="catalog-reset-link"
                onClick={handleResetFilters}
              >
                <FiRotateCcw /> Filtrlarni tozalash
              </button>
            )}
          </div>

          {/* ================================================================
              3. GULLAR GRIDI YOKI BO'SH HOLAT UI
              ================================================================ */}
          {visibleFlowers.length === 0 ? (
            <motion.div
              className="catalog-empty-state glass-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <div className="catalog-empty-icon" aria-hidden="true">
                <GiFlowerEmblem />
              </div>
              <h2>Afsuski, so‘rovingiz bo‘yicha gul topilmadi</h2>
              <p>
                Qidiruv so‘zini o‘zgartirib ko‘ring yoki barcha kategoriyalarni
                qayta ko‘rish uchun filtrlarni tozalang.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleResetFilters}
              >
                <FiRotateCcw /> Barcha gullarni ko‘rsatish
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div layout className="catalog-flowers-grid">
                <AnimatePresence mode="popLayout">
                  {visibleFlowers.map((flower) => (
                    <motion.div
                      key={flower.id}
                      layout
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.32 }}
                    >
                      <FlowerCard
                        {...flower}
                        isLiked={likedIds.includes(flower.id)}
                        onAddToCart={onAddToCart}
                        onToggleLike={onToggleLike}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {hasMoreItems && (
                <div className="catalog-load-more-wrap">
                  <motion.button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleLoadMore}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FiPlusCircle /> Ko&apos;proq yuklash (
                    {filteredFlowers.length - visibleCount} ta qoldi)
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Flower;