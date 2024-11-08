export interface Credentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface User {
  fullName: string;
  email: string;
  online: boolean;
  uid: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  token: string;
}

export interface RegisterResponse {
  success: boolean;
  user: User;
  token: string;
}

export interface Message {
  from: string; // ID del usuario que envía el mensaje
  to: string;   // ID del usuario que recibe el mensaje
  content: string;
  messageType: 'text' | 'image';
  imageMessage?: {
    jpegThumbnail?: string;
  };
}

export interface GetMessagesResponse {
  success: boolean;
  myId: string;
  messages: Message[];
}
