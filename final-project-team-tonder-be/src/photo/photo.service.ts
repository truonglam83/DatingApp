import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FirebaseService } from '../common/firebase/firebase.service';
import { HttpExceptionFilter } from '../exceptions/http-exception.filter';
import { PhotoDto } from './dto/photo.dto';
import { PhotoEntity } from './entities/photo.entity';
import { IPhotoService } from './interfaces/photo.interface';
@Injectable()
export class PhotoService implements IPhotoService {
  constructor(
    private readonly _firebaseService: FirebaseService,
    @InjectRepository(PhotoEntity) private _photoRepo: Repository<PhotoEntity>,
    @InjectMapper() private readonly _mapper: Mapper
  ) {}

  async uploadMultiFile(
    files: Express.Multer.File[],
    userId: string
  ): Promise<{ urls: string[] }> {
    const urls = [];
    for (const file of files) {
      const url = await this.uploadFile(file, userId);
      urls.push(url);
    }
    return { urls };
  }

  async uploadFile(
    file: Express.Multer.File,
    userId: string
  ): Promise<PhotoDto> {
    if (file.size > 5 * 1024 * 1024) {
      // File size must be below 5MB
      throw new BadRequestException('File size must be below 5MB');
    }

    const path = `images/${Date.now()}_${file.filename}`;
    const url = await this._firebaseService.uploadFile(file.buffer, path);
    const data = await this._photoRepo.save({
      link: url,
      isFavorite: false,
      userId: userId,
    });
    return data;
  }

  async getAllPhotos(userId: string): Promise<PhotoDto[]> {
    const photos = await this._photoRepo.find({
      where: {
        userId: userId,
      },
    });
    const result = this._mapper.mapArray(photos, PhotoEntity, PhotoDto);
    return result;
  }

  async updateIsFavoritePhoto(photoId: string): Promise<boolean> {
    const photo = await this._photoRepo.findOne({ where: { id: photoId } });
    if (!photo) {
      throw new HttpExceptionFilter();
    }
    if (photo.isFavorite) {
      await this._photoRepo.update({ id: photoId }, { isFavorite: false });
    } else await this._photoRepo.update({ id: photoId }, { isFavorite: true });
    return true;
  }

  async deletePhoto(photoId: string): Promise<boolean> {
    const photo = await this._photoRepo.delete({ id: photoId });
    if (!photo) {
      throw new HttpExceptionFilter();
    }
    return true;
  }

  async getPhotoByUserId(userId: string): Promise<PhotoDto[]> {
    try {
      const photo = await this._photoRepo.find({
        where: {
          userId: userId,
        },
      });
      return photo;
    } catch (error) {
      console.log(error);
    }
  }
}
