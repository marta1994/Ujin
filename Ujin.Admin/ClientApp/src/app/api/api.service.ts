import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  public loadData<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url);
  }

  public postData<TSource, TDest>(url: string, data: TSource): Observable<TDest> {
    return this.http.post<TDest>(this.baseUrl + url, data);
  }
}
