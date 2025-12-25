import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessagePattern, Payload, EventPattern } from '@nestjs/microservices';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @MessagePattern('viewMessages')
  viewMessages(@Payload() data: { userId: string }) {
    return this.chatService.viewMessages(data.userId);
  }

  @EventPattern('chat.send')
  handleChat(@Payload() data: any) {
    console.log('📩 CHAT DIKONSUMSI:', data);
    return this.chatService.saveMessage(data);
  }
}
