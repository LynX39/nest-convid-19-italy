import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiConflictResponse, ApiParam } from '@nestjs/swagger';
import { ParamsDirFileDto } from './dto/params-dir-file.dto';
import { RawQueryDto } from './dto/raw-query.dto';

@ApiTags('CONVID-19 Italy Data')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/raw/:dir/:file')
  @ApiOkResponse({description: 'Valid Resource'})
  @ApiNotFoundResponse({description: 'Not Valid Resource'})
  @ApiConflictResponse({description: 'Valid Resource But '})
  getData(@Param() params: ParamsDirFileDto, @Query() query: RawQueryDto) {
    return this.appService.getRawData(params, query);
  }
}
