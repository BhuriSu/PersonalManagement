// Button.tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import './button.css';

const buttonVariants = {
  default: 'button button-default',
  destructive: 'button button-destructive',
  outline: 'button button-outline',
  secondary: 'button button-secondary',
  ghost: 'button button-ghost',
  link: 'button button-link',
  ghostViolet: 'button button-ghostViolet',
};

const buttonSizes = {
  default: 'button-default-size',
  sm: 'button-sm',
  lg: 'button-lg',
  icon: 'button-icon',
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const variantClass = buttonVariants[variant];
    const sizeClass = buttonSizes[size];
    return (
      <Comp
        className={`${variantClass} ${sizeClass} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
