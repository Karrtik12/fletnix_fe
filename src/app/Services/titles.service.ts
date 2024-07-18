import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TitleDetailModel, TitleListModel } from '../Models/title';
import { QueryModel } from '../Models/query';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TitlesService {

  baseUrl: string = 'http://127.0.0.1:5000/api/titles';
  authService = inject(AuthService);

  constructor(private http: HttpClient) { }

  getTitleById(id: string):Observable<TitleDetailModel>{
    return this.http.get<TitleDetailModel>(`${this.baseUrl}/${id}`);
  }

  searchTitles(query: string):Observable<TitleListModel>{
    let queryParams = new HttpParams();
    queryParams = queryParams.set("q", query);
    queryParams = queryParams.set("age", this.authService.loggedInUser.age.toString());
    return this.http.get<TitleListModel>(`${this.baseUrl}/search`,{params:queryParams})
  }

  getAllTitles(params: QueryModel):Observable<TitleListModel>{
    let queryParams = new HttpParams();
      queryParams = queryParams.set("age", this.authService.loggedInUser.age.toString());
    if (params.page !== undefined) {
      queryParams = queryParams.set("page", params.page.toString());
    }
    if (params.type !== undefined) {
      queryParams = queryParams.set("type", params.type.toString());
    }
    return this.http.get<TitleListModel>(`${this.baseUrl}/`,{params:queryParams})
  }
}
