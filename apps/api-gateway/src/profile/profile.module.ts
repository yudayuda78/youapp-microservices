import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROFILE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'profile',
          port: 3002,
        },
      },
    ]),
  ],

  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
