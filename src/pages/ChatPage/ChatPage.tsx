import { useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSession } from '@/entities/session/model/useSession.ts';
import { useMessages } from '@/features/messaging/model/useMessages.ts';
import { MessageInput } from '@/features/messaging/ui/MessageInput';
import { useToast } from '@/shared/ui/useToast';
import { sendMessage, receiveNotification, deleteNotification } from '@/shared/api/greenApi.ts';

export function ChatPage() {
  const { phone } = useParams<{ phone: string }>();
  const navigate = useNavigate();
  const credentials = useSession((s) => s.credentials);
  const { messages, addMessage } = useMessages();
  const bottomRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef(true);
  const showToast = useToast((s) => s.show);

  const chatId = `${phone}@c.us`;

  const poll = useCallback(async () => {
    if (!credentials) return;

    while (pollingRef.current) {
      try {
        const notification = await receiveNotification(credentials);
        if (!notification) {
          await new Promise((r) => setTimeout(r, 1000));
          continue;
        }

        await deleteNotification(credentials, notification.receiptId);

        const { body } = notification;
        if (body.typeWebhook === 'incomingMessageReceived' && body.senderData?.chatId === chatId) {
          const text =
            body.messageData?.textMessageData?.textMessage ??
            body.messageData?.extendedTextMessageData?.text;

          if (text) {
            addMessage({
              id: body.idMessage,
              text,
              fromMe: false,
              timestamp: body.timestamp,
            });
          }
        }
      } catch {
        await new Promise((r) => setTimeout(r, 3000));
      }
    }
  }, [credentials, chatId, addMessage]);

  useEffect(() => {
    if (!credentials) {
      navigate('/');
      return;
    }
    pollingRef.current = true;
    poll();
    return () => {
      pollingRef.current = false;
    };
  }, [credentials, navigate, poll]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!credentials) return;
    try {
      const res = await sendMessage(credentials, chatId, text);
      addMessage({
        id: res.idMessage,
        text,
        fromMe: true,
        timestamp: Date.now() / 1000,
      });
    } catch (err) {
      showToast((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[600px] h-screen bg-white shadow-xl">
      <header className="flex items-center gap-3 px-4 py-3 bg-green-500 text-white">
        <button
          onClick={() => navigate('/chat/new')}
          className="bg-transparent border-none text-white text-xl cursor-pointer px-2 py-1"
        >
          ←
        </button>
        <span className="text-lg font-semibold">{phone}</span>
      </header>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-[#e5ddd5]">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-10">Нет сообщений. Напишите первым!</div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[70%] px-3.5 py-2 rounded-xl text-base leading-relaxed break-words ${
                msg.fromMe ? 'bg-[#dcf8c6] rounded-br-sm' : 'bg-white rounded-bl-sm'
              }`}
            >
              <p>{msg.text}</p>
              <span className="block text-right text-xs text-gray-400 mt-1">
                {new Date(msg.timestamp * 1000).toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
}
