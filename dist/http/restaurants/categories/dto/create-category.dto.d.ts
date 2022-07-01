import { CreateUserDto } from 'src/http/users/dto/create-user.dto';
export declare class CreateRestaurantDto {
    name: string;
    address: string;
    user: CreateUserDto;
}
