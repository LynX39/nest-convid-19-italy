import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { map, switchMap, catchError } from 'rxjs/operators';
import csv = require('csvtojson');
import { from, Observable, of } from 'rxjs';
import { RawQueryDto } from './dto/raw-query.dto';
import { ParamsDirFileDto } from './dto/params-dir-file.dto';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) { }

  getHello(): string {
    return 'Hello World!';
  }

  getRawData(params: ParamsDirFileDto, query: RawQueryDto): Observable<any> {
    const dir: string = params.dir;
    const file: string = params.file;
    const extension: string = file.split('.').splice(1)[0];

    const branch = query.branch ?? 'master';

    return this.httpService.get(
      `https://raw.githubusercontent.com/pcm-dpc/COVID-19/${branch}/${dir}/${file}`,
    ).pipe(
      switchMap((data) => {
        if (extension === 'csv') {
          return from(
            csv({ noheader: false }).fromString(data.data).then((jsonObj) => {
              return JSON.parse(JSON.stringify(jsonObj), (key, value) => {
                return !!+value ? +value : value;
              });
            }));
        } else {
          return of(data.data);
        }
      }),
      catchError((err) => {
        throw new HttpException({
          message: err.response.statusText,
          code: err.response.status,
        }, err.response.status);
      }),
      map((data) => {
        return (data.length === 1) ? data[0] : data;
      }),
    );
  }
}
