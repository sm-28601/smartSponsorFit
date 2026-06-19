import { useReveal } from '../hooks/useReveal';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transition: `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
