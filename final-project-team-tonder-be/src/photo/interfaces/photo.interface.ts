import { PhotoDto } from "../dto/photo.dto";

export interface IPhotoService {
    uploadMultiFile(files: Express.Multer.File[], userId: string): Promise<{ urls: string[] }>;
    uploadFile(file: Express.Multer.File, userId: string): Promise<PhotoDto>;
    getAllPhotos(userId: string): Promise<PhotoDto[]>;
    updateIsFavoritePhoto(photoId: string): Promise<boolean>;
    deletePhoto(photoId: string): Promise<boolean>;
    getPhotoByUserId(userId: string): Promise<PhotoDto[]>;
}