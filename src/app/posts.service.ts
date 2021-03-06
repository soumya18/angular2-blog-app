import { Injectable } from '@angular/core';

//import { Http, Response, URLSearchParams } from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

/* import observable and rxjs operators */
import { Observable } from 'rxjs/observable'; // using this you have to explicitly import observable operators
//import { Observable } from 'rxjs/Rx'; // it will import all the data
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/* import Post class */
import { Posts } from './posts';

@Injectable()
export class PostsService {

  private postsUrl = './app/posts.json';

  constructor(private http: Http) { }

  getAllPosts (): Observable<Posts[]> {
    // let params: URLSearchParams = new URLSearchParams();
    // params.set('category_id', categoryId);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.postsUrl , options)
                .map(this.extractData)
                .catch(this.handleError);
  }

  private extractData(res: Response){
    let body = res.json();
    return body || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if(error instanceof Response) {
      const body = error.json() || '';
      const err  = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);  
  }

}