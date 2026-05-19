import type { HTMLAttributes, ReactNode } from 'react';

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'article' | 'header';
  children: ReactNode;
  delay?: 0 | 100 | 150 | 200 | 300 | 400 | 500;
};

const delayClass: Record<NonNullable<RevealProps['delay']>, string> = {
  0: '',
  100: 'animation-delay-100',
  150: 'animation-delay-150',
  200: 'animation-delay-200',
  300: 'animation-delay-300',
  400: 'animation-delay-400',
  500: 'animation-delay-500',
};

export function Reveal({ as = 'div', children, className = '', delay = 0, ...props }: RevealProps) {
  const Comp = as;

  return (
    <Comp className={`animate-reveal-up ${delayClass[delay]} ${className}`.trim()} {...props}>
      {children}
    </Comp>
  );
}
