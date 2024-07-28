import { IsNotEmpty, IsEmail, Matches, MinLength } from "class-validator"

export class UserDTO {
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string
}