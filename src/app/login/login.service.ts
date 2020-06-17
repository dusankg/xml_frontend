import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class LoginService {
  private readonly userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8079/login-service/';
  }

  public getUser(username: string, password: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(this.userUrl, {username, password}, {headers : new HttpHeaders ({'Content-Type' : 'application/json'}), observe: 'response'});
  }

  public getSecretString(): Observable<string> {
    return this.http.get<string>('http://localhost:8080/randomTest',  { responseType: 'text' as 'json'});
  }
}
