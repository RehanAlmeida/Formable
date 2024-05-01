import {Injectable, signal, WritableSignal} from '@angular/core';
import {UserType} from "../types/user.type";
import {LoginType} from "../types/login.type";
import {HttpClient} from "@angular/common/http";
import {ApiResponseType} from "../types/api-response.type";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API = environment.API

  public isLoggedIn: WritableSignal<boolean> = signal(false);
  public isAdmin: WritableSignal<boolean> = signal(false);
  public user: WritableSignal<UserType | null> = signal(null);

  constructor(private http: HttpClient) {
    if (localStorage.getItem('userId') !== undefined) {
      http.get<ApiResponseType>(`${environment.API}user/${localStorage.getItem('userId')}`)
        .subscribe({
          next: (response: ApiResponseType) => {
            this.isLoggedIn.set(true)
            this.user.set(response.data)
            if ((response.data as UserType).user_type === 0) {
              this.isAdmin.set(true)
            }
          },
        })
    } else {
      window.location.replace('/login')
    }
    // if (localStorage.getItem("isLoggedIn") === "true") {
    //   this.isLoggedIn.set(true)
    //   if (localStorage.getItem("isAdmin") === "true") {
    //
    //   }
    // }
  }

  login(data: LoginType) {
    return this.http.post<ApiResponseType>(this.API + 'user/login', data)
  }

  register(data: UserType) {
    return this.http.post<ApiResponseType>(this.API + 'user', data)
  }

  updateProfile(data: UserType) {
    return this.http.put<ApiResponseType>(this.API + `user/${localStorage.getItem("userId")}`, data)
  }

  getUser() {
    return this.http.get<ApiResponseType>(`${environment.API}user/${localStorage.getItem("userId")}`)
  }
}
