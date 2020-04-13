import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../model/User';
import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  secretKey = "souvik";
  constructor(private _http: HttpClient) { }

  getAuthenticationStatus(request): Observable<HttpResponse<IUser>> {
    return this._http.post<IUser>(apiUrl + '/validateCredentials', request, { observe: 'response' });
  }

  getAuthenticationStatus2(request): Observable<HttpResponse<IUser>> {
    return this._http.post<IUser>(apiUrl + '/login', request, { observe: 'response' });
  }
}
