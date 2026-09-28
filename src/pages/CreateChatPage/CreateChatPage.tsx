import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/entities/session/model/useSession';
import { useMessages } from '@/features/messaging/model/useMessages';
import { useToast } from '@/shared/ui/useToast';

export function CreateChatPage() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const logout = useSession((s) => s.logout);
  const clearMessages = useMessages((s) => s.clearMessages);
  const showToast = useToast((s) => s.show);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10 || cleaned.length > 15) {
      showToast('Введите корректный номер телефона (10-15 цифр)');
      return;
    }
    clearMessages();
    navigate(`/chat/${cleaned}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-white rounded-xl p-10 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Новый чат</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="tel"
            placeholder="Номер телефона (например, 79001234567)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg text-base outline-none transition-colors focus:border-green-500"
          />
          <button
            type="submit"
            className="py-3 bg-green-500 text-white rounded-lg text-base font-medium cursor-pointer hover:bg-green-600 transition-colors"
          >
            Создать чат
          </button>
        </form>
        <button
          onClick={handleLogout}
          className="mt-4 bg-transparent border-none text-gray-400 cursor-pointer text-sm underline"
        >
          Выйти
        </button>
      </div>
    </div>
  );
}
