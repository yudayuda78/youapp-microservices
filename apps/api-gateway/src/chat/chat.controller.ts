import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class ChatController {
  constructor(@Inject('CHAT_SERVICE') private chatClient: ClientProxy) {}

  @UseGuards(JwtAuthGuard)
  @Post('sendMessage')
  send(@Req() req: any, @Body() data: any) {
    const userId = req.user.sub;
    data.from = userId;
    this.chatClient.emit('chat.send', data);

    return { status: 'sent' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('viewMessages')
  viewMessages(@Req() req: any) {
    const userId = req.user.sub;

    return this.chatClient.send('viewMessages', { userId });
  }
}
