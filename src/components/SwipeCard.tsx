import { motion, useAnimation, useMotionValue, useTransform } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { Scenario } from '../types';

interface SwipeCardProps {
  scenario: Scenario;
  onSwipe: (direction: 'left' | 'right') => void;
  leaveX?: number;
}

const getCategoryDetails = (category: string) => {
  const c = category?.toLowerCase() || '';
  if (c.includes('kitchen')) {
    return { icon: '🍳', color: 'bg-amber-50 border-amber-100 text-amber-700', accent: 'bg-amber-400', label: 'Kitchen' };
  }
  if (c.includes('bathroom')) {
    return { icon: '🚿', color: 'bg-cyan-50 border-cyan-100 text-cyan-700', accent: 'bg-cyan-400', label: 'Bathroom' };
  }
  if (c.includes('office')) {
    return { icon: '💻', color: 'bg-indigo-50 border-indigo-100 text-indigo-700', accent: 'bg-indigo-400', label: 'Office' };
  }
  if (c.includes('home')) {
    return { icon: '🏠', color: 'bg-emerald-50 border-emerald-100 text-emerald-700', accent: 'bg-emerald-400', label: 'Home' };
  }
  if (c.includes('outdoor')) {
    return { icon: '🌳', color: 'bg-green-50 border-green-100 text-green-700', accent: 'bg-green-400', label: 'Outdoors' };
  }
  if (c.includes('emergency')) {
    return { icon: '🚨', color: 'bg-red-50 border-red-100 text-red-700', accent: 'bg-red-500', label: 'Emergency' };
  }
  if (c.includes('maintenance')) {
    return { icon: '🔧', color: 'bg-sky-50 border-sky-100 text-sky-700', accent: 'bg-sky-400', label: 'Maintenance' };
  }
  if (c.includes('hardware')) {
    return { icon: '🔌', color: 'bg-slate-100 border-slate-200 text-slate-700', accent: 'bg-slate-500', label: 'Hardware' };
  }
  if (c.includes('loto')) {
    return { icon: '🔒', color: 'bg-rose-50 border-rose-100 text-rose-700', accent: 'bg-rose-500', label: 'LOTO' };
  }
  if (c.includes('ppe')) {
    return { icon: '🦺', color: 'bg-orange-50 border-orange-100 text-orange-700', accent: 'bg-orange-500', label: 'PPE Gear' };
  }
  if (c.includes('operations')) {
    return { icon: '🏭', color: 'bg-zinc-100 border-zinc-200 text-zinc-700', accent: 'bg-zinc-500', label: 'Operations' };
  }
  if (c.includes('compliance')) {
    return { icon: '📋', color: 'bg-teal-50 border-teal-100 text-teal-700', accent: 'bg-teal-400', label: 'Compliance' };
  }
  if (c.includes('testing')) {
    return { icon: '🧪', color: 'bg-purple-50 border-purple-100 text-purple-700', accent: 'bg-purple-400', label: 'Testing' };
  }
  if (c.includes('housekeeping')) {
    return { icon: '🧹', color: 'bg-yellow-50 border-yellow-100 text-yellow-700', accent: 'bg-yellow-400', label: 'Housekeeping' };
  }
  if (c.includes('safety equipment') || c.includes('safety gear')) {
    return { icon: '🛡️', color: 'bg-blue-50 border-blue-100 text-blue-700', accent: 'bg-blue-500', label: 'Safety Equipment' };
  }
  if (c.includes('tool')) {
    return { icon: '🔨', color: 'bg-stone-100 border-stone-200 text-stone-700', accent: 'bg-stone-500', label: 'Tools' };
  }
  return { icon: '⚡', color: 'bg-yellow-50 border-yellow-100 text-yellow-700', accent: 'bg-yellow-400', label: 'Electrical Safety' };
};

