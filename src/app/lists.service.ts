import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ListsService {
  baseUrl: string = 'https://api-sticky-note.vercel.app/list'

  constructor(private _HttpClient:HttpClient) { }

  getLists():Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/`)
  }
  postList(listName:object):Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/create`,listName)
  }
  updateList(id:string, listName:object):Observable<any> {
    return this._HttpClient.patch(`${this.baseUrl}/${id}/update`,listName)
  }
  deleteList(id:string):Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/${id}/delete`)
  }

}
