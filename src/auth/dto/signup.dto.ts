import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateAuthDto {
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsStrongPassword()
    password:string;

}
