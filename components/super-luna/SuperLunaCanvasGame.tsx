'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Volume2,
  VolumeX,
  Pause,
  Play,
  RotateCcw,
  LogOut,
  Sparkles,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  CheckCircle2,
  XCircle,
  Trophy,
  Star,
  Award
} from 'lucide-react';
import { Question, LEVEL_METADATA } from '@/lib/super-luna/questions';
import { soundManager } from '@/lib/super-luna/sound';

interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'ground' | 'grass' | 'floating' | 'pipe';
}

interface Coin {
  x: number;
  y: number;
  collected: boolean;
  pulseOffset: number;
}

interface QuestionBlock {
  x: number;
  y: number;
  w: number;
  h: number;
  question: Question;
  hit: boolean;
  solved: boolean;
  bounceOffset: number;
}

interface Checkpoint {
  x: number;
  y: number;
  activated: boolean;
}

interface FinishGoal {
  x: number;
  y: number;
  reached: boolean;
}

interface SuperLunaCanvasGameProps {
  levelId: number;
  onExit: () => void;
  onComplete: (score: number, coins: number, maxScore: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;
const GRAVITY = 0.58;
const PLAYER_SPEED = 4.8;
const JUMP_FORCE = -12.4;

export default function SuperLunaCanvasGame({
  levelId,
  onExit,
  onComplete,
  soundEnabled,
  onToggleSound,
}: SuperLunaCanvasGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // UI state
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [coins, setCoins] = useState<number>(0);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [activeBlockIndex, setActiveBlockIndex] = useState<number | null>(null);
  const [questionResult, setQuestionResult] = useState<'correct' | 'wrong' | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isLevelClear, setIsLevelClear] = useState<boolean>(false);

  // Sprites storage ref
  const spritesRef = useRef<Record<string, HTMLImageElement>>({});
  const [spritesLoaded, setSpritesLoaded] = useState<boolean>(false);

  // Keys ref
  const keysRef = useRef<{ left: boolean; right: boolean; jump: boolean }>({
    left: false,
    right: false,
    jump: false,
  });

  // Touch controls ref
  const touchLeftRef = useRef<boolean>(false);
  const touchRightRef = useRef<boolean>(false);
  const touchJumpRef = useRef<boolean>(false);

  // Player state
  const playerRef = useRef({
    x: 80,
    y: 380,
    w: 52,
    h: 58,
    vx: 0,
    vy: 0,
    grounded: true,
    facing: 'right' as 'left' | 'right',
    animState: 'idle' as 'idle' | 'run' | 'jump' | 'land',
    animTimer: 0,
    frameIndex: 0,
    invulnerableTimer: 0,
    lastCheckpointX: 80,
    lastCheckpointY: 380,
  });

  // Camera
  const cameraXRef = useRef<number>(0);

  // Level World entities
  const worldWidthRef = useRef<number>(3400);
  const platformsRef = useRef<Platform[]>([]);
  const coinsRef = useRef<Coin[]>([]);
  const questionBlocksRef = useRef<QuestionBlock[]>([]);
  const checkpointRef = useRef<Checkpoint>({ x: 1600, y: 360, activated: false });
  const finishGoalRef = useRef<FinishGoal>({ x: 3200, y: 340, reached: false });

  // Floating particles / effects
  const particlesRef = useRef<
    Array<{ x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }>
  >([]);

  // Preload sprites
  useEffect(() => {
    const spriteNames = [
      'idle_1', 'idle_2', 'idle_3',
      'run_right_1', 'run_right_2', 'run_right_3',
      'run_left_1', 'run_left_2', 'run_left_3',
      'jump_right_1', 'jump_right_2', 'jump_right_3',
      'jump_left_1', 'jump_left_2', 'jump_left_3',
      'land_right_1', 'land_right_2',
      'land_left_1', 'land_left_2',
      'happy', 'sad',
      'dialog_1', 'dialog_2', 'dialog_3', 'dialog_4', 'dialog_5'
    ];

    let loadedCount = 0;
    const dict: Record<string, HTMLImageElement> = {};

    spriteNames.forEach((name) => {
      const img = new window.Image();
      img.src = `/assets/super-luna/sprites/${name}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= spriteNames.length) {
          spritesRef.current = dict;
          setSpritesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= spriteNames.length) {
          spritesRef.current = dict;
          setSpritesLoaded(true);
        }
      };
      dict[name] = img;
    });
  }, []);

  // Setup level world data into refs
  const setupWorldData = useCallback((targetLevelId: number) => {
    const meta = LEVEL_METADATA.find((l) => l.id === targetLevelId) || LEVEL_METADATA[0];
    const questionsPool = meta.questions;
    const selectedQuestions = questionsPool.slice(0, 5);

    worldWidthRef.current = 3300;

    // Ground platforms with strategic pits
    const platforms: Platform[] = [
      { x: 0, y: 440, w: 600, h: 100, type: 'ground' },
      { x: 420, y: 340, w: 120, h: 28, type: 'floating' },
      { x: 580, y: 270, w: 110, h: 28, type: 'floating' },
      { x: 740, y: 440, w: 700, h: 100, type: 'ground' },
      { x: 920, y: 330, w: 130, h: 28, type: 'floating' },
      { x: 1120, y: 260, w: 130, h: 28, type: 'floating' },
      { x: 1280, y: 350, w: 120, h: 28, type: 'floating' },
      { x: 1480, y: 440, w: 650, h: 100, type: 'ground' },
      { x: 1750, y: 330, w: 130, h: 28, type: 'floating' },
      { x: 1940, y: 260, w: 120, h: 28, type: 'floating' },
      { x: 2180, y: 440, w: 550, h: 100, type: 'ground' },
      { x: 2360, y: 320, w: 120, h: 28, type: 'floating' },
      { x: 2540, y: 250, w: 120, h: 28, type: 'floating' },
      { x: 2780, y: 440, w: 620, h: 100, type: 'ground' },
      { x: 2900, y: 340, w: 130, h: 28, type: 'floating' },
    ];
    platformsRef.current = platforms;

    // Question Mystery Blocks: 5 blocks
    const qBlocks: QuestionBlock[] = [
      {
        x: 460,
        y: 220,
        w: 44,
        h: 44,
        question: selectedQuestions[0],
        hit: false,
        solved: false,
        bounceOffset: 0,
      },
      {
        x: 960,
        y: 210,
        w: 44,
        h: 44,
        question: selectedQuestions[1],
        hit: false,
        solved: false,
        bounceOffset: 0,
      },
      {
        x: 1800,
        y: 210,
        w: 44,
        h: 44,
        question: selectedQuestions[2],
        hit: false,
        solved: false,
        bounceOffset: 0,
      },
      {
        x: 2400,
        y: 200,
        w: 44,
        h: 44,
        question: selectedQuestions[3],
        hit: false,
        solved: false,
        bounceOffset: 0,
      },
      {
        x: 2940,
        y: 220,
        w: 44,
        h: 44,
        question: selectedQuestions[4],
        hit: false,
        solved: false,
        bounceOffset: 0,
      },
    ];
    questionBlocksRef.current = qBlocks;

    // Star coins
    const coinsList: Coin[] = [];
    const addCoinArc = (startX: number, baseY: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI / (count + 1)) * (i + 1);
        coinsList.push({
          x: startX + i * 36,
          y: baseY - Math.sin(angle) * 45,
          collected: false,
          pulseOffset: i * 0.4,
        });
      }
    };

    addCoinArc(180, 410, 4);
    addCoinArc(430, 310, 3);
    addCoinArc(600, 240, 3);
    addCoinArc(800, 410, 5);
    addCoinArc(1140, 230, 3);
    addCoinArc(1520, 410, 4);
    addCoinArc(1760, 300, 3);
    addCoinArc(2220, 410, 4);
    addCoinArc(2370, 290, 3);
    addCoinArc(2800, 410, 5);

    coinsRef.current = coinsList;
    checkpointRef.current = { x: 1540, y: 370, activated: false };
    finishGoalRef.current = { x: 3120, y: 350, reached: false };

    playerRef.current = {
      x: 80,
      y: 370,
      w: 52,
      h: 58,
      vx: 0,
      vy: 0,
      grounded: true,
      facing: 'right',
      animState: 'idle',
      animTimer: 0,
      frameIndex: 0,
      invulnerableTimer: 0,
      lastCheckpointX: 80,
      lastCheckpointY: 370,
    };

    cameraXRef.current = 0;
  }, []);

  // User-invoked restart level handler
  const restartLevel = useCallback(() => {
    setupWorldData(levelId);
    setLives(3);
    setScore(0);
    setCoins(0);
    setIsGameOver(false);
    setIsLevelClear(false);
    setActiveQuestion(null);
    setActiveBlockIndex(null);
    setQuestionResult(null);
    setSelectedAnswer(null);
    setShowExplanation(false);
    soundManager.playBgm();
  }, [levelId, setupWorldData]);

  useEffect(() => {
    setupWorldData(levelId);
    soundManager.playBgm();
  }, [levelId, setupWorldData]);

  // Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        keysRef.current.left = true;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        keysRef.current.right = true;
      }
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        keysRef.current.jump = true;
      }
      if (e.code === 'KeyP' || e.code === 'Escape') {
        if (!activeQuestion && !isGameOver && !isLevelClear) {
          setIsPaused((prev) => !prev);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        keysRef.current.left = false;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        keysRef.current.right = false;
      }
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        keysRef.current.jump = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeQuestion, isGameOver, isLevelClear]);

  // Spawn visual sparkle particles
  const spawnParticles = (x: number, y: number, color: string, count: number = 8) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const spd = 2 + Math.random() * 3.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        life: 1.0,
        color,
        size: 3 + Math.random() * 4,
      });
    }
  };

  // Main game loop
  useEffect(() => {
    let animId: number;

    const gameLoop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const player = playerRef.current;

      // Only update physics if not paused and not answering question
      if (!isPaused && !activeQuestion && !isGameOver && !isLevelClear) {
        // --- 1. Movement Inputs ---
        const moveLeft = keysRef.current.left || touchLeftRef.current;
        const moveRight = keysRef.current.right || touchRightRef.current;
        const wantsJump = keysRef.current.jump || touchJumpRef.current;

        if (moveLeft && !moveRight) {
          player.vx = -PLAYER_SPEED;
          player.facing = 'left';
        } else if (moveRight && !moveLeft) {
          player.vx = PLAYER_SPEED;
          player.facing = 'right';
        } else {
          player.vx *= 0.65;
          if (Math.abs(player.vx) < 0.2) player.vx = 0;
        }

        // Jump
        if (wantsJump && player.grounded) {
          player.vy = JUMP_FORCE;
          player.grounded = false;
          soundManager.playSfx('jump');
          spawnParticles(player.x + player.w / 2, player.y + player.h, '#FDE047', 6);
        }

        // Gravity
        player.vy += GRAVITY;
        if (player.vy > 14) player.vy = 14;

        // Apply movement horizontally
        player.x += player.vx;

        // Level boundary clamps
        if (player.x < 10) player.x = 10;
        if (player.x + player.w > worldWidthRef.current) {
          player.x = worldWidthRef.current - player.w;
        }

        // Horizontal collisions with question blocks
        questionBlocksRef.current.forEach((block) => {
          if (
            player.x < block.x + block.w &&
            player.x + player.w > block.x &&
            player.y < block.y + block.h &&
            player.y + player.h > block.y
          ) {
            if (player.vx > 0) player.x = block.x - player.w;
            if (player.vx < 0) player.x = block.x + block.w;
          }
        });

        // Apply movement vertically
        player.y += player.vy;
        let onGround = false;

        // Collision with platforms
        platformsRef.current.forEach((plat) => {
          if (
            player.x + player.w * 0.7 > plat.x &&
            player.x + player.w * 0.3 < plat.x + plat.w
          ) {
            // Landing on top
            if (
              player.vy >= 0 &&
              player.y + player.h >= plat.y &&
              player.y + player.h <= plat.y + 24
            ) {
              player.y = plat.y - player.h;
              player.vy = 0;
              onGround = true;
            }
          }
        });

        // Vertical collision with question blocks (Hitting from below!)
        questionBlocksRef.current.forEach((block, idx) => {
          if (
            player.x + player.w * 0.7 > block.x &&
            player.x + player.w * 0.3 < block.x + block.w
          ) {
            // Hitting bottom of question block
            if (
              player.vy < 0 &&
              player.y <= block.y + block.h &&
              player.y >= block.y + block.h - 18
            ) {
              player.y = block.y + block.h;
              player.vy = 0;
              block.bounceOffset = -12;
              soundManager.playSfx('blockHit');

              if (!block.solved && !activeQuestion) {
                // Trigger math challenge popup!
                setTimeout(() => {
                  setActiveQuestion(block.question);
                  setActiveBlockIndex(idx);
                  setQuestionResult(null);
                  setSelectedAnswer(null);
                  setShowExplanation(false);
                }, 100);
              }
            }
            // Standing on top of question block
            else if (
              player.vy >= 0 &&
              player.y + player.h >= block.y &&
              player.y + player.h <= block.y + 18
            ) {
              player.y = block.y - player.h;
              player.vy = 0;
              onGround = true;
            }
          }
        });

        // Update grounded state
        if (!player.grounded && onGround) {
          soundManager.playSfx('land');
          spawnParticles(player.x + player.w / 2, player.y + player.h, '#E2E8F0', 4);
        }
        player.grounded = onGround;

        // Collect coins
        coinsRef.current.forEach((coin) => {
          if (!coin.collected) {
            const cx = coin.x;
            const cy = coin.y;
            const px = player.x + player.w / 2;
            const py = player.y + player.h / 2;
            const dist = Math.hypot(px - cx, py - cy);
            if (dist < 32) {
              coin.collected = true;
              setCoins((c) => c + 1);
              setScore((s) => s + 20);
              soundManager.playSfx('coin');
              spawnParticles(coin.x, coin.y, '#FBBF24', 8);
            }
          }
        });

        // Checkpoint reach
        const cp = checkpointRef.current;
        if (!cp.activated) {
          if (player.x + player.w > cp.x && player.x < cp.x + 40) {
            cp.activated = true;
            player.lastCheckpointX = cp.x;
            player.lastCheckpointY = cp.y - player.h;
            soundManager.playSfx('checkpoint');
            spawnParticles(cp.x + 10, cp.y + 20, '#10B981', 14);
          }
        }

        // Finish Goal reach
        const goal = finishGoalRef.current;
        if (!goal.reached) {
          if (player.x + player.w > goal.x + 20) {
            goal.reached = true;
            soundManager.playSfx('win');
            spawnParticles(goal.x + 40, goal.y, '#EC4899', 25);
            setTimeout(() => {
              setIsLevelClear(true);
            }, 600);
          }
        }

        // Pit death check
        if (player.y > CANVAS_HEIGHT + 60) {
          setLives((l) => {
            const nextLives = l - 1;
            if (nextLives <= 0) {
              setIsGameOver(true);
              soundManager.playSfx('wrong');
            } else {
              // Respawn at checkpoint
              player.x = player.lastCheckpointX;
              player.y = player.lastCheckpointY;
              player.vx = 0;
              player.vy = 0;
              player.invulnerableTimer = 60;
              soundManager.playSfx('wrong');
            }
            return nextLives;
          });
        }

        // Smooth block bounce decay
        questionBlocksRef.current.forEach((b) => {
          if (b.bounceOffset < 0) {
            b.bounceOffset += 1.5;
            if (b.bounceOffset > 0) b.bounceOffset = 0;
          }
        });

        // Animation state machine
        player.animTimer++;
        if (!player.grounded) {
          player.animState = 'jump';
          player.frameIndex = player.vy < 0 ? 0 : 2;
        } else if (Math.abs(player.vx) > 0.5) {
          player.animState = 'run';
          if (player.animTimer % 8 === 0) {
            player.frameIndex = (player.frameIndex + 1) % 3;
          }
        } else {
          player.animState = 'idle';
          if (player.animTimer % 20 === 0) {
            player.frameIndex = (player.frameIndex + 1) % 3;
          }
        }

        // Camera follow lerp
        const targetCamX = player.x - CANVAS_WIDTH / 3;
        cameraXRef.current += (targetCamX - cameraXRef.current) * 0.08;
        if (cameraXRef.current < 0) cameraXRef.current = 0;
        const maxCamX = worldWidthRef.current - CANVAS_WIDTH;
        if (cameraXRef.current > maxCamX) cameraXRef.current = maxCamX;
      }

      // --- RENDERING ---
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const camX = cameraXRef.current;

      // 1. Sky & Background Parallax
      const meta = LEVEL_METADATA.find((l) => l.id === levelId) || LEVEL_METADATA[0];
      const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      if (levelId === 1) {
        skyGrad.addColorStop(0, '#38BDF8');
        skyGrad.addColorStop(0.65, '#BAE6FD');
        skyGrad.addColorStop(1, '#F0F9FF');
      } else if (levelId === 2) {
        skyGrad.addColorStop(0, '#6366F1');
        skyGrad.addColorStop(0.65, '#A5B4FC');
        skyGrad.addColorStop(1, '#EEF2FF');
      } else {
        skyGrad.addColorStop(0, '#F43F5E');
        skyGrad.addColorStop(0.6, '#FDA4AF');
        skyGrad.addColorStop(1, '#FFF1F2');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Distant rolling hills (parallax factor 0.25)
      ctx.save();
      ctx.fillStyle = levelId === 1 ? '#86EFAC' : levelId === 2 ? '#C4B5FD' : '#FECDD3';
      ctx.beginPath();
      ctx.moveTo(0, CANVAS_HEIGHT);
      for (let x = 0; x <= CANVAS_WIDTH; x += 30) {
        const worldX = x + camX * 0.25;
        const y = 380 + Math.sin(worldX * 0.003) * 35;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Clouds (parallax factor 0.15)
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      const cloudPositions = [
        { x: 120, y: 70, w: 90, h: 32 },
        { x: 420, y: 110, w: 120, h: 38 },
        { x: 800, y: 60, w: 110, h: 34 },
        { x: 1300, y: 90, w: 140, h: 42 },
        { x: 1800, y: 65, w: 100, h: 32 },
        { x: 2300, y: 100, w: 130, h: 40 },
        { x: 2800, y: 70, w: 110, h: 35 },
      ];
      cloudPositions.forEach((c) => {
        const screenX = c.x - camX * 0.15;
        if (screenX + c.w > 0 && screenX < CANVAS_WIDTH) {
          ctx.beginPath();
          ctx.ellipse(screenX, c.y, c.w * 0.5, c.h * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();

      // World coordinate transform
      ctx.save();
      ctx.translate(-camX, 0);

      // 2. Draw Platforms
      platformsRef.current.forEach((plat) => {
        // Only draw visible
        if (plat.x + plat.w < camX - 50 || plat.x > camX + CANVAS_WIDTH + 50) return;

        if (plat.type === 'ground') {
          // Lush grass surface top
          ctx.fillStyle = '#4ADE80'; // Bright green
          ctx.fillRect(plat.x, plat.y, plat.w, 14);

          // Deep lush soil body
          ctx.fillStyle = '#B45309';
          ctx.fillRect(plat.x, plat.y + 14, plat.w, plat.h - 14);

          // Dark border
          ctx.strokeStyle = '#15803D';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(plat.x, plat.y);
          ctx.lineTo(plat.x + plat.w, plat.y);
          ctx.stroke();

          // Grass tufts
          ctx.fillStyle = '#22C55E';
          for (let gx = plat.x + 10; gx < plat.x + plat.w - 10; gx += 28) {
            ctx.beginPath();
            ctx.arc(gx, plat.y + 14, 5, 0, Math.PI);
            ctx.fill();
          }
        } else {
          // Floating wooden / stone platform
          ctx.fillStyle = '#FB923C';
          ctx.fillRect(plat.x, plat.y, plat.w, plat.h);

          // Grass top cap
          ctx.fillStyle = '#4ADE80';
          ctx.fillRect(plat.x, plat.y, plat.w, 6);

          // Border
          ctx.strokeStyle = '#C2410C';
          ctx.lineWidth = 2.5;
          ctx.strokeRect(plat.x, plat.y, plat.w, plat.h);
        }
      });

      // 3. Draw Checkpoint Flag
      const cp = checkpointRef.current;
      ctx.save();
      // Pole
      ctx.fillStyle = '#64748B';
      ctx.fillRect(cp.x + 14, cp.y - 70, 6, 80);
      // Base
      ctx.fillStyle = '#475569';
      ctx.fillRect(cp.x + 6, cp.y + 10, 22, 10);
      // Flag
      ctx.fillStyle = cp.activated ? '#10B981' : '#CBD5E1';
      ctx.beginPath();
      ctx.moveTo(cp.x + 20, cp.y - 65);
      ctx.lineTo(cp.x + 55, cp.y - 48);
      ctx.lineTo(cp.x + 20, cp.y - 30);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 4. Draw Goal Post & Castle
      const goal = finishGoalRef.current;
      ctx.save();
      // Castle structure
      ctx.fillStyle = '#E2E8F0';
      ctx.fillRect(goal.x + 40, goal.y - 80, 80, 90);
      // Battlements
      ctx.fillStyle = '#CBD5E1';
      ctx.fillRect(goal.x + 40, goal.y - 94, 20, 14);
      ctx.fillRect(goal.x + 70, goal.y - 94, 20, 14);
      ctx.fillRect(goal.x + 100, goal.y - 94, 20, 14);
      // Door
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(goal.x + 80, goal.y - 10, 16, Math.PI, 0);
      ctx.lineTo(goal.x + 96, goal.y + 10);
      ctx.lineTo(goal.x + 64, goal.y + 10);
      ctx.closePath();
      ctx.fill();

      // Tall flag pole
      ctx.fillStyle = '#F59E0B';
      ctx.fillRect(goal.x + 10, goal.y - 120, 6, 130);
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.moveTo(goal.x + 16, goal.y - 115);
      ctx.lineTo(goal.x + 45, goal.y - 100);
      ctx.lineTo(goal.x + 16, goal.y - 85);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 5. Draw Star Coins
      coinsRef.current.forEach((coin, i) => {
        if (!coin.collected) {
          const floatY = coin.y + Math.sin(Date.now() * 0.005 + coin.pulseOffset) * 4;
          ctx.save();
          ctx.translate(coin.x, floatY);
          // Golden rim
          ctx.fillStyle = '#F59E0B';
          ctx.beginPath();
          ctx.arc(0, 0, 11, 0, Math.PI * 2);
          ctx.fill();
          // Inner yellow
          ctx.fillStyle = '#FDE047';
          ctx.beginPath();
          ctx.arc(0, 0, 8.5, 0, Math.PI * 2);
          ctx.fill();
          // Star symbol
          ctx.fillStyle = '#B45309';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('★', 0, 0.5);
          ctx.restore();
        }
      });

      // 6. Draw Question Blocks
      questionBlocksRef.current.forEach((block) => {
        const by = block.y + block.bounceOffset;
        ctx.save();
        if (block.solved) {
          // Solved block: Bronze solid
          ctx.fillStyle = '#D97706';
          ctx.fillRect(block.x, by, block.w, block.h);
          ctx.strokeStyle = '#92400E';
          ctx.lineWidth = 3;
          ctx.strokeRect(block.x, by, block.w, block.h);

          // Dot in center
          ctx.fillStyle = '#FDE68A';
          ctx.beginPath();
          ctx.arc(block.x + block.w / 2, by + block.h / 2, 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Active Mystery '?' Block (Pulsing bright gold)
          const pulse = Math.sin(Date.now() * 0.008) * 2;
          ctx.fillStyle = '#FBBF24';
          ctx.fillRect(block.x, by, block.w, block.h);

          // Highlight and border
          ctx.strokeStyle = '#D97706';
          ctx.lineWidth = 3;
          ctx.strokeRect(block.x, by, block.w, block.h);

          // Screws on corners
          ctx.fillStyle = '#B45309';
          ctx.fillRect(block.x + 3, by + 3, 3, 3);
          ctx.fillRect(block.x + block.w - 6, by + 3, 3, 3);
          ctx.fillRect(block.x + 3, by + block.h - 6, 3, 3);
          ctx.fillRect(block.x + block.w - 6, by + block.h - 6, 3, 3);

          // Bright '?' symbol
          ctx.fillStyle = '#78350F';
          ctx.font = 'bold 24px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('?', block.x + block.w / 2, by + block.h / 2 + 1);
        }
        ctx.restore();
      });

      // 7. Draw Luna Sprite Character!
      if (spritesLoaded) {
        let spriteKey = 'idle_1';
        const facing = player.facing;

        if (player.animState === 'run') {
          const runIdx = (player.frameIndex % 3) + 1;
          spriteKey = `run_${facing}_${runIdx}`;
        } else if (player.animState === 'jump') {
          const jumpIdx = (player.frameIndex % 3) + 1;
          spriteKey = `jump_${facing}_${jumpIdx}`;
        } else {
          const idleIdx = (player.frameIndex % 3) + 1;
          spriteKey = `idle_${idleIdx}`;
        }

        const spriteImg = spritesRef.current[spriteKey] || spritesRef.current['idle_1'];
        if (spriteImg) {
          ctx.save();
          // Draw with slight padding to look natural
          ctx.drawImage(
            spriteImg,
            player.x - 6,
            player.y - 6,
            player.w + 12,
            player.h + 10
          );
          ctx.restore();
        }
      } else {
        // Fallback placeholder while loading
        ctx.fillStyle = '#FB923C';
        ctx.fillRect(player.x, player.y, player.w, player.h);
      }

      // 8. Draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life -= 0.035;

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      ctx.restore(); // End world transform

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, activeQuestion, isGameOver, isLevelClear, spritesLoaded, levelId]);

  // Handle Question Submission
  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null || !activeQuestion) return;
    setSelectedAnswer(index);

    const isCorrect = index === activeQuestion.correctIndex;
    if (isCorrect) {
      soundManager.playSfx('correct');
      setQuestionResult('correct');
      setScore((s) => s + activeQuestion.coinReward * 10);
      setCoins((c) => c + activeQuestion.coinReward);

      // Mark the block as solved
      if (activeBlockIndex !== null && questionBlocksRef.current[activeBlockIndex]) {
        questionBlocksRef.current[activeBlockIndex].solved = true;
      }
    } else {
      soundManager.playSfx('wrong');
      setQuestionResult('wrong');
      setLives((l) => {
        const next = l - 1;
        if (next <= 0) {
          setTimeout(() => {
            setActiveQuestion(null);
            setIsGameOver(true);
          }, 1500);
        }
        return next;
      });
    }

    setShowExplanation(true);
  };

  const handleCloseQuestionModal = () => {
    setActiveQuestion(null);
    setActiveBlockIndex(null);
    setQuestionResult(null);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleFinishLevel = () => {
    const maxScore = 500;
    onComplete(score, coins, maxScore);
  };

  const activeMeta = LEVEL_METADATA.find((l) => l.id === levelId) || LEVEL_METADATA[0];

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
      {/* Top Game HUD Bar */}
      <div className="w-full flex items-center justify-between px-3 sm:px-6 py-2.5 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-white shadow-md mb-3">
        {/* Level badge */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-[#123B8A] font-black text-xs sm:text-sm">
            {activeMeta.title}
          </span>
        </div>

        {/* HUD: Coins, Score, Lives */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Coins */}
          <div className="flex items-center gap-1.5 font-black text-amber-500 text-sm sm:text-base">
            <span className="w-6 h-6 rounded-full bg-amber-400 border-2 border-amber-600 flex items-center justify-center text-white text-xs font-black shadow-xs">
              ★
            </span>
            <span>{coins}</span>
          </div>

          {/* Score */}
          <div className="hidden sm:flex items-center gap-1 font-black text-[#123B8A] text-sm">
            <span className="text-slate-400 text-xs">SKOR:</span>
            <span>{score}</span>
          </div>

          {/* Lives */}
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((h) => (
              <Heart
                key={h}
                className={`w-5 h-5 transition-transform ${
                  h <= lives
                    ? 'text-rose-500 fill-rose-500 scale-100'
                    : 'text-slate-300 fill-slate-200 scale-90'
                }`}
              />
            ))}
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            title="Toggle Suara"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>

          {/* Pause Button */}
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            title="Pause Game"
          >
            <Pause className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Container */}
      <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-sky-200">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full block select-none touch-none"
        />

        {/* PAUSE OVERLAY */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-30 animate-fade-in p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 border-4 border-white shadow-2xl">
              <h2 className="text-2xl font-black text-[#123B8A]">Permainan Dijeda</h2>
              <p className="text-xs text-slate-500 font-semibold">
                Tarik napas sejenak sebelum melanjutkan petualangan matematika Luna!
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setIsPaused(false)}
                  className="w-full py-3 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Lanjutkan Petualangan</span>
                </button>
                <button
                  onClick={() => {
                    setIsPaused(false);
                    restartLevel();
                  }}
                  className="w-full py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Level</span>
                </button>
                <button
                  onClick={onExit}
                  className="w-full py-3 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar ke Pemilihan Level</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MATH QUESTION MODAL */}
        {activeQuestion && (
          <div className="absolute inset-0 bg-sky-950/70 backdrop-blur-xs flex items-center justify-center z-40 p-3 sm:p-5 animate-fade-in">
            <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-xl w-full border-4 border-amber-300 shadow-2xl space-y-4 max-h-[95%] overflow-y-auto">
              {/* Header with Luna Avatar emote */}
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="relative w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 overflow-hidden shrink-0 flex items-center justify-center">
                  <Image
                    src={`/assets/super-luna/sprites/${
                      questionResult === 'correct'
                        ? 'happy.png'
                        : questionResult === 'wrong'
                        ? 'sad.png'
                        : activeQuestion.dialogEmote
                    }`}
                    alt="Luna Avatar"
                    width={52}
                    height={52}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-600">
                    Tantangan Balok Misteri (+{activeQuestion.coinReward} Koin)
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-[#123B8A] font-bold text-sm sm:text-base leading-relaxed">
                {activeQuestion.question}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeQuestion.options?.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === activeQuestion.correctIndex;
                  const answered = questionResult !== null;

                  let style = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
                  if (answered) {
                    if (isCorrect) {
                      style = 'bg-emerald-100 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300';
                    } else if (isSelected && !isCorrect) {
                      style = 'bg-rose-100 border-rose-400 text-rose-900 ring-2 ring-rose-300';
                    } else {
                      style = 'bg-slate-50 border-slate-200 opacity-60 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerClick(idx)}
                      disabled={answered}
                      className={`p-3 sm:p-3.5 rounded-xl border-2 font-bold text-xs sm:text-sm text-left transition-all flex items-center justify-between cursor-pointer ${style}`}
                    >
                      <span>{opt}</span>
                      {answered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {answered && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Hint */}
              {showExplanation && (
                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed font-bold animate-fade-in ${
                    questionResult === 'correct'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <p className="mb-1">
                    {questionResult === 'correct'
                      ? '🎉 Hebat sekali! Jawabanmu tepat sasaran!'
                      : '💔 Kurang tepat, tapi kamu belajar sesuatu yang baru!'}
                  </p>
                  <p className="text-slate-700">{activeQuestion.explanation}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                {questionResult !== null && (
                  <button
                    onClick={handleCloseQuestionModal}
                    className="py-2.5 px-6 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    Lanjut Petualangan
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LEVEL CLEAR VICTORY MODAL */}
        {isLevelClear && (
          <div className="absolute inset-0 bg-sky-950/80 backdrop-blur-xs flex items-center justify-center z-40 p-4 animate-scale-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 border-4 border-amber-300 shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-10 h-10" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                  Level Selesai!
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#123B8A] mt-2">
                  Luar Biasa, Luna Lolos!
                </h2>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Kamu berhasil menyelesaikan tantangan pada {activeMeta.title}!
                </p>
              </div>

              {/* Score card */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-200 grid grid-cols-2 gap-3 text-center">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Total Koin</span>
                  <span className="text-2xl font-black text-amber-500">★ {coins}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Total Skor</span>
                  <span className="text-2xl font-black text-[#123B8A]">{score}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleFinishLevel}
                  className="w-full py-3.5 rounded-full bg-[#F43F5E] hover:bg-[#E11D48] text-white font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>Simpan & Lanjut ke Peta Level</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GAME OVER MODAL */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-40 p-4 animate-scale-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 border-4 border-rose-300 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto text-3xl">
                💔
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#123B8A]">Nyawa Luna Habis!</h2>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Jangan menyerah! Coba lagi dan lewati semua rintangan matematika.
                </p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-800">
                Koin terkumpul: {coins} ★
              </div>
              <div className="space-y-2">
                <button
                  onClick={restartLevel}
                  className="w-full py-3 rounded-full bg-[#F43F5E] hover:bg-[#E11D48] text-white font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Coba Lagi Dari Awal</span>
                </button>
                <button
                  onClick={onExit}
                  className="w-full py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm cursor-pointer transition-all"
                >
                  Keluar ke Peta Level
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Touch On-Screen Controls for Mobile / Tablets */}
      <div className="w-full flex items-center justify-between mt-3 px-2 sm:px-4 select-none">
        {/* Left/Right D-pad */}
        <div className="flex items-center gap-2">
          <button
            onTouchStart={() => (touchLeftRef.current = true)}
            onTouchEnd={() => (touchLeftRef.current = false)}
            onMouseDown={() => (touchLeftRef.current = true)}
            onMouseUp={() => (touchLeftRef.current = false)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/90 hover:bg-white active:bg-blue-100 border-2 border-white shadow-lg text-[#123B8A] flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            aria-label="Gerak Kiri"
          >
            <ChevronLeft className="w-8 h-8 stroke-[3]" />
          </button>
          <button
            onTouchStart={() => (touchRightRef.current = true)}
            onTouchEnd={() => (touchRightRef.current = false)}
            onMouseDown={() => (touchRightRef.current = true)}
            onMouseUp={() => (touchRightRef.current = false)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/90 hover:bg-white active:bg-blue-100 border-2 border-white shadow-lg text-[#123B8A] flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            aria-label="Gerak Kanan"
          >
            <ChevronRight className="w-8 h-8 stroke-[3]" />
          </button>
        </div>

        {/* Keyboard hints */}
        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-white/90 bg-sky-900/40 backdrop-blur-xs px-4 py-2 rounded-full">
          <span>Kontrol Keyboard:</span>
          <kbd className="px-1.5 py-0.5 bg-white/20 rounded">A</kbd>
          <kbd className="px-1.5 py-0.5 bg-white/20 rounded">D</kbd>
          <span>atau</span>
          <kbd className="px-1.5 py-0.5 bg-white/20 rounded">←</kbd>
          <kbd className="px-1.5 py-0.5 bg-white/20 rounded">→</kbd>
          <span>Lari</span>
          <span className="mx-1">•</span>
          <kbd className="px-2 py-0.5 bg-white/20 rounded">Spasi</kbd>
          <span>atau</span>
          <kbd className="px-1.5 py-0.5 bg-white/20 rounded">W</kbd>
          <span>Lompat</span>
        </div>

        {/* Big Jump Button */}
        <div>
          <button
            onTouchStart={() => (touchJumpRef.current = true)}
            onTouchEnd={() => (touchJumpRef.current = false)}
            onMouseDown={() => (touchJumpRef.current = true)}
            onMouseUp={() => (touchJumpRef.current = false)}
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-r from-[#F43F5E] to-[#FF2E63] active:from-[#E11D48] active:to-[#F43F5E] text-white border-4 border-white shadow-xl flex items-center justify-center active:scale-95 transition-all cursor-pointer font-black text-sm"
            aria-label="Lompat"
          >
            <ArrowUp className="w-9 h-9 stroke-[3.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
