import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  baseUrl: string = 'https://api-sticky-note.vercel.app'

  constructor(private _HttpClient:HttpClient) { }

  getNote(id:any):Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/list/${id}/note`)
  }
  postNote(id:any,formData:object):Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/list/${id}/note`,formData)
    
  }
  updateNote(id:string, formData:object):Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/note/${id}/update`,formData)
  }
  deleteNote(id:string):Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/note/${id}/delete`)
  }
}
