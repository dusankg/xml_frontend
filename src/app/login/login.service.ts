import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {UserDTO} from '../model/UserDTO';
import {ResetPasswordDTO} from '../model/ResetPasswordDTO';
import {ValidationDTO} from '../model/ValidationDTO';

@Injectable()
export class LoginService {
  private readonly userUrl: string;
  private readonly registerURL: string;
  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8079/login-service/';
    this.registerURL = 'http://localhost:8079/register-service/resetPassword';
  }

  public getUser(username: string, password: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(this.userUrl, {username, password}, {headers : new HttpHeaders ({'Content-Type' : 'application/json'}), observe: 'response'});
  }

  public sendRequest(request: ResetPasswordDTO){
    return this.http.post<any>(this.registerURL, request);
  }

  public validate(validation: ValidationDTO){
    return this.http.put<any>(this.registerURL, validation);
  }
}
