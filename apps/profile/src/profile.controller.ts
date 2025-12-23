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

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('createProfile')
  createProfile(@Req() req, @Body() dto: CreateProfileDto) {
    console.log(req.user.userId);
    // this.profileService.createProfile(req.body.birthday);
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
