import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ParamsDirFileDto {
  @ApiProperty({
    description: 'Field of path proxy data retrive ```{repo}/{branch}/{dir}/{file}```',
  })
  @IsString()
  dir: string;

  @ApiProperty({
    description: 'Field of path proxy data retrive ```{repo}/{branch}/{dir}/{file}```',
  })
  @IsString()
  file: string;
}
