import Message from "./Message";

class Channel {
  id: string | null;
  userName: string;
  avatar: string | null;
  messages: Message[];
  timestamp: Date;

  constructor(
    id: string,
    userName: string,
    avatar: string | null = null,
    messages: Message[] = [],
    timestamp: Date = new Date(),
  ) {
    this.id = id;
    this.userName = userName;
    this.avatar = avatar;
    this.messages = messages;
    this.timestamp = timestamp;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  getRecentMessages(limit: number = 50): Message[] {
    return this.messages.slice(-limit);
  }
}

export default Channel;