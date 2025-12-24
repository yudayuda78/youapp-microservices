import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Body,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @MessagePattern('createProfile')
  createProfile(@Payload() data: { userId: string; dto: CreateProfileDto }) {
    return this.profileService.createProfile(data.userId, data.dto);
  }

  // @Get('getProfile')
  // getProfile(@Req() req) {
  //   return this.profileService.getProfile(req.user.userId);
  // }

  // @Put('updateProfile')
  // updateProfile(@Req() req, @Body() dto: CreateProfileDto) {
  //   return this.profileService.updateProfile(req.user.userId, dto);
  // }
}
