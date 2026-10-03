import React, { useEffect, useRef } from 'react';
import { getAudioAnalyser } from '../utils/audioEngine';

/**
 * Live Audio Waveform & Frequency Spectrum Visualizer
 * Reacts to actual Web Audio output via AnalyserNode.
 */
export default function AudioVisualizer({ className = '', height = 64, color = '#E6B83A', barCount = 36 }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const analyser = getAudioAnalyser();

    const dataArray = new Uint8Array(analyser ? analyser.frequencyBinCount : 128);

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
      }

      // Check if there is active audio signal
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
      const isSilent = sum === 0;

      const barWidth = width / barCount;
      for (let i = 0; i < barCount; i++) {
        // Map frequency bins
        const binIndex = Math.floor((i / barCount) * (dataArray.length * 0.6));
        const rawVal = isSilent ? (Math.sin(Date.now() * 0.002 + i * 0.2) * 4 + 4) : dataArray[binIndex];
        const barHeight = Math.max(3, (rawVal / 255) * height * 0.9);

        const x = i * barWidth;
        const y = height - barHeight;

        // Gradient bar
        const grad = ctx.createLinearGradient(0, height, 0, 0);
        grad.addColorStop(0, color);
        grad.addColorStop(1, '#9E2F2F');

        ctx.fillStyle = isSilent ? 'rgba(244, 240, 232, 0.12)' : grad;
        ctx.fillRect(x + 1, y, Math.max(1, barWidth - 2), barHeight);
      }
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [color, barCount]);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        width={320}
        height={height}
        className="w-full h-full block"
      />
    </div>
  );
}
