import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  public loadData<T>(url: string): Promise<T> {
    return this.http.get<T>(this.baseUrl + url).toPromise();
  }

  public postData<TSource, TDest>(url: string, data: TSource): Promise<TDest> {
    return this.http.post<TDest>(this.baseUrl + url, data).toPromise();
  }
}
