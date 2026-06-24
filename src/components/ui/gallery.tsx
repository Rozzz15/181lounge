'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { WaveText } from '@/components/ui/wave-text';
import { Facebook, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SocialCards from '@/components/ui/card-fan-carousel';

const rotations = [-2.5, 2.8, 3.7, -2.8, -1.7];

const Photo = ({
  src,
  alt,
  className,
  width,
  height,
  rotate,
  onClick,
}: {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
  rotate?: number;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.2 }}
      whileDrag={{ scale: 1.1 }}
      onTap={onClick}
      style={{
        width,
        height,
        rotate: rotate ?? 0,
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        touchAction: 'none',
      }}
      className={cn(
        className,
        'relative mx-auto shrink-0 cursor-grab active:cursor-grabbing'
      )}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-md shadow-black/10 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2">
        <img
          className="h-full w-full object-cover"
          src={src}
          alt={alt}
          draggable={false}
        />
      </div>
    </motion.div>
  );
};

const photos = [
  {
    id: 1,
    order: 0,
    x: '-320px',
    y: '15px',
    zIndex: 50,
    src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
  },
  {
    id: 2,
    order: 1,
    x: '-160px',
    y: '32px',
    zIndex: 40,
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
  },
  {
    id: 3,
    order: 2,
    x: '0px',
    y: '8px',
    zIndex: 30,
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&q=80',
  },
  {
    id: 4,
    order: 3,
    x: '160px',
    y: '22px',
    zIndex: 20,
    src: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=80',
  },
  {
    id: 5,
    order: 4,
    x: '320px',
    y: '44px',
    zIndex: 10,
    src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=400&q=80',
  },
];

