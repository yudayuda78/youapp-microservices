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

  @MessagePattern('getProfile')
  getProfile(@Payload() data: { userId: string }) {
    return this.profileService.getProfile(data.userId);
  }

  @MessagePattern('updateProfile')
  updateProfile(@Payload() data: { userId: string; dto: CreateProfileDto }) {
    return this.profileService.updateProfile(data.userId, data.dto);
  }
}
