import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the GetDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class GetDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GetDataProvider Provider');
  }
  getData(link,options?){
    return this.http.get(link,options);
  }
}
