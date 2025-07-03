import { LoopType, Motion } from 'motion-frame';
import './App.scss';
import { useEffect, useRef } from 'react';

const lerp = (
  targetMin: number,
  targetMax: number,
  sourceMin: number,
  sourceMax: number,
  value: number,
) => {
  return ((value - sourceMin) * (targetMax - targetMin)) / (sourceMax - sourceMin) + targetMin;
};

function App() {
  const text = 'Watch this space...';
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animationDuration = 10000;
  const motion = useRef<Motion>(
    new Motion({
      duration: animationDuration,
      loop: LoopType.LOOP,
      animation: (frame) => {
        const { progress } = frame;
        // Animate each letter with a staggered delay
        letterRefs.current.forEach((el, i) => {
          if (!el) return;

          // Calculate the delay for this letter
          const lerpedDelay = lerp(
            0,
            1,
            0,
            animationDuration,
            (animationDuration / letterRefs.current.length) * i,
          );

          // Offset and wrap progress to [0, 2)
          let delayedProgress = ((progress + lerpedDelay) * 2) % 2;

          // Ping-pong: if >1, reverse direction
          if (delayedProgress > 1) {
            delayedProgress = 2 - delayedProgress;
          }

          // Lerp value to font weight range
          const weight = lerp(300, 700, 0, 1, delayedProgress);

          // Animate the font weight
          el.style.fontVariationSettings = `"wght" ${weight}`;
        });
      },
    }),
  );

  useEffect(() => {
    // Reset styles before animation
    letterRefs.current.forEach((el) => {
      if (el) {
        el.style.fontVariationSettings = '"wght" 300';
      }
    });
    motion.current.play();
  }, []);

  return (
    <div className="app">
      {text.split('').map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          style={{ display: 'inline-block', fontVariationSettings: `"wght" 300` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

export default App;
