export interface GreenApiCredentials {
  idInstance: string;
  apiTokenInstance: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  fromMe: boolean;
  timestamp: number;
}

export interface Notification {
  receiptId: number;
  body: {
    typeWebhook: string;
    timestamp: number;
    idMessage: string;
    senderData?: {
      chatId: string;
      sender: string;
      senderName: string;
    };
    messageData?: {
      typeMessage: string;
      textMessageData?: { textMessage: string };
      extendedTextMessageData?: { text: string };
    };
  };
}
