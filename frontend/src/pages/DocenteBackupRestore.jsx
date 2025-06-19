import { useState } from 'react';
import { Button } from '@/components/ui';
import { DownloadIcon, UploadIcon } from 'lucide-react';

export default function DocenteBackupRestore() {
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleBackup() {
    setLoading(true);
    setMsg('');
    const res = await window.electronAPI.backup();
    setLoading(false);
    if (res.ok) setMsg('✅ Backup realizado exitosamente.');
    else setMsg('❌ Error: ' + (res.error || 'No se pudo realizar el backup.'));
  }

  async function handleRestore() {
    setLoading(true);
    setMsg('');
    const res = await window.electronAPI.restore();
    setLoading(false);
    if (res.ok) setMsg('✅ Restauración completada. Reinicia la aplicación.');
    else setMsg('❌ Error: ' + (res.error || 'No se pudo restaurar.'));
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-blue-900">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Respaldo y Restauración</h1>
        <div className="flex flex-col gap-6 mb-4">
          <Button variant="primary" onClick={handleBackup} disabled={loading} className="flex items-center gap-2">
            <DownloadIcon /> Hacer Backup
          </Button>
          <Button variant="outline" onClick={handleRestore} disabled={loading} className="flex items-center gap-2">
            <UploadIcon /> Restaurar Backup
          </Button>
        </div>
        <div className="text-center mt-4 text-lg">
          {loading && <span className="text-blue-500">Procesando...</span>}
          {msg && <div>{msg}</div>}
        </div>
      </div>
      <div className="mt-8 text-gray-600 dark:text-gray-400 max-w-md text-center">
        El respaldo incluye tu base de datos y archivos educativos.
        Usa “Restaurar” solo si necesitas recuperar información perdida.
        <b className="block mt-2">Recomendación:</b> Haz un backup antes de cada actualización importante.
      </div>
    </div>
  );
}
