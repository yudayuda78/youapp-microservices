import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ChatService {
  constructor(@Inject('CHAT_SERVICE') private chatClient: ClientProxy) {}
}
