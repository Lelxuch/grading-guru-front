import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get("/api/accounts");
  }

  getUser(id: number) {
    return this.http.get(`/api/accounts/${id}/id`);
  }

  createUser(user: any) {
    delete user['imageSource'];
    return this.http.post("/api/accounts", user)
  }

  updateUser(userId: number | null, user: any) {
    delete user['imageSource'];
    return this.http.put(`/api/accounts/${userId}`, user)
  }

}
