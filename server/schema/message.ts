
import { Document, Types , model, Schema } from "mongoose";

export interface IMessage extends Document {
  from: Types.ObjectId;
  to: Types.ObjectId;
  content: string;
  messageType: 'text' | 'image';
  imageMessage?: {
    jpegThumbnail?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  
  getFormattedDate(): string;
  
  getImageUrl(): string | null;
}

const MessageSchema: Schema<IMessage> = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ['text', 'image'],
      default: 'text',
    },
    imageMessage: {
      jpegThumbnail: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.uid = ret._id;
        ret.timestamp = ret.createdAt;
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
  }
);


export default model<IMessage>("Message", MessageSchema);
