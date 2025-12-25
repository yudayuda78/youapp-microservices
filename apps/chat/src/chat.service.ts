import { Inject, Injectable } from '@nestjs/common';
import { ChatDto } from './dto/chat.dto';
import { Chat } from './chat.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async viewMessages(userId: string): Promise<Chat[]> {
    return this.chatModel
      .find({
        $or: [{ from: userId }, { to: userId }],
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async saveMessage(data: ChatDto) {
    return this.chatModel.create(data);
  }
}
