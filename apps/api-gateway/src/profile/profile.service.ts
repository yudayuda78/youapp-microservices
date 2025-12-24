import { Injectable, Inject } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProfileService {
  constructor(@Inject('PROFILE_SERVICE') private profileClient: ClientProxy) {}

  createProfile(userId: string, dto: CreateProfileDto) {
    return this.profileClient.send('createProfile', {
      userId,
      dto,
    });
  }

  getProfile(userId: string) {
    return this.profileClient.send('getProfile', { userId });
  }

  updateProfile(userId: string, dto: CreateProfileDto) {
    return this.profileClient.send('updateProfile', {
      userId,
      dto,
    });
  }
}
