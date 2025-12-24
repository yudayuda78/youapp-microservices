import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './profile.schema';

import { calculateHoroscope } from './utils/horoscope';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Model } from 'mongoose';
import { calculateZodiac } from './utils/zodiac';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: Model<Profile>,
  ) {}

  createProfile(userId: string, dto: CreateProfileDto) {
    const birthday = new Date(dto.birthday);

    const zodiac = calculateZodiac(birthday);
    const horoscope = calculateHoroscope(birthday);

    return this.profileModel.create({
      ...dto,
      userId,
      birthday,
      zodiac,
      horoscope,
    });
  }

  getProfile(userId: string) {
    return this.profileModel.findOne({ userId });
  }

  async updateProfile(userId: string, dto: CreateProfileDto) {
    // ambil profile lama
    const profile = await this.profileModel.findOne({ userId });
    if (!profile) throw new Error('Profile not found');

    // pakai birthday baru kalau ada, kalau tidak pakai birthday lama
    const birthday = dto.birthday ? new Date(dto.birthday) : profile.birthday;

    // hitung ulang zodiac dan horoscope
    const zodiacData = birthday ? calculateZodiac(birthday) : {};

    const horoscopeData = birthday ? calculateHoroscope(birthday) : {};

    console.log('Updating userId:', userId);
    console.log('Update data:', { ...dto, zodiacData, horoscopeData });

    // merge semua data dan update
    const updatedProfile = await this.profileModel.findOneAndUpdate(
      { userId },
      {
        ...dto,
        zodiac: zodiacData, // gunakan nama field schema
        horoscope: horoscopeData,
      },
      { new: true },
    );

    return updatedProfile;
  }
}
