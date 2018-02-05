import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PostDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PostDataProvider Provider');
  }
  postData(link, data){
    return this.http.post(link,data);
  }
}
