export function Card({ children, ...props }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg" {...props}>{children}</div>
  );
}

export function CardHeader({ children, ...props }) {
  return (
    <div className="p-4 border-b" {...props}>{children}</div>
  );
}

export function CardContent({ children, ...props }) {
  return (
    <div className="p-4" {...props}>{children}</div>
  );
}
