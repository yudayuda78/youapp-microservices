import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './profile.schema';

import { calculateHoroscope } from './utils/horoscope';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Model } from 'mongoose';
import { calculateZodiac } from './utils/zodiac';

@Injectable()
export class ProfileService {
  // constructor(
  //   @InjectModel(Profile.name)
  //   private profileModel: Model<Profile>,
  // ) {}

  createProfile(dto: CreateProfileDto) {
    const birthday = new Date(dto.birthday);

    const zodiac = calculateZodiac(birthday);
    console.log({ zodiac });
    // const { horoscope } = calculateHoroscope(birthday);
    // return this.profileModel.create({
    //   ...dto,
    //   userId,
    //   birthday,
    //   zodiac,
    //   horoscope,
    // });
  }

  // getProfile(userId: string) {
  //   return this.profileModel.findOne({ userId });
  // }

  // updateProfile(userId: string, dto: CreateProfileDto) {
  //   const birthday = dto.birthday ? new Date(dto.birthday) : undefined;

  //   const zodiacData = birthday ? calculateZodiac(birthday) : {};

  //   return this.profileModel.findOneAndUpdate(
  //     { userId },
  //     { ...dto, ...zodiacData },
  //     { new: true },
  //   );
  // }
}
