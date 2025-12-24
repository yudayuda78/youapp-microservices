import { Injectable, Inject } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProfileService {
  constructor(@Inject('PROFILE_SERVICE') private profileClient: ClientProxy) {}

  createProfile(dto: CreateProfileDto) {
    return this.profileClient.send('createProfile', dto);
  }
}
