// src/components/FlowerCard.jsx
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  FiHeart,
  FiShoppingBag,
  FiStar,
  FiPlus,
  FiCheck,
} from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { formatPriceUZS } from '../App';

const defaultCardVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function FlowerCard({
  id,
  image,
  name,
  price,
  oldPrice = null,
  discount = null,
  category,
  rating = 4.9,
  isNew = false,
  isLiked = false,
  onAddToCart,
  onToggleLike,
  variants = defaultCardVariants,
}) {
  const [justAdded, setJustAdded] = useState(false);

  // 3D tilt harakati uchun kursor koordinatalari
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 220, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 220, damping: 24 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleAddClick = () => {
    if (onAddToCart) {
      onAddToCart({
        id,
        image,
        name,
        price,
        category,
        rating,
        isNew,
      });
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleLikeClick = () => {
    if (onToggleLike) {
      onToggleLike({
        id,
        image,
        name,
        price,
        category,
        rating,
        isNew,
      });
    }
  };

  const hasDiscount = Boolean(discount || (oldPrice && oldPrice > price));
  const discountLabel = discount
    ? `-${discount}%`
    : hasDiscount
      ? `-${Math.round(((oldPrice - price) / oldPrice) * 100)}%`
      : null;

  return (
    <motion.article
      className="flower-card"
      variants={variants}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Rasm va ustki elementlar */}
      <div className="flower-card-media">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="flower-card-img"
        />

        {/* Yuqori qism: Badge va Sevimlilar (Like) tugmasi */}
        <div className="flower-card-top">
          <div className="flower-badges">
            {isNew && <span className="flower-badge new">Yangi</span>}
            {hasDiscount && (
              <span className="flower-badge discount">
                Chegirma {discountLabel}
              </span>
            )}
          </div>

          <motion.button
            type="button"
            className={`flower-like-btn ${isLiked ? 'liked' : ''}`}
            onClick={handleLikeClick}
            whileTap={{ scale: 0.78 }}
            animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.32 }}
            aria-label={
              isLiked
                ? `${name} ni sevimlilardan olib tashlash`
                : `${name} ni sevimlilarga qo'shish`
            }
            aria-pressed={isLiked}
          >
            {isLiked ? <FaHeart /> : <FiHeart />}
          </motion.button>
        </div>

        {/* Hover da chiqadigan "Savatga qo'shish" tugmasi */}
        <div className="flower-card-overlay">
          <motion.button
            type="button"
            className="flower-add-btn"
            onClick={handleAddClick}
            whileTap={{ scale: 0.96 }}
          >
            {justAdded ? (
              <>
                <FiCheck /> Qo&apos;shildi
              </>
            ) : (
              <>
                <FiShoppingBag /> Savatga qo&apos;shish
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Karta ma'lumotlari */}
      <div className="flower-card-body">
        <div className="flower-card-meta">
          <span className="flower-category-tag">{category}</span>
          <span className="flower-rating" aria-label={`Reyting: ${rating} dan 5`}>
            <FiStar aria-hidden="true" />
            <span>{Number(rating).toFixed(1)}</span>
          </span>
        </div>

        <h3 className="flower-card-title">{name}</h3>

        <div className="flower-card-footer">
          <div className="flower-price-wrap">
            {oldPrice && oldPrice > price && (
              <span className="flower-old-price">
                {formatPriceUZS(oldPrice)}
              </span>
            )}
            <span className="flower-price">{formatPriceUZS(price)}</span>
          </div>

          <motion.button
            type="button"
            className="flower-mini-cart-btn"
            onClick={handleAddClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`${name} ni savatga qo'shish`}
            title="Savatga qo'shish"
          >
            {justAdded ? <FiCheck /> : <FiPlus />}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export default FlowerCard;