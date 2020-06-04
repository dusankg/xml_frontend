import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {jitOnlyGuardedExpression} from '@angular/compiler/src/render3/util';

@Injectable()
export class AdminService {
  private readonly userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'https://localhost:8080/users/login';
  }

  public getUser(password: string): Observable<any> {
    return this.http.post<any>(this.userUrl, {password});
  }

  public getAllUsers(){

  }

  public blockUser(userId: number){

  }

  public activateUser(userId: number){

  }
  public deleteUser(userId: number){

  }
}
