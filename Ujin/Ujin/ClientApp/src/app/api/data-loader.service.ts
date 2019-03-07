import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataLoaderService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  public loadData<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url);
  }
}
