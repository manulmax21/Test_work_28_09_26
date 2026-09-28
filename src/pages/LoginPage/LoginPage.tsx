import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/entities/session/model/useSession.ts';

export function LoginPage() {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const login = useSession((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idInstance.trim() && apiTokenInstance.trim()) {
      login({ idInstance: idInstance.trim(), apiTokenInstance: apiTokenInstance.trim() });
      navigate('/chat/new');
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-white rounded-xl p-10 shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">GREEN-API Чат</h1>
        <p className="text-sm text-gray-400 mb-6">Введите данные вашего инстанса GREEN-API</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="idInstance"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg text-base outline-none transition-colors focus:border-green-500"
          />
          <input
            type="text"
            placeholder="apiTokenInstance"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg text-base outline-none transition-colors focus:border-green-500"
          />
          <button
            type="submit"
            className="py-3 bg-green-500 text-white rounded-lg text-base font-medium cursor-pointer hover:bg-green-600 transition-colors"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
