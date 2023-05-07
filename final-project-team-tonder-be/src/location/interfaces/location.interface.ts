import { UserProfileDto } from "src/user/dto/user-profile.dto";
import { CreateLocationDto } from "../dto/create-location.dto";

export interface ILocationService {
    findUsersInRadius(latitude: number, longitude: number, radius: number, userId: string): Promise<UserProfileDto[]>;
    createLocation(userId: string, createLocation: CreateLocationDto): Promise<any>;
}
