import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './profile.schema';
import { calculateZodiac } from './utils/zodiac';
import { calculateHoroscope } from './utils/horoscope';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  // constructor(
  //   @InjectModel(Profile.name)
  //   private profileModel: Model<Profile>,
  // ) {}

  createProfile(req) {
    console.log(req);
    // const birthday = new Date(dto.birthday);
    // const { zodiac } = calculateZodiac(birthday);
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
