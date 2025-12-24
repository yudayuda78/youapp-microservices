import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
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
}
