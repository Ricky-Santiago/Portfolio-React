import React, { useEffect, useRef } from 'react';
import styles from './BackgroundAnimado.module.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const BackgroundAnimado: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Configurar canvas con resolución alta
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    // Crear partículas
    const createParticles = () => {
      const particles: Particle[] = [];
      const numberOfParticles = Math.floor((width * height) / 15000);

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }

      return particles;
    };

    // Inicializar
    setupCanvas();
    particlesRef.current = createParticles();

    // Manejar resize
    const handleResize = () => {
      setupCanvas();
      particlesRef.current = createParticles();
    };

    window.addEventListener('resize', handleResize);

    // Loop de animación
    const animate = () => {
      // Limpiar canvas con fondo negro
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      const maxDistance = 150;

      // Actualizar posiciones
      particles.forEach((particle) => {
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rebotar en los bordes
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        // Mantener dentro del canvas
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));
      });

      // Dibujar líneas de conexión entre partículas cercanas
      ctx.lineWidth = 1.8; // Líneas más gruesas (antes era 1)
      ctx.lineCap = 'round'; // Bordes redondeados para mejor apariencia

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Solo conectar si están cerca
          if (distance < maxDistance) {
            // Opacidad basada en distancia
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(218, 165, 32, ${opacity * 0.7})`; // Aumentada de 0.6 a 0.7
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Dibujar partículas con menos opacidad
      particles.forEach((particle) => {
        // Punto dorado con opacidad reducida
        ctx.fillStyle = 'rgba(218, 165, 32, 0.4)'; // Opacidad reducida (antes era sólido)
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.backgroundContainer}
    />
  );
};

export default BackgroundAnimado;