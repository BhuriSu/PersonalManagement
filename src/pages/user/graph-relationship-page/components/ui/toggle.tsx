import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import './toggle.css';

const toggleVariants = {
  variant: {
    default: 'toggle-default',
    outline: 'toggle-outline',
    violet: 'toggle-violet',
  },
  size: {
    default: 'toggle-size-default',
    ssm: 'toggle-size-ssm',
    sm: 'toggle-size-sm',
    lg: 'toggle-size-lg',
  },
};

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & 
  {
    variant?: keyof typeof toggleVariants['variant'];
    size?: keyof typeof toggleVariants['size'];
  }
>(({ className, variant = 'default', size = 'default', ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={`toggle ${toggleVariants.variant[variant]} ${toggleVariants.size[size]} ${className}`}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
