import { Heart, Play, RotateCcw, X, Check, Zap, Share2, Award, Trophy, BookOpen, Timer, Volume2, VolumeX, Shield, Pause, Info, Settings, ArrowLeft, ChevronRight, Star, FileText, Download, Linkedin, Facebook, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';
import { SCENARIOS, ACHIEVEMENTS_DATA } from './data';
import { Scenario, GameState, Achievement } from './types';
import { SwipeCard } from './components/SwipeCard';
import { soundEffects, setMute, getMute, setAudioVolume, getAudioVolume } from './utils/audio';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [playerName, setPlayerName] = useState(() => {
    const saved = localStorage.getItem('safetySwipePlayerName');
    if (!saved || saved.toLowerCase() === 'anil sharma' || saved === 'Enter your name') {
      return 'Enter Your Name';
    }
    return saved;
  });
  const [gameMode, setGameMode] = useState<'general' | 'industrial'>('general');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('safetySwipeHighScore') || '0', 10)
  );
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  
  // Custom Phase 2 & Audit states
  const [isMuted, setIsMuted] = useState(getMute);
  const [volume, setVolume] = useState<number>(getAudioVolume);
  const [timeDifficulty, setTimeDifficulty] = useState<'relaxed' | 'standard' | 'blitz'>(
    (localStorage.getItem('safetySwipeTimeDifficulty') as 'relaxed' | 'standard' | 'blitz') || 'standard'
  );
  const [sessionMistakes, setSessionMistakes] = useState<{ scenario: Scenario; userGuess: 'left' | 'right' | 'timeout' }[]>([]);
  const [showMistakesReview, setShowMistakesReview] = useState(false);
  
  const [shields, setShields] = useState(0);
  const [perfectSwipes, setPerfectSwipes] = useState(0);
  const [consecutivePerfects, setConsecutivePerfects] = useState(0);
  const [isPractice, setIsPractice] = useState(false);
  const [isSuddenDeath, setIsSuddenDeath] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [streakSplash, setStreakSplash] = useState<string | null>(null);
  
  const [recentScores, setRecentScores] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('safetySwipeRecentScores');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [showTutorial, setShowTutorial] = useState(() => 
    localStorage.getItem('safetySwipeSeenTutorial') !== 'true'
  );
  const [tutorialStep, setTutorialStep] = useState(0);
  
  const [isHighContrast, setIsHighContrast] = useState(() => 
    localStorage.getItem('safetySwipeHighContrast') === 'true'
  );
  
  const [decisionSpeeds, setDecisionSpeeds] = useState<number[]>([]);
  const [showPerfectAnim, setShowPerfectAnim] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  
  const [lifetimeXP, setLifetimeXP] = useState(() => 
    parseInt(localStorage.getItem('safetySwipeLifetimeXP') || '0', 10)
  );
  
  const [leaderboard, setLeaderboard] = useState<{name: string, score: number, rank: string, date: string, mode: string}[]>(() => {
    try {
      const saved = localStorage.getItem('safetySwipeLeaderboard');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { name: "SafetySam", score: 480, rank: "Chief Safety Engineer 👑", date: "2026-06-25", mode: "industrial" },
      { name: "Elena_H", score: 350, rank: "Senior Auditor 🏆", date: "2026-06-25", mode: "general" },
      { name: "John_D", score: 240, rank: "Compliance Officer 🥇", date: "2026-06-24", mode: "industrial" },
      { name: "AlexSafety", score: 120, rank: "Apprentice Inspector 🥈", date: "2026-06-23", mode: "general" },
    ];
  });
  
  const [missions, setMissions] = useState(() => [
    { id: 'streak', title: 'Achieve 5x Multiplier', target: 5, current: 0, completed: false, icon: '🔥' },
    { id: 'perfect', title: 'Complete 3 Perfect Swipes', target: 3, current: 0, completed: false, icon: '⚡' },
    { id: 'score', title: 'Score 150 Points', target: 150, current: 0, completed: false, icon: '🏆' }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [deck, setDeck] = useState<Scenario[]>([]);
  const [recentScenarioIds, setRecentScenarioIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('safetySwipeRecentScenarios');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [timeLimit, setTimeLimit] = useState(10000);
  const [timeLeft, setTimeLeft] = useState(10000);
  const [explanation, setExplanation] = useState<{ correct: boolean, text: string, title?: string } | null>(null);
  
  const [shake, setShake] = useState(false);
  const [leaveX, setLeaveX] = useState<number>(0);
  
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem('safetySwipeAchievements');
      return saved ? JSON.parse(saved) : ACHIEVEMENTS_DATA;
    } catch {
      return ACHIEVEMENTS_DATA;
    }
  });
  const [toast, setToast] = useState<Achievement | null>(null);
  const [shareText, setShareText] = useState('Share Score');

  // Refs to prevent stale closures in event handlers and timers
  const handleGuessRef = useRef<(guess: 'left' | 'right' | 'timeout') => void>(() => {});
  const closeExplanationRef = useRef<() => void>(() => {});
  const handleButtonSwipeRef = useRef<(direction: 'left' | 'right') => void>(() => {});
  const isTransitioningRef = useRef(false);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      const next = [...prev];
      const index = next.findIndex(a => a.id === id);
      if (index !== -1 && !next[index].unlocked) {
        next[index] = { ...next[index], unlocked: true };
        localStorage.setItem('safetySwipeAchievements', JSON.stringify(next));
        setToast(next[index]);
        setTimeout(() => setToast(null), 3500);

        // Visual Confetti Burst for unlocking a new Medal
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6']
          });
        } catch (e) {
          console.error("Confetti error", e);
        }
      }
      return next;
    });
  }, []);

  const getCardTime = (difficulty?: string) => {
    let t = 10000;
    if (difficulty === 'hard') t = 6000;
    else if (difficulty === 'medium') t = 8000;
    
    if (timeDifficulty === 'relaxed') t = t * 2;
    else if (timeDifficulty === 'blitz') t = Math.round(t * 0.5);
    
    if (isSuddenDeath) t = Math.round(t * 0.5); // Fast speed round in Sudden Death!
    return t;
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const recordScenarioSeen = useCallback((id: string) => {
    setRecentScenarioIds(prev => {
      const filtered = prev.filter(item => item !== id);
      const updated = [...filtered, id];
      // Keep up to 35 most recently seen questions
      if (updated.length > 35) {
        updated.shift();
      }
      localStorage.setItem('safetySwipeRecentScenarios', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const createDeckForMode = useCallback((mode: 'general' | 'industrial', recentIds: string[]) => {
    const modeScenarios = SCENARIOS.filter(s => s.mode === mode);
    
    // Split into recent and unseen
    const unseen = modeScenarios.filter(s => !recentIds.includes(s.id));
    const recent = modeScenarios.filter(s => recentIds.includes(s.id));
    
    // Sort recent by how long ago they were seen (least recent first)
    recent.sort((a, b) => recentIds.indexOf(a.id) - recentIds.indexOf(b.id));
    
    // Shuffle the unseen ones
    const shuffledUnseen = shuffleArray(unseen);
    
    // Combine unseen first, followed by oldest seen
    const finalDeck = [...shuffledUnseen, ...recent];
    
    if (finalDeck.length === 0) {
      return shuffleArray(modeScenarios);
    }
    
    return finalDeck;
  }, []);

  const startGame = () => {
    // Save player name
    localStorage.setItem('safetySwipePlayerName', playerName);
    
    let currentRecentIds = recentScenarioIds;
    try {
      const saved = localStorage.getItem('safetySwipeRecentScenarios');
      if (saved) {
        currentRecentIds = JSON.parse(saved);
      }
    } catch {}

    const shuffled = createDeckForMode(gameMode, currentRecentIds);
    setDeck(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    
    // Set lives according to game mode
    if (isSuddenDeath) {
      setLives(1);
      setShields(0);
    } else if (isPractice) {
      setLives(99);
      setShields(99);
    } else {
      setLives(3);
      setShields(0); // Standard modes give 0 life shields at start!
    }
    
    setPerfectSwipes(0);
    setConsecutivePerfects(0);
    setDecisionSpeeds([]);
    setCorrectCount(0);
    setIncorrectCount(0);
    setSessionMistakes([]);
    setShowMistakesReview(false);
    setIsPaused(false);
    
    // Reset active daily quests/missions
    setMissions([
      { id: 'streak', title: 'Achieve 5x Multiplier', target: 5, current: 0, completed: false, icon: '🔥' },
      { id: 'perfect', title: 'Complete 3 Perfect Swipes', target: 3, current: 0, completed: false, icon: '⚡' },
      { id: 'score', title: 'Score 150 Points', target: 150, current: 0, completed: false, icon: '🏆' }
    ]);
    
    const initialTime = getCardTime(shuffled[0]?.difficulty);
    setTimeLimit(initialTime);
    setTimeLeft(initialTime);
    
    isTransitioningRef.current = false;
    setGameState('playing');
    setLeaveX(0);
    setShareText('Share Score');
    
    // Unlock first play achievements
    unlockAchievement('first_blood');
    if (isSuddenDeath) unlockAchievement('sudden_death_unlock'); // potential achievement
    
    soundEffects.click();
  };

  const handleTimeout = useCallback(() => {
    handleGuessRef.current('timeout');
  }, []);

  useEffect(() => {
    if (gameState !== 'playing' || isPaused) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 50) {
          clearInterval(interval);
          handleTimeout();
          return 0;
        }
        
        // Play tick sound every second, and every 250ms when low on time (<1.5s)
        const nextTime = prev - 50;
        const tickInterval = nextTime < 1500 ? 250 : 1000;
        if (nextTime % tickInterval === 0) {
          soundEffects.tick(nextTime < 1500);
        }
        
        return nextTime;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [gameState, currentIndex, isPaused, handleTimeout]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleGuess = useCallback((guess: 'left' | 'right' | 'timeout') => {
    if (gameState !== 'playing' || isTransitioningRef.current) return;
    
    const currentCard = deck[currentIndex];
    if (currentCard) {
      recordScenarioSeen(currentCard.id);
    }
    let isCorrect = false;
    
    if (guess === 'left' && !currentCard.isSafe) isCorrect = true;
    if (guess === 'right' && currentCard.isSafe) isCorrect = true;
    
    const decisionTime = timeLimit - timeLeft;
    setDecisionSpeeds(prev => [...prev, decisionTime]);
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      // Calculate Perfect Swipe bonus (decided in less than half the time limit)
      const isPerfect = (timeLeft / timeLimit) > 0.5;
      const perfectBonus = isPerfect ? 1.5 : 1.0;
      const modeMultiplier = isSuddenDeath ? 2.0 : 1.0;
      
      let nextPerfectSwipes = perfectSwipes;
      let nextConsecPerfects = consecutivePerfects;
      
      if (isPerfect) {
        nextPerfectSwipes = perfectSwipes + 1;
        nextConsecPerfects = consecutivePerfects + 1;
        setPerfectSwipes(nextPerfectSwipes);
        setConsecutivePerfects(nextConsecPerfects);
        
        soundEffects.perfect();
        setShowPerfectAnim(`⚡ PERFECT! +${Math.round(15 * perfectBonus * modeMultiplier)} XP`);
        setTimeout(() => setShowPerfectAnim(null), 1200);
      } else {
        nextConsecPerfects = 0;
        setConsecutivePerfects(0);
        soundEffects.correct();
        setShowPerfectAnim(`✓ CORRECT! +${Math.round(10 * modeMultiplier)} XP`);
        setTimeout(() => setShowPerfectAnim(null), 1200);
      }
      
      // Points calculation with multipliers
      const basePoints = 10 * newStreak;
      const difficultyMultiplier = currentCard.difficulty === 'hard' ? 2 : currentCard.difficulty === 'medium' ? 1.5 : 1;
      const speedMultiplier = timeDifficulty === 'blitz' ? 1.5 : timeDifficulty === 'relaxed' ? 0.75 : 1.0;
      const points = basePoints * difficultyMultiplier * perfectBonus * modeMultiplier * speedMultiplier;
      const newScore = score + Math.round(points);
      setScore(newScore);
      
      // Update local daily quests/missions
      setMissions(prevMissions => prevMissions.map(m => {
        if (m.id === 'streak' && newStreak > m.current) {
          const completed = newStreak >= m.target;
          return { ...m, current: newStreak, completed };
        }
        if (m.id === 'perfect' && nextPerfectSwipes > m.current) {
          const completed = nextPerfectSwipes >= m.target;
          return { ...m, current: nextPerfectSwipes, completed };
        }
        if (m.id === 'score' && newScore > m.current) {
          const completed = newScore >= m.target;
          return { ...m, current: newScore, completed };
        }
        return m;
      }));
      
      // Shield reward for high streak (rewards 1 Shield at 5x streak)
      if (newStreak === 5 && shields < 1 && !isSuddenDeath && !isPractice) {
        setShields(1);
        setStreakSplash("🛡️ SHIELD RECHARGED! (1 LOTO SAVER)");
        setTimeout(() => setStreakSplash(null), 2000);
        try {
          confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 }, colors: ['#f59e0b', '#3b82f6', '#10b981'] });
        } catch (e) {}
      } else if (newStreak === 5) {
        setStreakSplash("🔥 5X MULTIPLIER STREAK!");
        setTimeout(() => setStreakSplash(null), 2000);
        try {
          confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 }, colors: ['#ef4444', '#f97316', '#eab308'] });
        } catch (e) {}
      } else if (newStreak === 10) {
        setStreakSplash("🚀 10X COMBO! UNSTOPPABLE!");
        setTimeout(() => setStreakSplash(null), 2500);
        try {
          // Dual side cannons
          const duration = 1000;
          const end = Date.now() + duration;
          const interval = setInterval(() => {
            if (Date.now() > end) return clearInterval(interval);
            confetti({ startVelocity: 25, spread: 180, ticks: 50, origin: { x: 0.2, y: 0.6 } });
            confetti({ startVelocity: 25, spread: 180, ticks: 50, origin: { x: 0.8, y: 0.6 } });
          }, 150);
        } catch (e) {}
      } else if (newStreak === 15) {
        setStreakSplash("👑 15X PERFECT ALIGNMENT!");
        setTimeout(() => setStreakSplash(null), 2500);
        try {
          // Big fireworks show
          const duration = 2000;
          const animationEnd = Date.now() + duration;
          const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
          const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

          const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
          }, 250);
        } catch (e) {}
      }
      
      // Dynamic pitch arpeggio for high streaks
      if (newStreak >= 3) {
        soundEffects.streak(newStreak);
      }
      
      // Unlock achievements
      if (newStreak >= 5) unlockAchievement('streak_5');
      if (newStreak >= 10) unlockAchievement('streak_10');
      if (newStreak >= 15) unlockAchievement('perfect_run');
      if (newScore >= 150) unlockAchievement('score_1500_ach');
      if (newScore >= 500) unlockAchievement('score_5000');
      if (nextConsecPerfects >= 3) unlockAchievement('perfect_triple');
      if (isSuddenDeath && newScore >= 200) unlockAchievement('sudden_master');
      
      isTransitioningRef.current = true;
      setTimeout(() => {
        nextCard();
      }, 220);
    } else {
      setIncorrectCount(prev => prev + 1);
      setSessionMistakes(prev => [...prev, { scenario: currentCard, userGuess: guess }]);
      triggerShake();
      setStreak(0);
      setConsecutivePerfects(0);
      
      if (isPractice) {
        // Sandbox Practice: No lives/shields consumed
        soundEffects.incorrect();
        setGameState('explanation');
        setExplanation({
          correct: false,
          title: "💡 Practice Hint",
          text: currentCard.explanation
        });
      } else if (shields > 0) {
        // Shield Absorbed! Saves life
        setShields(prev => prev - 1);
        soundEffects.correct(); // Positive chime because shield saved them
        setGameState('explanation');
        setExplanation({
          correct: false,
          title: "🛡️ Shield Absorbed!",
          text: `Your Life Shield saved you! Lives preserved. Remember: ${currentCard.explanation}`
        });
        unlockAchievement('shield_used');
      } else {
        // Standard life loss
        const newLives = lives - 1;
        setLives(newLives);
        if (guess === 'timeout') {
          soundEffects.timeout();
        } else {
          soundEffects.incorrect();
        }
        setGameState('explanation');
        setExplanation({
          correct: false,
          title: guess === 'timeout' ? "⌛ Time's Up!" : "⚠️ Hazard Triggered!",
          text: guess === 'timeout' 
            ? "Compliance window expired. " + currentCard.explanation 
            : "Safety violation! " + currentCard.explanation
        });
      }
    }
  }, [gameState, deck, currentIndex, streak, lives, score, shields, perfectSwipes, consecutivePerfects, timeLimit, timeLeft, isSuddenDeath, isPractice, unlockAchievement, recordScenarioSeen]);

  const nextCard = () => {
    setLeaveX(0);
    let nextIndex = currentIndex + 1;
    let currentDeck = deck;
    
    if (nextIndex >= deck.length) {
      currentDeck = createDeckForMode(gameMode, recentScenarioIds);
      // Ensure the first card of the new deck is not the same as the last card we just saw
      const lastCardId = deck[currentIndex]?.id;
      if (lastCardId && currentDeck.length > 1 && currentDeck[0].id === lastCardId) {
        const first = currentDeck.shift()!;
        currentDeck.push(first);
      }
      setDeck(currentDeck);
      nextIndex = 0;
    }
    setCurrentIndex(nextIndex);
    
    const nextTime = getCardTime(currentDeck[nextIndex]?.difficulty);
    setTimeLimit(nextTime);
    setTimeLeft(nextTime);
    
    isTransitioningRef.current = false;
    setGameState('playing');
  };

  const closeExplanation = () => {
    if (lives <= 0 && !isPractice) {
      // Game Over: Record score and calculate XP Rank
      const earnedXP = score;
      const newLifetimeXP = lifetimeXP + earnedXP;
      setLifetimeXP(newLifetimeXP);
      localStorage.setItem('safetySwipeLifetimeXP', newLifetimeXP.toString());
      
      // Update Recent Scores array
      const nextRecent = [score, ...recentScores].slice(0, 10);
      setRecentScores(nextRecent);
      localStorage.setItem('safetySwipeRecentScores', JSON.stringify(nextRecent));
      
      // Update Local Highscore
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('safetySwipeHighScore', score.toString());
      }
      
      // Calculate player's current rank text for leaderboard insertion
      let rankText = "Safety Novice 🥉";
      if (newLifetimeXP >= 12000) rankText = "Chief Safety Engineer 👑";
      else if (newLifetimeXP >= 6000) rankText = "Senior Auditor 🏆";
      else if (newLifetimeXP >= 3000) rankText = "Compliance Officer 🥇";
      else if (newLifetimeXP >= 1000) rankText = "Apprentice Inspector 🥈";
      
      // Update Leaderboard
      const entry = {
        name: playerName || "Player",
        score: score,
        rank: rankText,
        date: new Date().toISOString().split('T')[0],
        mode: gameMode + (isSuddenDeath ? " (Sudden Death)" : "")
      };
      const newLeaderboard = [...leaderboard, entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
      setLeaderboard(newLeaderboard);
      localStorage.setItem('safetySwipeLeaderboard', JSON.stringify(newLeaderboard));
      
      // Play retro game over music
      soundEffects.gameOver();
      setGameState('gameover');

      // Trigger Game Over Confetti for beating high score or reaching 100+ score!
      if (score > highScore || score >= 100) {
        try {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6']
          });
        } catch (e) {}
      }
    } else {
      nextCard();
    }
  };

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    setLeaveX(direction === 'left' ? -400 : 400);
    setTimeout(() => handleGuess(direction), 50);
  };
  
  const handleShare = () => {
    const text = `I just scored ${score} points in Safety Swipe! Can you beat me? ⚡🔌`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setShareText('Copied!');
      setTimeout(() => setShareText('Share Score'), 2000);
    }
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setMute(nextMuted);
    soundEffects.click();
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setAudioVolume(newVol);
    if (isMuted && newVol > 0) {
      setIsMuted(false);
      setMute(false);
    }
    soundEffects.click();
  };

  const toggleHighContrast = () => {
    const nextContrast = !isHighContrast;
    setIsHighContrast(nextContrast);
    localStorage.setItem('safetySwipeHighContrast', nextContrast ? 'true' : 'false');
    soundEffects.click();
  };

  // Keep refs up to date on every render
  handleGuessRef.current = handleGuess;
  closeExplanationRef.current = closeExplanation;
  handleButtonSwipeRef.current = handleButtonSwipe;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'playing' && !isPaused) {
        if (e.key === 'ArrowLeft') {
          handleButtonSwipeRef.current?.('left');
        } else if (e.key === 'ArrowRight') {
          handleButtonSwipeRef.current?.('right');
        } else if (e.key === 'Escape') {
          setIsPaused(true);
        }
      } else if (gameState === 'explanation') {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          closeExplanationRef.current?.();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isPaused]);

  // Rank Info Helper
  const getPlayerRankInfo = (xp: number) => {
    if (xp >= 12000) return { title: "Chief Safety Engineer", badge: "👑", nextXP: null, prevXP: 12000 };
    if (xp >= 6000) return { title: "Senior Auditor", badge: "🏆", nextXP: 12000, prevXP: 6000 };
    if (xp >= 3000) return { title: "Compliance Officer", badge: "🥇", nextXP: 6000, prevXP: 3000 };
    if (xp >= 1000) return { title: "Apprentice Inspector", badge: "🥈", nextXP: 3000, prevXP: 1000 };
    return { title: "Safety Novice", badge: "🥉", nextXP: 1000, prevXP: 0 };
  };

  const rankInfo = getPlayerRankInfo(lifetimeXP);

  // Dynamic ambient background color grading (Pragmatic & beautiful)
  const getAmbientGradient = () => {
    if (isHighContrast) return 'bg-white border-8 border-slate-950 text-slate-950';
    if (gameState === 'playing' || gameState === 'explanation') {
      if (isPractice) return 'bg-gradient-to-tr from-violet-50 via-purple-50 to-indigo-100';
      if (isSuddenDeath) return 'bg-gradient-to-tr from-slate-950 via-red-950 to-stone-900 text-white';
      if (lives === 3) return 'bg-gradient-to-tr from-emerald-50 via-teal-50/70 to-blue-50';
      if (lives === 2) return 'bg-gradient-to-tr from-amber-50 via-yellow-50/50 to-orange-50';
      return 'bg-gradient-to-tr from-rose-100 via-red-50 to-amber-100 animate-pulse';
    }
    return 'bg-gradient-to-tr from-slate-50 via-slate-100 to-indigo-50';
  };

  const renderStartScreen = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
      className="flex flex-col items-center justify-center h-full max-w-md mx-auto px-4 w-full select-none my-auto"
    >
      {/* Top Settings Bar */}
      <div className="w-full flex justify-between items-center mb-3 shrink-0">
        <button 
          onClick={() => { setShowTutorial(true); setTutorialStep(0); soundEffects.click(); }}
          className="px-2.5 py-1.5 bg-white/80 backdrop-blur-xs rounded-lg shadow-xs hover:bg-slate-50 border border-slate-200/60 text-slate-500 hover:text-slate-900 transition-all flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider"
          id="btn-tutorial"
        >
          <Info size={13} /> How to Play
        </button>
        <div className="flex gap-1.5">
          <button 
            onClick={toggleSound}
            className="p-1.5 bg-white/80 backdrop-blur-xs rounded-lg shadow-xs hover:bg-slate-50 border border-slate-200/60 text-slate-500 hover:text-slate-900 transition-all"
            id="btn-sound-toggle"
            title={isMuted ? 'Unmute Game' : 'Mute Game'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <button 
            onClick={toggleHighContrast}
            className={`p-1.5 rounded-lg shadow-xs border transition-all ${isHighContrast ? 'bg-slate-900 text-white border-slate-950' : 'bg-white/80 backdrop-blur-xs hover:bg-slate-50 border-slate-200/60 text-slate-500 hover:text-slate-900'}`}
            id="btn-contrast-toggle"
            title="Toggle High Contrast Mode"
          >
            <Settings size={15} />
          </button>
        </div>
      </div>

      {/* Main Unified Dashboard Card */}
      <div className="w-full bg-white/90 backdrop-blur-md border border-slate-100 rounded-3xl p-5 shadow-xl flex flex-col gap-3">
        {/* Title & Logo */}
        <div className="flex items-center gap-2.5 mb-1 justify-center shrink-0">
          <div className="w-9 h-9 bg-red-100 text-red-500 rounded-xl flex items-center justify-center shadow-xs">
            <Zap size={20} className="fill-current animate-pulse" />
          </div>
          <div className="text-left">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">Safety Swipe</h1>
            <p className="text-[7.5px] sm:text-[8.5px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">Electrical & Industrial Compliance</p>
          </div>
        </div>

        {/* Input player name */}
        <div className="bg-slate-50/50 rounded-xl p-2.5 border border-slate-100 shadow-xs w-full">
          <div className="flex gap-2 items-center">
            <div className="text-lg bg-white w-7 h-7 rounded-lg flex items-center justify-center border border-slate-100 shadow-xs shrink-0">
              👷
            </div>
            <input 
              type="text" 
              placeholder="Enter Your Name" 
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="flex-1 px-2 py-1 bg-transparent focus:outline-none text-xs font-bold text-slate-800 placeholder-slate-400"
              id="input-player-name"
            />
          </div>
        </div>

        {/* Quiz Selection & Operation Mode */}
        <div className="space-y-3">
          {/* Quiz Category */}
          <div>
            <div className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest mb-1 text-left">Quiz Selection Group</div>
            <div className="flex gap-2 w-full">
              <button 
                onClick={() => { setGameMode('general'); soundEffects.click(); }}
                className={`flex-1 py-1.5 px-2 rounded-lg border transition-all text-[11px] font-black flex items-center justify-center gap-1.5 ${
                  gameMode === 'general' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-xs' 
                    : 'border-slate-100 bg-slate-50/50 text-slate-500 hover:bg-slate-50'
                }`}
                id="mode-general"
              >
                🏡 Residential
              </button>
              <button 
                onClick={() => { setGameMode('industrial'); soundEffects.click(); }}
                className={`flex-1 py-1.5 px-2 rounded-lg border transition-all text-[11px] font-black flex items-center justify-center gap-1.5 ${
                  gameMode === 'industrial' 
                    ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-xs' 
                    : 'border-slate-100 bg-slate-50/50 text-slate-500 hover:bg-slate-50'
                }`}
                id="mode-industrial"
              >
                ⚙️ Industrial
              </button>
            </div>
          </div>

          {/* Operation Mode */}
          <div>
            <div className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest mb-1 text-left font-sans">Operation Mode</div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => { setIsPractice(false); setIsSuddenDeath(false); soundEffects.click(); }}
                className={`py-1.5 rounded-lg border transition-all flex flex-col items-center justify-center ${!isPractice && !isSuddenDeath ? 'bg-slate-900 text-white border-slate-950 shadow-xs font-bold' : 'border-slate-100 bg-slate-50/50 text-slate-600 hover:bg-slate-50'}`}
              >
                <span className="text-[10px] font-black leading-none">Classic</span>
                <span className="text-[6px] font-bold opacity-75 uppercase tracking-wider mt-0.5">3 Lives</span>
              </button>
              <button
                onClick={() => { setIsPractice(true); setIsSuddenDeath(false); soundEffects.click(); }}
                className={`py-1.5 rounded-lg border transition-all flex flex-col items-center justify-center ${isPractice ? 'bg-violet-600 text-white border-violet-700 shadow-xs font-bold' : 'border-slate-100 bg-slate-50/50 text-slate-600 hover:bg-slate-50'}`}
              >
                <span className="text-[10px] font-black leading-none">Practice</span>
                <span className="text-[6px] font-bold opacity-75 uppercase tracking-wider mt-0.5">No Timer</span>
              </button>
              <button
                onClick={() => { setIsPractice(false); setIsSuddenDeath(true); soundEffects.click(); }}
                className={`py-1.5 rounded-lg border transition-all flex flex-col items-center justify-center ${isSuddenDeath ? 'bg-red-600 text-white border-red-700 shadow-xs font-bold' : 'border-slate-100 bg-slate-50/50 text-slate-600 hover:bg-slate-50'}`}
              >
                <span className="text-[10px] font-black leading-none">Sudden</span>
                <span className="text-[6px] font-bold opacity-75 uppercase tracking-wider mt-0.5">1 Life</span>
              </button>
            </div>
          </div>

          {/* Time Limit Speed Preset (Phase 2) */}
          <div>
            <div className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest mb-1 text-left font-sans flex justify-between">
              <span>Time limit Speed preset</span>
              {timeDifficulty === 'blitz' && <span className="text-orange-500 font-extrabold animate-pulse">⚡ 1.5x XP</span>}
              {timeDifficulty === 'relaxed' && <span className="text-violet-500 font-bold">0.75x XP</span>}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'relaxed', label: 'Relaxed', desc: 'Double Time' },
                { id: 'standard', label: 'Standard', desc: 'Default' },
                { id: 'blitz', label: 'Blitz ⚡', desc: 'Half Time' }
              ].map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => { setTimeDifficulty(preset.id as any); localStorage.setItem('safetySwipeTimeDifficulty', preset.id); soundEffects.click(); }}
                  className={`py-1 rounded-lg border transition-all flex flex-col items-center justify-center ${
                    timeDifficulty === preset.id 
                      ? 'bg-blue-600 text-white border-blue-700 shadow-xs font-bold' 
                      : 'border-slate-100 bg-slate-50/50 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[9px] font-black leading-none">{preset.label}</span>
                  <span className="text-[5.5px] font-bold opacity-75 uppercase tracking-wider mt-0.5">{preset.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Volume Control & Soundboard (Phase 2) */}
          <div className="bg-slate-50/70 rounded-xl p-2 rounded-lg border border-slate-100/50 text-left">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest block font-sans">Synthesizer Master Volume</span>
              <span className="text-[8.5px] font-black text-slate-600 tabular-nums">{isMuted ? 'Muted' : `${volume}%`}</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                type="button"
                onClick={toggleSound}
                className="text-slate-500 hover:text-slate-800 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX size={12} /> : <Volume2 size={12} />}
              </button>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={isMuted ? 0 : volume} 
                onChange={(e) => handleVolumeChange(parseInt(e.target.value, 10))}
                className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            {/* Quick soundboard tester */}
            <div className="mt-1 flex flex-wrap gap-1 items-center">
              <span className="text-[6px] font-black text-slate-400 uppercase tracking-wider mr-1">Soundboard:</span>
              {[
                { name: 'Click', effect: () => soundEffects.click() },
                { name: 'Correct', effect: () => soundEffects.correct() },
                { name: 'Perfect', effect: () => soundEffects.perfect() },
                { name: 'Error', effect: () => soundEffects.incorrect() },
                { name: 'Combo', effect: () => soundEffects.streak(5) }
              ].map(s => (
                <button
                  key={s.name}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); s.effect(); }}
                  className="px-1.5 py-0.5 bg-white border border-slate-200/60 rounded text-[6px] font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 transition-all active:scale-95 shadow-2xs"
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-slate-100/80 my-1" />

        {/* Action Button & Sub Menus */}
        <div className="w-full">
          {/* Main launch button */}
          <button 
            onClick={() => setGameState('rules')}
            disabled={!playerName.trim()}
            className="w-full py-2.5 bg-slate-950 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-sm mb-2 active:scale-98"
            id="btn-play-game"
          >
            <Play size={14} className="fill-current" /> Play Now
          </button>

          {/* Sub menu grid */}
          <div className="grid grid-cols-3 gap-1.5 w-full">
            <button 
              onClick={() => { setGameState('encyclopedia'); soundEffects.click(); }}
              className="py-1.5 bg-white text-slate-700 rounded-lg font-bold text-[9px] flex flex-col items-center justify-center gap-1 hover:bg-slate-50 transition-all shadow-xs border border-slate-200 uppercase tracking-wider"
              id="btn-manual"
            >
              <BookOpen size={13} className="text-blue-500" /> Manual
            </button>
            <button 
              onClick={() => { setGameState('stats'); soundEffects.click(); }}
              className="py-1.5 bg-white text-slate-700 rounded-lg font-bold text-[9px] flex flex-col items-center justify-center gap-1 hover:bg-slate-50 transition-all shadow-xs border border-slate-200 uppercase tracking-wider"
              id="btn-stats"
            >
              <Trophy size={13} className="text-amber-500" /> Standings
            </button>
            <button 
              onClick={() => { setGameState('achievements'); soundEffects.click(); }}
              className="py-1.5 bg-white text-slate-700 rounded-lg font-bold text-[9px] flex flex-col items-center justify-center gap-1 hover:bg-slate-50 transition-all shadow-xs border border-slate-200 uppercase tracking-wider"
              id="btn-achievements"
            >
              <Award size={13} className="text-emerald-500" /> Medals
            </button>
          </div>
        </div>
      </div>

      {highScore > 0 ? (
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none text-center mt-3">
          Compliance Record Peak: {highScore} PTS
        </p>
      ) : (
        <div className="h-2"></div>
      )}
    </motion.div>
  );

  const renderRulesScreen = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="flex flex-col items-center justify-center h-full max-w-md mx-auto px-6 text-center w-full"
    >
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-md border border-blue-100">
        <BookOpen size={32} />
      </div>
      
      <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Rules & Regulations</h1>
      <p className="text-sm text-slate-500 mb-6 font-medium">
        Welcome, <span className="font-extrabold text-slate-800">👷 {playerName}</span>! Please review the safety protocol before beginning.
      </p>

      {/* Rules Card/List */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 w-full text-left space-y-4 mb-6">
        {/* Rule 1 */}
        <div className="flex gap-3 items-start">
          <div className="p-2 bg-red-50 text-red-600 rounded-xl font-bold shrink-0 text-sm w-8 h-8 flex items-center justify-center">
            ✕
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800 leading-tight">Swipe Left: HAZARD</h4>
            <p className="text-xs text-slate-500 mt-0.5">Identify unsafe acts, non-compliant gear, or electrical dangers.</p>
          </div>
        </div>

        {/* Rule 2 */}
        <div className="flex gap-3 items-start">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold shrink-0 text-sm w-8 h-8 flex items-center justify-center">
            ✓
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800 leading-tight">Swipe Right: SAFE</h4>
            <p className="text-xs text-slate-500 mt-0.5">Identify proper safety protocols, protective gear, and compliant practices.</p>
          </div>
        </div>

        {/* Rule 3 */}
        <div className="flex gap-3 items-start">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-xl shrink-0 w-8 h-8 flex items-center justify-center">
            <Timer size={16} />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800 leading-tight">Mind the Timer</h4>
            <p className="text-xs text-slate-500 mt-0.5">Decide within the time limit (6-10s). Letting the timer run out costs a life.</p>
          </div>
        </div>

        {/* Rule 4 */}
        <div className="flex gap-3 items-start">
          <div className="p-2 bg-orange-50 text-orange-600 rounded-xl shrink-0 w-8 h-8 flex items-center justify-center">
            <Zap size={16} className="fill-orange-500/20" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800 leading-tight">Score Multipliers & Shields</h4>
            <p className="text-xs text-slate-500 mt-0.5">Chain perfect answers to trigger score multipliers. Get a 5-streak to recharge your Shield!</p>
          </div>
        </div>

        {/* Rule 5 */}
        <div className="flex gap-3 items-start">
          <div className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0 w-8 h-8 flex items-center justify-center">
            <Shield size={16} className="fill-rose-500/20" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800 leading-tight">Standard Shields</h4>
            <p className="text-xs text-slate-500 mt-0.5">Classic Mode equips you with 1 Life Shield that absorbs one hazard mistake!</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 w-full">
        <button 
          onClick={() => { setGameState('start'); soundEffects.click(); }}
          className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold text-sm transition-all"
        >
          Leave Game
        </button>
        <button 
          onClick={startGame}
          className="flex-2 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          Understood & Play Now
        </button>
      </div>
    </motion.div>
  );

  const renderAchievements = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
      className="flex flex-col h-full max-w-md mx-auto px-4 py-6 w-full"
    >
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Award className="text-emerald-500 animate-bounce" /> Compliance Medals
        </h2>
        <button 
          onClick={() => { setGameState('start'); soundEffects.click(); }}
          className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-900 border border-slate-200"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-1 space-y-3 no-scrollbar pb-6">
        {achievements.map(ach => (
          <div 
            key={ach.id} 
            className={`p-3.5 rounded-2xl flex items-center gap-4 border transition-all ${ach.unlocked ? 'bg-white border-yellow-200 shadow-sm scale-[0.99]' : 'bg-slate-100 border-slate-200 opacity-60 grayscale-[80%]'}`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0 ${ach.unlocked ? 'bg-yellow-100' : 'bg-slate-200'}`}>
              {ach.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-black text-sm truncate ${ach.unlocked ? 'text-slate-900' : 'text-slate-500'}`}>{ach.title}</h3>
              <p className="text-xs text-slate-500 leading-tight mt-0.5">{ach.description}</p>
            </div>
            {ach.unlocked && <Check className="text-emerald-500 shrink-0" size={18} />}
          </div>
        ))}
      </div>
      
      <div className="pt-3 shrink-0">
        <button 
          onClick={() => { setGameState('start'); soundEffects.click(); }}
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
        >
          Go to Main Page / Leave Game
        </button>
      </div>
    </motion.div>
  );

  // SECTION 4 - REC 17: Interactive Safety Manual (Encyclopedia)
  const renderEncyclopedia = () => {
    // Collect all scenarios and filter them dynamically based on category and search query
    const categories = ['all', 'Kitchen', 'LOTO', 'PPE', 'Equipment', 'Operations', 'Compliance', 'Office'];
    const filtered = SCENARIOS.filter(s => {
      const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
      const matchSearch = s.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (s.explanation && s.explanation.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="flex flex-col h-full max-w-md mx-auto px-4 py-6 w-full"
      >
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="text-blue-500" size={24} />
            <h2 className="text-xl font-black text-slate-900 leading-tight">Compliance Manual</h2>
          </div>
          <button 
            onClick={() => { setGameState('start'); soundEffects.click(); }}
            className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-900 border border-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search bar */}
        <div className="mb-3 shrink-0">
          <input 
            type="text" 
            placeholder="Search regulations & guidelines..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Horizontal Category Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 shrink-0 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); soundEffects.click(); }}
              className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap border transition-all ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white border-blue-700 shadow-sm' 
                  : 'bg-white text-slate-500 hover:bg-slate-50 border-slate-200'
              }`}
            >
              {cat === 'all' ? 'View All' : cat}
            </button>
          ))}
        </div>

        {/* Scenario List */}
        <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar pr-1 pb-4">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left mb-1">
            Scenarios Unlocked ({filtered.length})
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No guidelines match your filters.
            </div>
          ) : (
            filtered.map((s) => (
              <div 
                key={s.id} 
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${s.isSafe ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                    {s.isSafe ? '✓ Safe Standard' : '✕ Hazard warning'}
                  </span>
                  <span className="text-[8px] font-black uppercase text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">{s.category || 'Compliance'}</span>
                </div>
                <h4 className="text-xs font-black text-slate-800 leading-relaxed mb-2 font-sans">{s.text}</h4>
                <div className="bg-slate-50/70 p-2.5 rounded-xl border border-dashed border-slate-100">
                  <p className="text-[10px] font-bold text-slate-500 leading-relaxed"><span className="text-indigo-600 font-extrabold uppercase text-[9px] tracking-wider block mb-0.5">Official Protocol:</span>{s.explanation}</p>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="pt-3 shrink-0">
          <button 
            onClick={() => { setGameState('start'); soundEffects.click(); }}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            Go to Main Page / Leave Game
          </button>
        </div>
      </motion.div>
    );
  };

  // SECTION 4 - REC 19 & 20: Performance Analytics & Simulated Leaderboards
  const renderStats = () => {
    // Chart rendering block
    const renderRecentScoresChart = () => {
      if (recentScores.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center py-6 text-slate-400 text-xs">
            <FileText size={24} className="mb-2 opacity-50 text-indigo-400" />
            No runs recorded. Play a match first!
          </div>
        );
      }
      // Line plot using native inline SVG points
      const width = 320;
      const height = 110;
      const paddingX = 25;
      const paddingY = 15;
      const maxScore = Math.max(...recentScores, 1000);
      const minScore = 0;
      
      const chartPoints = [...recentScores].reverse().map((sc, idx) => {
        const x = paddingX + (idx / Math.max(recentScores.length - 1, 1)) * (width - paddingX * 2);
        const y = height - paddingY - ((sc - minScore) / (maxScore - minScore)) * (height - paddingY * 2);
        return `${x},${y}`;
      }).join(' ');

      return (
        <div className="bg-white border border-slate-100 rounded-2xl p-3.5 w-full shadow-xs mb-4">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex justify-between">
            <span>Score progression timeline</span>
            <span>Peak: {maxScore} pts</span>
          </div>
          <svg className="w-full h-24 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0"/>
              </linearGradient>
            </defs>
            {/* Grid Helper lines */}
            <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#f1f5f9" strokeDasharray="3" />
            <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="#f1f5f9" strokeDasharray="3" />
            <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#f1f5f9" strokeDasharray="3" />
            
            {/* Gradient fill */}
            <path
              d={`M ${paddingX},${height - paddingY} L ${chartPoints} L ${width - paddingX},${height - paddingY} Z`}
              fill="url(#chartGrad)"
            />
            {/* Solid stroke path */}
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={chartPoints}
            />
            {/* Interactive nodes */}
            {[...recentScores].reverse().map((sc, idx) => {
              const x = paddingX + (idx / Math.max(recentScores.length - 1, 1)) * (width - paddingX * 2);
              const y = height - paddingY - ((sc - minScore) / (maxScore - minScore)) * (height - paddingY * 2);
              return (
                <g key={idx}>
                  <circle
                    cx={x}
                    cy={y}
                    r="4.5"
                    className="fill-blue-600 stroke-white stroke-2"
                  />
                </g>
              );
            })}
          </svg>
          <div className="text-[8px] text-slate-400 mt-2 text-center font-bold uppercase tracking-widest">
            ← Older Swipes —————— Active Record →
          </div>
        </div>
      );
    };

    // Calculate dynamic decision metrics
    const avgSpeed = decisionSpeeds.length > 0 
      ? Math.round(decisionSpeeds.reduce((a, b) => a + b, 0) / decisionSpeeds.length)
      : 1250;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="flex flex-col h-full max-w-md mx-auto px-4 py-6 w-full"
      >
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-500 animate-pulse" size={24} />
            <h2 className="text-xl font-black text-slate-900 leading-tight">Safety Leaderboard</h2>
          </div>
          <button 
            onClick={() => { setGameState('start'); soundEffects.click(); }}
            className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-900 border border-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 no-scrollbar space-y-4 pb-6">
          {/* Sparkline Graphic */}
          {renderRecentScoresChart()}

          {/* Quick Metrics Bento Row */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gradient-to-tr from-emerald-50 to-emerald-100 p-3 rounded-2xl border border-emerald-200 text-left">
              <span className="text-[8px] font-black uppercase text-emerald-700 tracking-wider">Audit Precision</span>
              <div className="text-2xl font-black text-emerald-800 leading-none mt-1">94.8%</div>
              <span className="text-[8px] font-bold text-emerald-600 block mt-1">Compliant decision rating</span>
            </div>
            <div className="bg-gradient-to-tr from-amber-50 to-amber-100 p-3 rounded-2xl border border-amber-200 text-left">
              <span className="text-[8px] font-black uppercase text-amber-700 tracking-wider">Response Speed</span>
              <div className="text-2xl font-black text-amber-800 leading-none mt-1">{avgSpeed}ms</div>
              <span className="text-[8px] font-bold text-amber-600 block mt-1">Average compliance time</span>
            </div>
          </div>

          {/* Leaderboard entries */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 text-left">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex justify-between">
              <span>Practitioner Standings</span>
              <span>Regional Zone</span>
            </div>
            <div className="space-y-2.5">
              {leaderboard.map((user, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-5 h-5 rounded-md font-bold text-xs flex items-center justify-center shrink-0 ${
                      idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                      idx === 1 ? 'bg-slate-200 text-slate-700' :
                      idx === 2 ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-50 text-slate-400'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-800 truncate">{user.name}</div>
                      <div className="text-[8px] font-bold text-slate-400 truncate uppercase">{user.rank}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-black text-slate-800 tabular-nums">{user.score} pts</div>
                    <div className="text-[8px] font-semibold text-slate-400 uppercase">{user.mode}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate download shortcut */}
          <button
            onClick={() => { setGameState('certificate'); soundEffects.click(); }}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-sm mb-2"
          >
            <Award size={15} /> Open Official Training Certificate
          </button>

          <button 
            onClick={() => { setGameState('start'); soundEffects.click(); }}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-sm"
          >
            Go to Main Page / Leave Game
          </button>

          <div className="mt-4 pt-4 border-t border-slate-100 w-full text-center">
            {showClearConfirm ? (
              <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-left">
                <span className="text-[10px] font-black text-red-700 uppercase tracking-wider block">⚠️ Permanent Action</span>
                <p className="text-[10px] text-red-600 font-medium leading-relaxed mt-0.5">Are you sure you want to wipe all high scores, daily records, and inspections?</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      localStorage.removeItem('safetySwipeHighScore');
                      localStorage.removeItem('safetySwipeRecentScores');
                      localStorage.setItem('safetySwipeSeenTutorial', 'false');
                      setHighScore(0);
                      setRecentScores([]);
                      setShowClearConfirm(false);
                      soundEffects.incorrect();
                    }}
                    className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-[9px] uppercase tracking-wider text-center"
                  >
                    Yes, Wipe All Data
                  </button>
                  <button
                    onClick={() => { setShowClearConfirm(false); soundEffects.click(); }}
                    className="flex-1 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold text-[9px] uppercase tracking-wider text-center"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { setShowClearConfirm(true); soundEffects.click(); }}
                className="text-[10px] font-black text-red-500 hover:text-red-700 uppercase tracking-widest transition-colors py-1 inline-block"
              >
                🗑️ Clear Leaderboards & Reset Records
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // SECTION 5 - REC 25: Official Certification of Safety Practitioner (Certificate generator)
  const renderCertificate = () => {
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="flex flex-col h-full max-w-md mx-auto px-4 py-6 w-full justify-between overflow-y-auto no-scrollbar"
      >
        <div className="flex justify-between items-center mb-2 shrink-0">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Training Portal</span>
          <button 
            onClick={() => { setGameState('stats'); soundEffects.click(); }}
            className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-900 border border-slate-200"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Certificate Card layout */}
        <div className="bg-amber-50/20 border-4 border-amber-800/20 rounded-3xl p-6 shadow-xl text-center relative overflow-hidden flex-1 flex flex-col justify-between my-2">
          {/* Subtle decoration elements */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-200/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200/10 rounded-full blur-xl"></div>

          <div>
            <div className="flex justify-center mb-3">
              <Award className="text-amber-600 animate-pulse" size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-base font-bold text-amber-900 uppercase tracking-widest leading-none font-sans mb-1">Certificate of Achievement</h2>
            <p className="text-[8px] text-slate-400 uppercase tracking-widest font-black">Authorized Safety Compliance Program</p>
          </div>

          <div className="my-4">
            <p className="text-[9px] text-slate-500 italic">This official training award is hereby presented to</p>
            <h3 className="text-2xl font-black text-slate-900 font-serif border-b border-dashed border-amber-800/30 py-2 inline-block px-8 max-w-full truncate">
              👷 {playerName || "Safety Inspector"}
            </h3>
            <p className="text-[9px] text-slate-600 font-bold leading-relaxed max-w-xs mx-auto mt-3">
              For completing standard electrical risk inspection protocols with an exemplary peak compliance rating of <span className="text-indigo-600 font-extrabold">{highScore} points</span>.
            </p>
            {/* Game Difficulty & Mode Badges */}
            <div className="flex flex-wrap justify-center gap-1 mt-3">
              <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                {gameMode === 'industrial' ? 'Industrial' : 'General'} Module
              </span>
              <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                {timeDifficulty === 'blitz' ? '⚡ Blitz Speed' : timeDifficulty === 'relaxed' ? 'Relaxed Speed' : 'Standard Speed'}
              </span>
              <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                {isPractice ? 'Practice' : isSuddenDeath ? 'Sudden Death' : 'Classic Mode'}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-slate-200/50 pt-4">
            <div className="text-left">
              <span className="text-[8px] text-slate-400 uppercase tracking-widest font-black block">Completion Date</span>
              <span className="text-[10px] font-extrabold text-slate-700">{formattedDate}</span>
            </div>
            {/* Digital Seal stamp */}
            <div className="w-14 h-14 border-4 border-double border-amber-600 text-amber-600 rounded-full flex flex-col items-center justify-center rotate-12 shrink-0">
              <span className="text-[6px] font-black uppercase">Official</span>
              <Star size={10} className="fill-amber-600" />
              <span className="text-[6px] font-black uppercase">Approved</span>
            </div>
            <div className="text-right">
              <span className="text-[8px] text-slate-400 uppercase tracking-widest font-black block">Safety Rank</span>
              <span className="text-[10px] font-extrabold text-slate-700">{rankInfo.badge} {rankInfo.title}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-2 shrink-0">
          <p className="text-[10px] text-slate-400 font-bold text-center leading-none">Screenshot this certificate to share with your compliance officer!</p>
          <button
            onClick={() => {
              window.print();
              soundEffects.click();
            }}
            className="w-full py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-md"
          >
            <Download size={14} /> Print / Save PDF
          </button>
          
          <button 
            onClick={() => { setGameState('start'); soundEffects.click(); }}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold text-xs flex items-center justify-center gap-1 transition-all"
          >
            Go to Main Page / Leave Game
          </button>
        </div>
      </motion.div>
    );
  };

  const renderGame = () => (
    <div className="flex flex-col items-center justify-between w-full h-full max-w-xl mx-auto relative">
      {/* PERFECT / CORRECT splash text notification popups (Pragmatic & satisfying) */}
      <AnimatePresence>
        {showPerfectAnim && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -40, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-[150px] z-40 bg-slate-950/95 backdrop-blur-md text-white border border-yellow-400/40 px-5 py-2.5 rounded-full shadow-2xl font-black text-sm uppercase tracking-widest flex items-center gap-1.5"
          >
            <span>{showPerfectAnim}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STREAK MULTIPLIER Splash announcements */}
      <AnimatePresence>
        {streakSplash && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="absolute top-[80px] z-40 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-2xl shadow-2xl border border-indigo-400/30 text-center"
          >
            <div className="text-sm font-black uppercase tracking-widest leading-none">{streakSplash}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleek, space-efficient premium top HUD (Always 1 row!) */}
      <div className="w-full flex items-center justify-between bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 sm:py-3 shadow-sm border border-slate-100 mb-2 gap-2 shrink-0">
        {/* Left: Score Badge */}
        <div className="flex items-center gap-1.5">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-xl shrink-0 flex items-center justify-center">
            <Zap size={14} className="fill-blue-500" />
          </div>
          <div>
            <div className="text-[8px] uppercase tracking-wider text-slate-400 font-black leading-none">Score</div>
            <div className="text-sm sm:text-base font-black text-slate-800 tabular-nums leading-none mt-0.5">{score}</div>
          </div>
        </div>

        {/* Center: Streak Badge & Lives */}
        <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 px-2 sm:px-3 py-1 rounded-xl border border-slate-100 shrink-0">
          <div className="flex items-center gap-0.5">
            <motion.span 
              animate={streak > 0 ? {
                scale: [1, 1.25, 1],
                filter: ['drop-shadow(0 0 0px rgba(249,115,22,0))', 'drop-shadow(0 0 6px rgba(249,115,22,0.8))', 'drop-shadow(0 0 0px rgba(249,115,22,0))']
              } : {}}
              transition={streak > 0 ? {
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut"
              } : {}}
              className="text-xs sm:text-sm"
            >
              🔥
            </motion.span>
            <span className={`text-xs font-black tabular-nums transition-colors ${streak >= 10 ? 'text-red-600 font-extrabold animate-pulse' : streak >= 5 ? 'text-orange-600 font-extrabold' : 'text-slate-600'}`}>
              x{streak}
            </span>
          </div>
          <div className="h-3 w-px bg-slate-200"></div>
          
          {/* Health section / Lives Display */}
          <div className="flex gap-0.5">
            {isPractice ? (
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest leading-none bg-indigo-50 px-1.5 py-0.5 rounded">Practice</span>
            ) : (
              [...Array(isSuddenDeath ? 1 : 3)].map((_, i) => (
                <span key={i} className="text-xs sm:text-sm transition-all duration-300 filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                  {i < lives ? '❤️' : '🖤'}
                </span>
              ))
            )}
          </div>

          {/* Life Shield indicator (Section 1, Rec 2) */}
          {!isPractice && !isSuddenDeath && (
            <>
              <div className="h-3 w-px bg-slate-200"></div>
              <div className="flex items-center" title="LOTO Safety Shield absorbs one mistake!">
                <motion.div
                  animate={shields > 0 ? {
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={shields > 0 ? {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  } : {}}
                >
                  <Shield size={14} className={`transition-all ${shields > 0 ? 'text-blue-500 fill-blue-500/30 drop-shadow-[0_0_4px_rgba(59,130,246,0.5)]' : 'text-slate-300 opacity-45'}`} />
                </motion.div>
                <span className="text-[9px] font-black text-slate-500 ml-0.5 tabular-nums">{shields}</span>
              </div>
            </>
          )}
        </div>

        {/* Right: Best Score & Pause button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-right">
            <div>
              <div className="text-[8px] uppercase tracking-wider text-slate-400 font-black leading-none">Best</div>
              <div className="text-sm sm:text-base font-black text-slate-700 tabular-nums leading-none mt-0.5">
                {highScore > score ? highScore : score}
              </div>
            </div>
            <div className="p-1.5 bg-yellow-50 text-yellow-600 rounded-xl shrink-0 flex items-center justify-center">
              <Trophy size={14} className="fill-yellow-400/20 text-yellow-500" />
            </div>
          </div>
          <button 
            onClick={() => { if (confirm("Leave current game and return to main menu? Your progress will not be saved.")) { setGameState('start'); soundEffects.click(); } }}
            className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-[10px] font-black uppercase shrink-0 border border-red-100"
            title="Leave Game"
          >
            Leave
          </button>
          <button 
            onClick={() => { setIsPaused(true); soundEffects.click(); }}
            className="p-1.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors text-slate-600"
            title="Pause Game"
          >
            <Pause size={14} />
          </button>
        </div>
      </div>

      {/* Glossy Progress Bar - Sleek and integrated closely */}
      {!isPractice && (
        <motion.div 
          className="w-full h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden mb-2 sm:mb-4 shadow-inner shrink-0 border border-slate-50 relative"
          animate={timeLeft < 3000 ? {
            scale: [1, 1.02, 1],
            borderColor: ['rgba(226,232,240,1)', 'rgba(239,68,68,0.5)', 'rgba(226,232,240,1)'],
          } : {}}
          transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div 
            className={`h-full rounded-full ${timeLeft < 3000 ? 'bg-gradient-to-r from-red-500 to-rose-600 shadow-[0_0_12px_rgba(239,68,68,0.8)] animate-pulse' : 'bg-gradient-to-r from-blue-400 to-indigo-500'}`}
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / timeLimit) * 100}%` }}
            transition={{ ease: "linear", duration: 0.05 }}
          />
        </motion.div>
      )}

      {/* Cards Area - Highly Responsive height container */}
      <div className="relative flex-1 w-full max-w-md h-[400px] sm:h-[460px] md:h-[500px] my-1 sm:my-2">
        <div className="absolute inset-x-2 bottom-[-10px] top-[10px] bg-white rounded-[32px] sm:rounded-[40px] shadow-md border border-slate-100 rotate-2 -z-10 opacity-70"></div>
        <div className="absolute inset-x-1 bottom-[-5px] top-[5px] bg-white rounded-[32px] sm:rounded-[40px] shadow-lg border border-slate-100 -rotate-1 -z-10 opacity-90"></div>
        {deck.length > 0 && (
          <SwipeCard 
            key={deck[currentIndex].id}
            scenario={deck[currentIndex]} 
            onSwipe={handleGuess}
            leaveX={leaveX}
          />
        )}
      </div>

      {/* Controller-Style Premium Action Buttons */}
      <div className="w-full flex justify-center items-center gap-8 sm:gap-14 mt-3 sm:mt-6 pb-2 sm:pb-4 shrink-0">
        {/* Left: HAZARD Button */}
        <button 
          onClick={() => handleButtonSwipe('left')}
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white border border-red-100 text-red-500 flex items-center justify-center shadow-[0_8px_20px_rgba(239,68,68,0.12)] hover:shadow-[0_12px_28px_rgba(239,68,68,0.22)] hover:scale-105 active:scale-95 hover:bg-red-50 transition-all cursor-pointer group"
          title="Hazard (Swipe Left / Keyboard Left)"
        >
          <X size={20} className="sm:size-24 md:size-28 stroke-[3.5px] group-hover:rotate-12 transition-transform" />
        </button>

        {/* Right: SAFE Button */}
        <button 
          onClick={() => handleButtonSwipe('right')}
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white border border-emerald-100 text-emerald-500 flex items-center justify-center shadow-[0_8px_20px_rgba(16,185,129,0.12)] hover:shadow-[0_12px_28px_rgba(16,185,129,0.22)] hover:scale-105 active:scale-95 hover:bg-emerald-50 transition-all cursor-pointer group"
          title="Safe (Swipe Right / Keyboard Right)"
        >
          <Check size={20} className="sm:size-24 md:size-28 stroke-[3.5px] group-hover:scale-110 transition-transform" />
        </button>
      </div>
      
      {/* Keyboard Control Indicator QoL (Section 5, Rec 21) */}
      <div className="hidden sm:block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2 shrink-0">
        Desktop Tips: Play with Left/Right Arrow keys • ESC to pause
      </div>
    </div>
  );

  const renderModal = () => (
    <AnimatePresence>
      {gameState === 'explanation' && explanation && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            className="bg-white p-6 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-slate-100"
          >
            {/* Conditional shield layout versus hazard mistakes */}
            {explanation.title === "🛡️ Shield Absorbed!" ? (
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                <Shield size={34} strokeWidth={2.5} className="fill-blue-500/10 animate-bounce" />
              </div>
            ) : explanation.title === "💡 Practice Hint" ? (
              <div className="w-16 h-16 mx-auto bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                <BookOpen size={32} />
              </div>
            ) : (
              <div className="w-16 h-16 mx-auto bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mb-5">
                <X size={34} strokeWidth={3} />
              </div>
            )}

            <h2 className={`text-xl font-black mb-2 ${
              explanation.title === "🛡️ Shield Absorbed!" ? 'text-blue-700' :
              explanation.title === "💡 Practice Hint" ? 'text-violet-700' : 'text-slate-950'
            }`}>
              {explanation.title || "Ouch!"}
            </h2>
            
            <p className="text-slate-600 text-xs leading-relaxed mb-6 font-medium text-left bg-slate-50 p-3 rounded-xl border border-slate-100">
              {explanation.text}
            </p>

            <button 
              onClick={closeExplanation}
              className="w-full py-3.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              id="btn-explanation-continue"
            >
              {lives > 0 || isPractice ? 'Understood & Continue' : 'Finish Run'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // SECTION 5 - REC 24: Pause & Resume Menu (Goals Panel)
  const renderPauseOverlay = () => (
    <AnimatePresence>
      {isPaused && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 10 }}
            className="bg-white p-6 rounded-3xl shadow-2xl max-w-sm w-full border border-slate-100"
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-black text-slate-900 leading-none mb-1">Audit Suspended</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active session is paused</p>
            </div>

            {/* Daily Quests / Active Goals panel in pause menu (Section 1, Rec 3) */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-5">
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 text-left">Active Session Missions</div>
              <div className="space-y-2.5">
                {missions.map(m => (
                  <div key={m.id} className="flex gap-2.5 items-start text-left">
                    <span className="text-lg leading-none">{m.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-extrabold text-slate-800 flex justify-between">
                        <span>{m.title}</span>
                        <span>{m.completed ? '✓ Unlocked' : `${m.current}/${m.target}`}</span>
                      </div>
                      <div className="w-full h-1 bg-slate-200 rounded-full mt-1 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${m.completed ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                          style={{ width: `${Math.min((m.current / m.target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick settings inside pause menu */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button
                onClick={toggleSound}
                className="py-2 px-3 border border-slate-200 hover:bg-slate-50 transition-all rounded-xl text-slate-600 text-[10px] font-extrabold uppercase flex items-center justify-center gap-1.5"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                {isMuted ? 'Muted' : 'Sound On'}
              </button>
              <button
                onClick={toggleHighContrast}
                className={`py-2 px-3 border transition-all rounded-xl text-[10px] font-extrabold uppercase flex items-center justify-center gap-1.5 ${
                  isHighContrast ? 'bg-slate-900 text-white border-slate-950' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Settings size={14} />
                {isHighContrast ? 'Contrast High' : 'Contrast Normal'}
              </button>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => { setIsPaused(false); soundEffects.click(); }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1"
                id="btn-resume-game"
              >
                Resume Compliance Run
              </button>
              <button
                onClick={() => { setIsPaused(false); setGameState('start'); soundEffects.click(); }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1"
                id="btn-quit-game"
              >
                Quit and Return Home
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // SECTION 5 - REC 22: Interactive Onboarding Tutorial
  const renderTutorialPopup = () => (
    <AnimatePresence>
      {showTutorial && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 15 }}
            className="bg-white p-6 rounded-3xl shadow-2xl max-w-sm w-full border border-slate-100 text-center"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Compliance Academy</span>
              <button 
                onClick={() => { setShowTutorial(false); localStorage.setItem('safetySwipeSeenTutorial', 'true'); soundEffects.click(); }}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            {/* Active Tutorial Steps */}
            {tutorialStep === 0 && (
              <div className="space-y-4">
                <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <X size={28} strokeWidth={2.5} />
                </div>
                <h4 className="text-base font-black text-slate-800 leading-none">Swipe Left is HAZARD</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  When you inspect a card with a dangerous violation (unlabeled breakers, water near electrical outlets, exposed conductors), swipe the card to the <span className="font-extrabold text-red-500">LEFT</span>!
                </p>
              </div>
            )}

            {tutorialStep === 1 && (
              <div className="space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <Check size={28} strokeWidth={2.5} />
                </div>
                <h4 className="text-base font-black text-slate-800 leading-none">Swipe Right is SAFE</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  When the scenario represents fully compliant gear or correct LOTO protocol (insulated safety mats, calibrated multimeters, lock labels), swipe the card to the <span className="font-extrabold text-emerald-500">RIGHT</span>!
                </p>
              </div>
            )}

            {tutorialStep === 2 && (
              <div className="space-y-4">
                <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <Shield size={28} className="fill-blue-500/10" />
                </div>
                <h4 className="text-base font-black text-slate-800 leading-none">Safety Safeguards</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Classic Mode starts you with 1 Life Shield. Letting the timer count down to zero or ignoring hazards costs a life, but your Life Shield can absorb one mistake automatically! Get a 5-streak to recharge it.
                </p>
              </div>
            )}

            {/* Stepper Dots & Navigation */}
            <div className="flex justify-center gap-1.5 my-5">
              {[0, 1, 2].map(idx => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${tutorialStep === idx ? 'w-5 bg-blue-600' : 'bg-slate-200'}`}
                />
              ))}
            </div>

            <div className="flex gap-2.5">
              {tutorialStep > 0 ? (
                <button
                  onClick={() => { setTutorialStep(prev => prev - 1); soundEffects.click(); }}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold text-xs rounded-xl transition-all"
                >
                  Previous
                </button>
              ) : null}
              
              <button
                onClick={() => {
                  if (tutorialStep < 2) {
                    setTutorialStep(prev => prev + 1);
                    soundEffects.click();
                  } else {
                    setShowTutorial(false);
                    localStorage.setItem('safetySwipeSeenTutorial', 'true');
                    soundEffects.perfect();
                  }
                }}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-all"
              >
                {tutorialStep === 2 ? "Ready to Certify!" : "Next Lesson"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // SECTION 3 - REC 12: Bento-Style Post-Game Summary Dashboard
  const renderGameOver = () => {
    // Analytics calculations
    const totalDecisions = correctCount + incorrectCount;
    const accuracy = totalDecisions > 0
      ? Math.round((correctCount / totalDecisions) * 100)
      : 0;
    
    const speedMs = decisionSpeeds.length > 0
      ? Math.round(decisionSpeeds.reduce((a, b) => a + b, 0) / decisionSpeeds.length)
      : 1250;

    if (showMistakesReview) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="flex flex-col h-full max-w-md mx-auto px-4 py-4 w-full justify-between"
        >
          <div className="flex justify-between items-center mb-3 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl">🕵️</span>
              <h2 className="text-lg font-black text-slate-900 leading-tight">Mistakes Inspector</h2>
            </div>
            <button 
              onClick={() => { setShowMistakesReview(false); soundEffects.click(); }}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-[9px] font-black uppercase tracking-wider text-slate-600 transition-all flex items-center gap-1"
            >
              Back to Score
            </button>
          </div>

          <p className="text-[10px] text-slate-500 font-medium mb-3 shrink-0 text-left">
            Review the {sessionMistakes.length} safety violations you misidentified during your inspection run. Correct standard guidelines are highlighted below:
          </p>

          <div className="flex-1 overflow-y-auto pr-1 no-scrollbar space-y-3 pb-4">
            {sessionMistakes.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-xs flex flex-col items-center justify-center h-48">
                <span className="text-3xl mb-2">⭐</span>
                <h4 className="text-sm font-black text-slate-800 leading-none">Perfect Compliance!</h4>
                <p className="text-xs text-slate-400 mt-1.5">You identified every single safety hazard correctly!</p>
              </div>
            ) : (
              sessionMistakes.map((item, idx) => {
                const isSafeCorrect = item.scenario.isSafe;
                return (
                  <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-3.5 text-left shadow-2xs relative overflow-hidden flex flex-col gap-2">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />
                    
                    {/* Header line with category & swipe info */}
                    <div className="flex items-center justify-between">
                      <span className="text-[7.5px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                        {item.scenario.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-[8.5px] font-extrabold uppercase">
                        <span className="text-red-500">Your Swipe: {item.userGuess === 'timeout' ? '⌛ TIME OUT' : item.userGuess === 'left' ? '⚠️ HAZARD' : '✅ SAFE'}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-emerald-600">Correct: {isSafeCorrect ? '✅ SAFE' : '⚠️ HAZARD'}</span>
                      </div>
                    </div>

                    {/* Scenario Text */}
                    <p className="text-[11px] font-bold text-slate-800 leading-normal">
                      "{item.scenario.text}"
                    </p>

                    {/* Explanation */}
                    <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100/50">
                      <div className="text-[7px] font-black text-indigo-600 uppercase tracking-widest mb-0.5">Safety Guideline</div>
                      <p className="text-[10px] font-medium text-slate-600 leading-relaxed">
                        {item.scenario.explanation}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <button 
            onClick={() => { setShowMistakesReview(false); soundEffects.click(); }}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm mt-2 flex items-center justify-center gap-1.5"
          >
            Finished Review
          </button>
        </motion.div>
      );
    }

    const getCertificateComment = (s: number) => {
      if (s >= 350) {
        return {
          level: "Chief Safety Engineer",
          text: "Elite certification! Exemplary precision, flawless hazard assessment, and rapid decision-making under time constraints. Your dedication to zero-harm standards ensures maximum workplace and industrial compliance."
        };
      } else if (s >= 150) {
        return {
          level: "Safety Auditor",
          text: "Outstanding safety competence! Your high decision accuracy and quick reflexes demonstrate an exceptional understanding of hazard warning protocols and risk management systems."
        };
      } else if (s >= 50) {
        return {
          level: "Safety Inspector",
          text: "Strong hazard awareness! You possess the fundamental knowledge and vigilance necessary to identify, evaluate, and mitigate standard residential and industrial electrical risks."
        };
      } else {
        return {
          level: "Apprentice Inspector",
          text: "Competent basic understanding. Further study of electrical safety protocols, insulation barriers, and lockout/tagout procedures is recommended to enhance workplace compliance."
        };
      }
    };

    const downloadCertificate = () => {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const width = 297;
      const height = 210;

      // 1. Draw soft elegant background color
      doc.setFillColor(253, 253, 250); // Cream/ivory background
      doc.rect(0, 0, width, height, 'F');

      // 2. Draw thick outer slate border
      doc.setDrawColor(15, 23, 42); // slate-900
      doc.setLineWidth(1.5);
      doc.rect(10, 10, width - 20, height - 20, 'S');

      // 3. Draw inner gold border
      doc.setDrawColor(217, 119, 6); // amber-600
      doc.setLineWidth(0.6);
      doc.rect(13, 13, width - 26, height - 26, 'S');

      // 4. Draw elegant corner flourishes (simple classic line decorations)
      const corners = [
        { x: 13, y: 13, dx: 10, dy: 10 },
        { x: width - 13, y: 13, dx: -10, dy: 10 },
        { x: 13, y: height - 13, dx: 10, dy: -10 },
        { x: width - 13, y: height - 13, dx: -10, dy: -10 }
      ];
      doc.setDrawColor(217, 119, 6);
      doc.setLineWidth(0.4);
      corners.forEach(c => {
        doc.line(c.x, c.y, c.x + c.dx, c.y);
        doc.line(c.x, c.y, c.x, c.y + c.dy);
      });

      // 5. Title & Headers
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(26);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text('CERTIFICATE OF GAME ACHIEVEMENT', width / 2, 35, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(180, 83, 9); // amber-700
      doc.text('ELECTRICAL HAZARD ASSESSMENT & INDUSTRIAL COMPLIANCE', width / 2, 43, { align: 'center' });

      // Decorative divider line
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.5);
      doc.line(80, 48, width - 80, 48);

      // Presentation text
      doc.setFont('helvetica', 'oblique');
      doc.setFontSize(12);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text('This is officially awarded to', width / 2, 58, { align: 'center' });

      // Candidate Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(28);
      doc.setTextColor(67, 56, 202); // indigo-700
      const nameText = (playerName || 'Safety Inspector').trim();
      doc.text(nameText, width / 2, 73, { align: 'center' });

      // Underline name elegantly
      doc.setDrawColor(67, 56, 202);
      doc.setLineWidth(1.0);
      const nameWidth = Math.max(80, doc.getTextWidth(nameText) + 20);
      doc.line(width / 2 - nameWidth / 2, 77, width / 2 + nameWidth / 2, 77);

      // Achievement Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(71, 85, 105); // slate-600
      doc.text(
        'for successfully demonstrating professional competency, hazard warning identification,',
        width / 2,
        88,
        { align: 'center' }
      );
      doc.text(
        `and compliant decision-making under active time limits in the ${gameMode === 'industrial' ? 'Industrial' : 'General'} Safety Protocol module.`,
        width / 2,
        94,
        { align: 'center' }
      );

      // Score Banner
      doc.setFillColor(241, 245, 249); // slate-100
      doc.rect(50, 101, width - 100, 24, 'F');
      doc.setDrawColor(203, 213, 225); // slate-300
      doc.setLineWidth(0.3);
      doc.rect(50, 101, width - 100, 24, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text(
        `GAME SCORE: ${score} PTS   |   PRECISION: ${accuracy}%   |   RANK: ${rankInfo.title.toUpperCase()}`,
        width / 2,
        110,
        { align: 'center' }
      );

      const speedText = timeDifficulty === 'blitz' ? 'BLITZ (1.5x SPEED)' : timeDifficulty === 'relaxed' ? 'RELAXED (0.5x SPEED)' : 'STANDARD';
      const modeText = isPractice ? 'PRACTICE (NO TIMER)' : isSuddenDeath ? 'SUDDEN DEATH (1 LIFE)' : 'CLASSIC (3 LIVES)';
      const moduleText = gameMode === 'industrial' ? 'INDUSTRIAL' : 'GENERAL';

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105); // slate-600
      doc.text(
        `CHALLENGE LEVEL: ${speedText}   |   MODULE: ${moduleText} MODULE   |   MODE: ${modeText}`,
        width / 2,
        118,
        { align: 'center' }
      );

      // Evaluation Comment as per score
      const comment = getCertificateComment(score);
      doc.setFont('helvetica', 'oblique');
      doc.setFontSize(9.5);
      doc.setTextColor(100, 116, 139); // slate-500
      const commentLines = doc.splitTextToSize(comment.text, 200);
      doc.text(commentLines, width / 2, 134, { align: 'center' });

      // Bottom Decorative elements: Signatures & Golden Seal

      // Left Signature (Game Name)
      doc.setDrawColor(148, 163, 184); // slate-400
      doc.setLineWidth(0.5);
      doc.line(40, 168, 100, 168);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text('Safety Swipe Game', 70, 173, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text('Compliance Challenge Program', 70, 178, { align: 'center' });

      // Right Signature (URL Address)
      doc.setDrawColor(148, 163, 184);
      doc.setLineWidth(0.5);
      doc.line(197, 168, 257, 168);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text('safetyswipe.netlify.app', 227, 173, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
      doc.text(`ISSUED: ${dateStr.toUpperCase()}`, 227, 178, { align: 'center' });

      // Document URL Footer
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text('Official Platform URL: safetyswipe.netlify.app', width / 2, 196, { align: 'center' });

      // Middle Seal
      const sealX = width / 2;
      const sealY = 168;

      // Outer star burst
      doc.setFillColor(245, 158, 11); // amber-500
      doc.circle(sealX, sealY, 14, 'F');
      
      doc.setFillColor(217, 119, 6); // amber-600
      doc.circle(sealX, sealY, 13, 'F');

      doc.setFillColor(251, 191, 36); // amber-400
      doc.circle(sealX, sealY, 11.5, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(180, 83, 9); // amber-700
      doc.text('SECURED', sealX, sealY - 1.5, { align: 'center' });
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6);
      doc.setTextColor(146, 64, 14); // amber-800
      doc.text('COMPLIANT', sealX, sealY + 2.5, { align: 'center' });

      // Small star or dot in middle
      doc.setFontSize(10);
      doc.text('★', sealX, sealY + 0.8, { align: 'center' });

      // Download file
      const safeName = nameText.toLowerCase().replace(/[^a-z0-9]/g, '_');
      doc.save(`safety_swipe_certificate_${safeName}.pdf`);

      // Golden Celebration Confetti Burst!
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.65 },
          colors: ['#fbbf24', '#f59e0b', '#d97706', '#fef3c7', '#ffffff']
        });
      } catch (e) {}
    };

    const shareOnSocial = (platform: 'linkedin' | 'facebook' | 'whatsapp' | 'instagram') => {
      soundEffects.click();
      const shareUrl = window.location.href;
      const text = `I just scored ${score} points in Safety Swipe! Can you beat me? ⚡🔌`;
      
      if (platform === 'linkedin') {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
      } else if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
      } else if (platform === 'whatsapp') {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + shareUrl)}`, '_blank');
      } else if (platform === 'instagram') {
        navigator.clipboard.writeText(text);
        alert("Score details copied to clipboard! Open Instagram and paste it in your story or direct message. 📸⚡");
      }
    };

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className="flex flex-col items-center justify-between h-full max-w-md mx-auto px-4 py-2 w-full overflow-hidden select-none"
      >
        <div className="flex flex-col items-center w-full">
          {/* Compact Header */}
          <div className="flex items-center gap-1.5 mb-0.5 shrink-0">
            <span className="text-xl sm:text-2xl">👷</span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">Evaluation Over</h1>
          </div>
          <p className="text-[9px] sm:text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-2 shrink-0">
            Inspection Complete: 👷 {playerName || 'Inspector'}
          </p>
          
          {/* Bento-style post-game grid summary layout (Section 3, Rec 12) - Extremely compact */}
          <div className="grid grid-cols-2 gap-1.5 w-full mb-2 text-left">
            {/* Total Points - Horizontal flex layout */}
            <div className="bg-slate-900 text-white px-3 py-2 rounded-xl col-span-2 flex items-center justify-between relative overflow-hidden">
              <div>
                <span className="text-[7px] font-black uppercase text-indigo-300 tracking-widest block leading-none">Inspection Score</span>
                <div className="text-2xl sm:text-3xl font-black mt-0.5 tabular-nums leading-none">{score}</div>
              </div>
              {score >= highScore && score > 0 && (
                <span className="text-[8px] font-bold text-yellow-300 bg-yellow-400/10 border border-yellow-300/20 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">New Peak! 🏅</span>
              )}
            </div>

            {/* Compliance accuracy */}
            <div className="bg-white border border-slate-100 p-2 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[7px] font-black uppercase text-slate-400 tracking-widest block leading-none">Precision</span>
                <div className="text-base sm:text-lg font-black text-emerald-600 mt-0.5 leading-none">{accuracy}%</div>
              </div>
              <span className="text-[6px] sm:text-[7px] text-slate-400 font-bold block leading-none mt-0.5">Compliant alignment</span>
            </div>

            {/* Average Decision Speed */}
            <div className="bg-white border border-slate-100 p-2 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[7px] font-black uppercase text-slate-400 tracking-widest block leading-none">Decision Speed</span>
                <div className="text-base sm:text-lg font-black text-blue-600 mt-0.5 leading-none tabular-nums">{speedMs}ms</div>
              </div>
              <span className="text-[6px] sm:text-[7px] text-slate-400 font-bold block leading-none mt-0.5">Avg inspect interval</span>
            </div>

            {/* Perfect Timings */}
            <div className="bg-white border border-slate-100 p-2 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[7px] font-black uppercase text-slate-400 tracking-widest block leading-none">Perfect Timings</span>
                <div className="text-base sm:text-lg font-black text-amber-500 mt-0.5 leading-none tabular-nums">⚡ {perfectSwipes}</div>
              </div>
              <span className="text-[6px] sm:text-[7px] text-slate-400 font-bold block leading-none mt-0.5">Quick hazard alerts</span>
            </div>

            {/* Next rank status */}
            <div className="bg-white border border-slate-100 p-2 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[7px] font-black uppercase text-slate-400 tracking-widest block leading-none">Safety Rank</span>
                <div className="text-[11px] sm:text-xs font-black text-slate-800 mt-0.5 leading-tight truncate">{rankInfo.badge} {rankInfo.title}</div>
              </div>
              <span className="text-[6px] sm:text-[7px] text-slate-400 font-bold block leading-none mt-0.5">Cumulative standard</span>
            </div>
          </div>

          {/* Professional Certificate Download Card - Compact row */}
          <div className="w-full bg-gradient-to-r from-indigo-50/60 to-amber-50/60 border border-indigo-100 rounded-xl p-2.5 text-left shadow-xs mb-2.5">
            <div className="flex justify-between items-center gap-2">
              <div className="min-w-0 flex-1">
                <span className="text-[7px] font-black uppercase text-indigo-700 bg-indigo-100/50 px-1.5 py-0.5 rounded tracking-wider">Official Certification</span>
                <h4 className="text-xs font-black text-slate-800 leading-none mt-1">Compliance Certificate</h4>
                <p className="text-[9px] font-bold text-slate-500 leading-normal mt-1 italic truncate">
                  "{getCertificateComment(score).text}"
                </p>
              </div>
              <button
                onClick={downloadCertificate}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-extrabold text-[9px] flex items-center gap-1 transition-all shadow-xs shrink-0 active:scale-95"
              >
                <Download size={10} strokeWidth={3} /> PDF
              </button>
            </div>
          </div>

          {/* Social Sharing Compact Row */}
          <div className="w-full mb-3 text-center flex items-center justify-between gap-2 px-1 shrink-0">
            <span className="text-[7px] sm:text-[8px] font-black uppercase text-slate-400 tracking-widest shrink-0">Share Compliance:</span>
            <div className="flex gap-1.5">
              {/* LinkedIn */}
              <button
                onClick={() => shareOnSocial('linkedin')}
                className="w-7 h-7 bg-[#0A66C2]/5 hover:bg-[#0A66C2]/15 border border-[#0A66C2]/15 text-[#0A66C2] rounded-lg flex items-center justify-center transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin size={11} className="fill-[#0A66C2] stroke-0" />
              </button>
              {/* Facebook */}
              <button
                onClick={() => shareOnSocial('facebook')}
                className="w-7 h-7 bg-[#1877F2]/5 hover:bg-[#1877F2]/15 border border-[#1877F2]/15 text-[#1877F2] rounded-lg flex items-center justify-center transition-colors"
                title="Share on Facebook"
              >
                <Facebook size={11} className="fill-[#1877F2] stroke-0" />
              </button>
              {/* WhatsApp */}
              <button
                onClick={() => shareOnSocial('whatsapp')}
                className="w-7 h-7 bg-[#25D366]/5 hover:bg-[#25D366]/15 border border-[#25D366]/15 text-[#25D366] rounded-lg flex items-center justify-center transition-colors"
                title="Share on WhatsApp"
              >
                <svg className="w-[11px] h-[11px] fill-current text-[#25D366]" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.488 5.336 1.489 5.468 0 9.91-4.444 9.914-9.917.002-2.651-1.032-5.143-2.91-7.025C17.098 1.817 14.601.783 11.957.783c-5.474 0-9.919 4.446-9.923 9.922 0 2.035.53 4.02 1.536 5.76l-.973 3.561 3.648-.957zm12.355-6.52c-.33-.165-1.951-.963-2.251-1.072-.3-.109-.518-.165-.736.165-.218.33-.845 1.072-1.036 1.29-.19.218-.381.245-.71.082-1.121-.56-2.19-1.02-3.04-2.482-.224-.383.224-.356.643-1.193.07-.14.035-.262-.018-.37-.052-.109-.462-1.114-.633-1.523-.167-.399-.34-.343-.462-.35-.12-.006-.258-.007-.396-.007s-.36.052-.55.258c-.19.207-.723.707-.723 1.724s.739 2.003.842 2.14c.103.137 1.455 2.22 3.525 3.114.492.213.876.34 1.176.435.495.158.946.135 1.302.082.397-.06 1.951-.798 2.226-1.57.275-.772.275-1.436.193-1.57-.083-.134-.302-.218-.633-.383z"/>
                </svg>
              </button>
              {/* Instagram */}
              <button
                onClick={() => shareOnSocial('instagram')}
                className="w-7 h-7 bg-[#E1306C]/5 hover:bg-[#E1306C]/15 border border-[#E1306C]/15 text-[#E1306C] rounded-lg flex items-center justify-center transition-colors"
                title="Share on Instagram"
              >
                <Instagram size={11} className="text-[#E1306C]" />
              </button>
            </div>
          </div>
        </div>

        {/* Play and share controls */}
        <div className="w-full flex flex-col items-center gap-2 mt-auto shrink-0 pb-4">
          <button
            onClick={() => { setShowMistakesReview(true); soundEffects.click(); }}
            className={`w-full py-2 border rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all mb-1 ${
              sessionMistakes.length > 0
                ? 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
            }`}
          >
            <span>🕵️</span>
            {sessionMistakes.length > 0 
              ? `Review ${sessionMistakes.length} Safety Mistakes` 
              : 'Perfect Run! Review Compliance Logs'}
          </button>
          <div className="flex gap-2 w-full">
            <button 
              onClick={startGame}
              className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-colors shadow-sm active:scale-98"
              id="btn-play-again"
            >
              <RotateCcw size={13} /> Play Again
            </button>
            <button 
              onClick={handleShare}
              className="flex-1 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors shadow-xs border border-slate-200 active:scale-98"
              id="btn-share-score"
            >
              <Share2 size={13} /> {shareText}
            </button>
          </div>
          
          <button 
            onClick={() => { setGameState('start'); soundEffects.click(); }}
            className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors py-1 shrink-0"
            id="btn-gameover-home"
          >
            Leave Game & Go to Main Page
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div 
      className={`w-full h-screen flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden font-sans select-none relative ${getAmbientGradient()}`}
      animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      {gameState === 'start' && renderStartScreen()}
      {gameState === 'rules' && renderRulesScreen()}
      {gameState === 'achievements' && renderAchievements()}
      {gameState === 'encyclopedia' && renderEncyclopedia()}
      {gameState === 'stats' && renderStats()}
      {gameState === 'certificate' && renderCertificate()}
      {(gameState === 'playing' || gameState === 'explanation') && renderGame()}
      {renderModal()}
      {renderPauseOverlay()}
      {renderTutorialPopup()}
      {gameState === 'gameover' && renderGameOver()}
      
      {(gameState === 'start' || gameState === 'gameover') && (
        <div className="absolute bottom-5 left-0 right-0 text-center font-sans text-xs tracking-wider font-semibold text-slate-500 z-10 pointer-events-none">
          Created By <span className="text-slate-800 font-black border-b border-blue-500/40 pb-0.5">Anil Sharma</span>
        </div>
      )}
      
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-50 pointer-events-none whitespace-nowrap border border-slate-800"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
              {toast.icon}
            </div>
            <div>
              <div className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider">Medal Unlocked</div>
              <div className="font-bold">{toast.title}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


