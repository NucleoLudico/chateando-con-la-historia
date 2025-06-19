import { useEffect, useState } from 'react';

export default function NotificacionBackupAuto() {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    const handler = (e) => setMsg(e.detail);
    window.addEventListener('backup-realizado', handler);
    return () => window.removeEventListener('backup-realizado', handler);
  }, []);
  if (!msg) return null;
  return (
    <div className="fixed bottom-5 right-5 bg-green-100 text-green-800 rounded-2xl px-5 py-3 shadow-lg z-50">
      {msg}
    </div>
  );
}
