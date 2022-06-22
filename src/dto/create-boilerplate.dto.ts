import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateBoilerplateDto {
    // Validates for a non-empty string
    @IsString()
    @IsNotEmpty()
    public name: string;
}