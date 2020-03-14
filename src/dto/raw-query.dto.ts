import { IsOptional, IsInt, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * @class RawQueryDto
 * @description DTO for raw query
 */
export class RawQueryDto {
    @ApiPropertyOptional({
        default: 'master',
        description: 'Field of path proxy data retrive ```{repo}/{branch}/{dir}/{file}```',
    })
    @IsString()
    @Type(() => String)
    @IsOptional()
    readonly branch?: string;
}
