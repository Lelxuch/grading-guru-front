import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(
    private http: HttpClient
  ) { }

  getApplications(filters: Array<{ key: string; value: string[] }>) {
    let params = new HttpParams();
    console.log(filters);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    return this.http.get(`/api/applications/filter`, { params });
  }

  getRegions() {
    return this.http.get("/api/regions");
  }

  getExaminer(id: number) {
    return this.http.get(`/api/applications/${id}`);
  }

  getStats(filters: Array<{ key: string; value: string }>) {
    let params = new HttpParams();
    // filters.forEach(filter => {
    //   filter.value.forEach(value => {
    //     params = params.append(filter.key, value);
    //   });
    // });
    filters.forEach(filter => {
      if (filter.value) {
        params = params.append(filter.key, filter.value);
      }
    });
    return this.http.get("/api/regions/filter", { params })
  }

  approveExaminer(id: number) {
    return this.http.post(`/api/applications/${id}/approve`, id)
  }

  rejectExaminer(id: number) {
    return this.http.post(`/api/applications/${id}/reject`, id)
  }

}
