import { FirebaseModule } from './../common/firebase/firebase.module';
import { Module } from "@nestjs/common";
import { FirebaseService } from "../common/firebase/firebase.service";
import { PhotoController } from "./photo.controller";
import { PhotoService } from "./photo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhotoEntity } from "./entities/photo.entity";
import { PhotoProfile } from "./photo.profile";

@Module({
    imports: [TypeOrmModule.forFeature([PhotoEntity]), FirebaseModule],
    controllers: [PhotoController],
    providers: [PhotoService, PhotoProfile],
})
export class PhotoModule { }
