import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { CreateChatPage } from '@/pages/CreateChatPage/CreateChatPage';
import { ChatPage } from '@/pages/ChatPage/ChatPage';
import { ProtectedRoute } from './ProtectedRoute';
import { Toast } from '@/shared/ui/Toast';
import { useToast } from '@/shared/ui/useToast';
import './index.css';

export function App() {
  const { message, type, hide } = useToast();

  return (
    <BrowserRouter>
      {message && <Toast message={message} type={type} onClose={hide} />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/chat/new"
          element={
            <ProtectedRoute>
              <CreateChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:phone"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