export const SwipeCard: React.FC<SwipeCardProps> = ({ scenario, onSwipe, leaveX = 0 }) => {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [exitX, setExitX] = useState<number | null>(null);

  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  // Stamp opacities
  const hazardOpacity = useTransform(x, [-120, -35], [1, 0]);
  const safeOpacity = useTransform(x, [35, 120], [0, 1]);
  
  // Background color indicators based on drag
  const backgroundColor = useTransform(
    x,
    [-100, 0, 100],
    ['rgba(239, 68, 68, 0.08)', 'rgba(255, 255, 255, 1)', 'rgba(16, 185, 129, 0.08)']
  );

  useEffect(() => {
    if (leaveX !== 0) {
      setExitX(leaveX);
    }
  }, [leaveX]);

  const handleDragEnd = (e: any, info: any) => {
    const swipeThreshold = 70;
    const velocityThreshold = 200;

    if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      setExitX(400);
      onSwipe('right');
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      setExitX(-400);
      onSwipe('left');
    } else {
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } });
    }
  };

  const details = getCategoryDetails(scenario.category);

  // Physical spring entrance animation on new card mount!
  useEffect(() => {
    controls.set({ y: 40, scale: 0.9, opacity: 0 });
    controls.start({ 
      y: 0, 
      scale: 1, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 220, damping: 18 } 
    });
  }, [scenario.id, controls]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 touch-none select-none"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: -600, right: 600 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      animate={exitX ? { x: exitX, opacity: 0 } : controls}
      transition={exitX ? { duration: 0.2, ease: "easeOut" } : {}}
      whileTap={{ scale: 0.98 }}
      whileDrag={{ scale: 1.02 }}
    >
      <motion.div
        className="relative w-full h-full bg-white rounded-[32px] sm:rounded-[40px] shadow-xl border border-slate-100 p-5 sm:p-8 flex flex-col items-center justify-between text-center overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none"
        style={{ backgroundColor }}
      >
        {/* Dynamic color accent bar */}
        <div className={`absolute top-0 left-0 w-full h-2.5 ${details.accent}`}></div>
        
        {/* Dynamic Stamp Overlays */}
        <motion.div
          style={{ opacity: hazardOpacity }}
          className="absolute top-14 left-4 sm:top-16 sm:left-6 rotate-[-12deg] border-4 border-red-500 text-red-500 font-black text-xs sm:text-sm md:text-base px-3 py-1.5 rounded-lg uppercase tracking-widest pointer-events-none select-none z-20 shadow-xs"
        >
          ⚠️ HAZARD
        </motion.div>
        <motion.div
          style={{ opacity: safeOpacity }}
          className="absolute top-14 right-4 sm:top-16 sm:right-6 rotate-[12deg] border-4 border-emerald-500 text-emerald-500 font-black text-xs sm:text-sm md:text-base px-3 py-1.5 rounded-lg uppercase tracking-widest pointer-events-none select-none z-20 shadow-xs"
        >
          ✅ SAFE
        </motion.div>
        
        {/* Category Pill Tag */}
        <div className="mt-2 shrink-0">
          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-sm border ${details.color}`}>
            <span>{details.icon}</span>
            <span>{details.label}</span>
          </div>
        </div>

        {/* Dynamic Center content area */}
        <div className="flex-1 flex flex-col items-center justify-center w-full my-4 overflow-y-auto">
          {/* Scaled graphic icon */}
          <div className={`w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-3xl flex items-center justify-center text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 border-2 sm:border-4 shrink-0 transition-transform shadow-sm ${details.color}`}>
            {details.icon}
          </div>
          
          {/* Main scenario text */}
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-800 leading-snug px-1 sm:px-4 max-w-sm">
            {scenario.text}
          </h2>
        </div>

        {/* Bottom Swipe helper info */}
        <div className="mt-auto shrink-0 w-full pt-3 border-t border-slate-50 flex flex-col gap-1.5">
          <div className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-widest">Swipe or tap below to decide</div>
          <div className="flex gap-6 justify-center font-black text-sm sm:text-base">
            <motion.span className="text-red-500" style={{ opacity: useTransform(x, [-100, 0, 100], [1, 0.5, 0.2]) }}>
              ← HAZARD
            </motion.span>
            <span className="text-slate-200">|</span>
            <motion.span className="text-emerald-500" style={{ opacity: useTransform(x, [-100, 0, 100], [0.2, 0.5, 1]) }}>
              SAFE →
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