const facebookCards = [
  { imgUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop', alt: 'Coffee art' },
  { imgUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=600&fit=crop', alt: 'Coffee beans' },
  { imgUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=600&fit=crop', alt: 'Coffee cup' },
  { imgUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=600&fit=crop', alt: 'Latte art' },
  { imgUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=600&fit=crop', alt: 'Morning coffee' },
  { imgUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=400&h=600&fit=crop', alt: 'Espresso' },
  { imgUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=600&fit=crop', alt: 'Cappuccino' },
  { imgUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=600&fit=crop', alt: 'Iced coffee' },
  { imgUrl: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=600&fit=crop', alt: 'Coffee shop' },
  { imgUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=600&fit=crop', alt: 'Coffee brewing' },
];

export function PhotoGallery({ animationDelay = 0.5 }: { animationDelay?: number }) {
  const [activeTab, setActiveTab] = useState<'tiktok' | 'facebook'>('facebook');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const selectedPhoto = selectedImage !== null
    ? photos.find((p) => p.id === selectedImage) ?? null
    : null;

  const handleClose = useCallback(() => setSelectedImage(null), []);

  const handlePrev = useCallback(() => {
    if (selectedImage === null) return;
    const idx = photos.findIndex((p) => p.id === selectedImage);
    const prev = (idx - 1 + photos.length) % photos.length;
    setSelectedImage(photos[prev].id);
  }, [selectedImage]);

  const handleNext = useCallback(() => {
    if (selectedImage === null) return;
    const idx = photos.findIndex((p) => p.id === selectedImage);
    const next = (idx + 1) % photos.length;
    setSelectedImage(photos[next].id);
  }, [selectedImage]);

  useEffect(() => {
    if (selectedImage === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedImage, handleClose, handlePrev, handleNext]);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    const animationTimer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      (animationDelay + 0.4) * 1000
    );

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const photoVariants = {
    hidden: () => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    }),
    visible: (custom: { x: string; y: string; order: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15,
      },
    }),
  };

  return (
    <section className="section bg-white overflow-hidden relative">
      {/* Floating TikTok Logos */}
      {activeTab === 'tiktok' && [
        { top: '8%', left: '5%', size: 40, delay: 0, duration: 6 },
        { top: '15%', right: '8%', size: 32, delay: 1.5, duration: 7 },
        { bottom: '20%', left: '3%', size: 28, delay: 0.8, duration: 5.5 },
        { bottom: '10%', right: '5%', size: 36, delay: 2, duration: 6.5 },
        { top: '50%', left: '8%', size: 24, delay: 1, duration: 8 },
        { top: '40%', right: '3%', size: 30, delay: 2.5, duration: 7.5 },
        { top: '5%', left: '25%', size: 26, delay: 0.4, duration: 7.2 },
        { top: '12%', right: '22%', size: 22, delay: 1.8, duration: 6.8 },
        { bottom: '15%', left: '18%', size: 34, delay: 1.2, duration: 5.8 },
        { bottom: '5%', right: '20%', size: 20, delay: 2.8, duration: 7.8 },
        { top: '30%', left: '15%', size: 28, delay: 0.6, duration: 6.2 },
        { top: '55%', right: '12%', size: 32, delay: 1.6, duration: 7.4 },
      ].map((item, i) => (
        <motion.div
          key={`tt-${i}`}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.35, scale: 1 }}
          viewport={{ once: true }}
          animate={{
            y: [0, -12, 0, 12, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
          className="absolute pointer-events-none hidden lg:block"
          style={{
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
          }}
        >
          <img
            src="/images/tik.jpg"
            alt=""
            className="rounded-xl object-cover shadow-lg"
            style={{ width: item.size, height: item.size }}
          />
        </motion.div>
      ))}

      {/* Floating Facebook Logos */}
      {activeTab === 'facebook' && [
        { top: '10%', left: '4%', size: 38, delay: 0.3, duration: 6.5 },
        { top: '18%', right: '6%', size: 30, delay: 1.2, duration: 7.5 },
        { bottom: '22%', left: '5%', size: 26, delay: 0.6, duration: 5.8 },
        { bottom: '8%', right: '4%', size: 34, delay: 1.8, duration: 6.2 },
        { top: '45%', left: '6%', size: 22, delay: 0.9, duration: 8.5 },
        { top: '35%', right: '2%', size: 28, delay: 2.2, duration: 7 },
        { top: '6%', left: '22%', size: 24, delay: 0.2, duration: 6.8 },
        { top: '14%', right: '20%', size: 30, delay: 1.4, duration: 7.2 },
        { bottom: '18%', left: '15%', size: 32, delay: 0.7, duration: 5.5 },
        { bottom: '3%', right: '18%', size: 22, delay: 2.5, duration: 8 },
        { top: '28%', left: '12%', size: 26, delay: 1.1, duration: 6.4 },
        { top: '52%', right: '10%', size: 34, delay: 1.9, duration: 7.8 },
      ].map((item, i) => (
        <motion.div
          key={`fb-${i}`}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.35, scale: 1 }}
          viewport={{ once: true }}
          animate={{
            y: [0, -12, 0, 12, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
          className="absolute pointer-events-none hidden lg:block"
          style={{
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
          }}
        >
          <img
            src="/images/face.jpg"
            alt=""
            className="rounded-xl object-cover shadow-lg"
            style={{ width: item.size, height: item.size }}
          />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-1 p-1 bg-[#F3F0E8] rounded-full mb-4">
            <button
              onClick={() => setActiveTab('facebook')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'facebook'
                  ? 'bg-white text-[#44362A] shadow-sm'
                  : 'text-[#948D82] hover:text-[#44362A]'
              }`}
            >
              <img src="/images/face.jpg" alt="Facebook" className="w-5 h-5 rounded-md object-cover" />
              Facebook
            </button>
            <button
              onClick={() => setActiveTab('tiktok')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'tiktok'
                  ? 'bg-white text-[#44362A] shadow-sm'
                  : 'text-[#948D82] hover:text-[#44362A]'
              }`}
            >
              <img src="/images/tik.jpg" alt="TikTok" className="w-5 h-5 rounded-md object-cover" />
              TikTok
            </button>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#44362A]">
            {activeTab === 'tiktok' ? <WaveText text="FOLLOW US ON TIKTOK" /> : <WaveText text="LIKE US ON FACEBOOK" />}
          </h2>
          <p className="mt-4 text-[#948D82] text-lg max-w-2xl mx-auto">
            {activeTab === 'tiktok'
              ? 'Watch our latest videos, behind-the-scenes content, and more.'
              : 'Follow our Facebook page for updates, promos, and events.'}
          </p>
        </motion.div>

        {/* Photo Gallery - TikTok */}
        {activeTab === 'tiktok' && (
          <div className="relative h-[350px] w-full items-center justify-center hidden lg:flex">
            <motion.div
              className="relative mx-auto flex w-full max-w-7xl justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <motion.div
                className="relative flex w-full justify-center"
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? 'visible' : 'hidden'}
              >
                <div className="relative h-[220px] w-[220px]">
                  {[...photos].reverse().map((photo) => (
                    <motion.div
                      key={photo.id}
                      className="absolute left-0 top-0 group"
                      style={{ zIndex: photo.zIndex }}
                      variants={photoVariants}
                      custom={{
                        x: photo.x,
                        y: photo.y,
                        order: photo.order,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.zIndex = '50'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.zIndex = String(photo.zIndex); }}
                    >
                      <Photo
                        width={220}
                        height={220}
                        src={photo.src}
                        alt="181 Lounge coffee"
                        rotate={rotations[photo.id - 1]}
                        onClick={() => setSelectedImage(photo.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Card Fan Carousel - Facebook */}
        {activeTab === 'facebook' && (
          <div className="hidden lg:block">
            <SocialCards cards={facebookCards} />
          </div>
        )}

        {/* Fallback grid on mobile - TikTok */}
        {activeTab === 'tiktok' && (
          <div className="lg:hidden mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedImage(photo.id)}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-[#F3F0E8]"
                >
                  <img
                    src={photo.src}
                    alt="181 Lounge coffee"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <img src="/images/tik.jpg" alt="TikTok" className="w-8 h-8 rounded-lg object-cover" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fallback grid on mobile - Facebook */}
        {activeTab === 'facebook' && (
          <div className="lg:hidden mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {facebookCards.slice(0, 6).map((card, i) => (
                <button
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-[#F3F0E8]"
                >
                  <img
                    src={card.imgUrl}
                    alt={card.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <img src="/images/face.jpg" alt="Facebook" className="w-8 h-8 rounded-lg object-cover" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          {activeTab === 'tiktok' ? (
            <a
              href="https://www.tiktok.com/@181lounge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#010101] text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-[#1a1a1a] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <img src="/images/tik.jpg" alt="TikTok" className="w-5 h-5 rounded-md object-cover" />
              Follow @181lounge
            </a>
          ) : (
            <a
              href="https://www.facebook.com/profile.php?id=61564700682320"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1877F2] text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-[#1668d4] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <img src="/images/face.jpg" alt="Facebook" className="w-5 h-5 rounded-md object-cover" />
              Like 181 Lounge on Facebook
            </a>
          )}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Image */}
              <img
                src={selectedPhoto.src.replace('w=400', 'w=1200')}
                alt="181 Lounge coffee"
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />

              {/* Navigation */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
