import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserDTO} from '../model/UserDTO';
import {ValidationDTO} from '../model/ValidationDTO';

@Injectable()
export class RegisterService {
  private readonly registerURL: string;


  constructor(private http: HttpClient) {
    this.registerURL = 'http://localhost:8079/register-service/register';
  }

  public sendRequest(user: UserDTO){
    return this.http.post<any>(this.registerURL, user);
  }

  public validate(validation: ValidationDTO){
    return this.http.put(this.registerURL, validation);
  }
}
