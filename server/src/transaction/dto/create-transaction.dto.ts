import { IsNotEmpty, IsNumber, IsString, isNumber } from "class-validator"
import { Category } from "src/category/entities/category.entity"
import { User } from "src/user/entities/user.entity"

export class CreateTransactionDto {
    @IsNotEmpty()
    title:string

    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsString()
    type:'expense' | 'income'

    @IsNotEmpty()
    category:Category

    // @IsNotEmpty()
    user: User
}
