import { useState } from 'react';

interface Props {
  onSend: (text: string) => Promise<void>;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: Props) {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    setSending(true);
    try {
      await onSend(trimmed);
      setText('');
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 px-4 py-3 border-t border-gray-200 bg-gray-100"
    >
      <input
        type="text"
        placeholder="Введите сообщение..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled || sending}
        autoFocus
        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-3xl text-base outline-none focus:border-green-500"
      />
      <button
        type="submit"
        disabled={!text.trim() || sending}
        className="w-11 h-11 rounded-full border-none bg-green-500 text-white text-lg cursor-pointer flex items-center justify-center disabled:bg-green-300 disabled:cursor-default"
      >
        ➤
      </button>
    </form>
  );
}
