import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class LoginService {
  private readonly userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'https://localhost:8080/users/login';
  }

  public getUser(password: string): Observable<any> {
    return this.http.post<any>(this.userUrl, {password});
  }

  public getSecretString(): Observable<string> {
    return this.http.get<string>('https://localhost:8080/randomTest',  { responseType: 'text' as 'json'});
  }
}
