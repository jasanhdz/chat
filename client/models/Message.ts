type MessageType = 'text' | 'image'

class Message {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  messageType: MessageType;
  fromMe: boolean

  constructor(id: string, author: string, content: string, timestamp: Date, messageType: MessageType = 'text', fromMe: boolean = false) {
    this.id = id;
    this.author = author;
    this.content = content;
    this.timestamp = timestamp;
    this.fromMe = fromMe;
    this.messageType = messageType;
  }

  getFormattedDate() {
    return this.timestamp.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })
  }

  getFormattedContent() {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return this.content.replace(urlRegex, '<a href="$1" target="_blank">$1</a>')
  }
}

export default Message;