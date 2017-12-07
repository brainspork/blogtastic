import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UpdateProfileService {
  user: any;

  constructor(private http: Http) { }

  updateUser(user) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('http://localhost:7070/users/update', user, {headers: headers})
      .map(res => res.json());
  }
}
