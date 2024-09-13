import { IsNumber, IsOptional, IsPositive } from "class-validator";



export class PaginationDTO {
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    page: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    limit: number

}