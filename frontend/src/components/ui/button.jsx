export function Button({ variant = 'default', size = 'default', className = '', children, ...props }) {
  const base = 'inline-flex items-center justify-center rounded px-4 py-2 font-semibold focus:outline-none disabled:opacity-50';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    primary: 'bg-primary text-white hover:opacity-90',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/10',
  };
  const sizes = {
    default: '',
    icon: 'p-2',
  };
  const variantClasses = variants[variant] || variants.default;
  const sizeClasses = sizes[size] || sizes.default;
  return (
    <button className={`${base} ${variantClasses} ${sizeClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
