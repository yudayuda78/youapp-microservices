import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('createProfile')
  createProfile(@Req() req, @Body() dto: CreateProfileDto) {
    const userId = req.user.sub;

    return this.profileService.createProfile(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  getProfile(@Req() req) {
    const userId = req.user.sub;
    return this.profileService.getProfile(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateProfile')
  updateProfile(@Req() req, @Body() dto: CreateProfileDto) {
    const userId = req.user.sub;
    return this.profileService.updateProfile(userId, dto);
  }
}
