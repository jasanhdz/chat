export interface Message {
  isFromMe: boolean;
  hasMargin?: boolean;
  conversation?: string;
  urlImage?: string;
  timestamp?: number;
};