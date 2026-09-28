import { API_URL } from '../config/env';
import type { GreenApiCredentials, Notification } from '../types';

export async function sendMessage(
  creds: GreenApiCredentials,
  chatId: string,
  message: string,
): Promise<{ idMessage: string }> {
  const url = `${API_URL}/waInstance${creds.idInstance}/sendMessage/${creds.apiTokenInstance}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message }),
  });
  if (!res.ok) throw new Error(`Ошибка отправки: ${res.status}`);
  return res.json();
}

export async function receiveNotification(
  creds: GreenApiCredentials,
): Promise<Notification | null> {
  const url = `${API_URL}/waInstance${creds.idInstance}/receiveNotification/${creds.apiTokenInstance}?receiveTimeout=5`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Ошибка получения: ${res.status}`);
  return res.json();
}

export async function deleteNotification(
  creds: GreenApiCredentials,
  receiptId: number,
): Promise<boolean> {
  const url = `${API_URL}/waInstance${creds.idInstance}/deleteNotification/${creds.apiTokenInstance}/${receiptId}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Ошибка удаления: ${res.status}`);
  const data = await res.json();
  return data.result;
}
