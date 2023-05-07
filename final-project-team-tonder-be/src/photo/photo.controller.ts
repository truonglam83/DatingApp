import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Authenticated } from '../common/decorators/gettoken.decorator';
import { PhotoEntity } from './entities/photo.entity';
import { PhotoService } from './photo.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { PhotoDto } from './dto/photo.dto';

@ApiTags('')
@Controller('photo')
export class PhotoController {
  constructor(private readonly _photoService: PhotoService) { }

  @Post('upload')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @Authenticated() user,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<{ urls: string[] }> {
    const data = await this._photoService.uploadMultiFile(files, user.id);
    return data;
  }

  @Get('all-photos')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all photos' })
  async getAllPhotos(@Authenticated() user): Promise<PhotoDto[]> {
    const photos = await this._photoService.getAllPhotos(user.id);
    return photos;
  }

  @Put('/set-favorite/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: ' Set is favorite Photo ' })
  async updateIsFavoritePhoto(@Param() { id }): Promise<void> {
    await this._photoService.updateIsFavoritePhoto(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: ' Delete Photo ' })
  async deletePhoto(@Param() { id }): Promise<void> {
    await this._photoService.deletePhoto(id);
  }

  @Get(':id')
  @ApiOperation({ summary: ' Get Photo By User Id ' })
  async getPhotoByUserId(@Param() { id }): Promise<PhotoDto[]> {
    const photo = await this._photoService.getPhotoByUserId(id);
    return photo;
  }
}
