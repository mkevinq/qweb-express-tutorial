
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  createNewUser(payload) {
    return this.http.post(`${environment.baseURL}user/register`, payload);
  }
  userLogin(payload) {
    return this.http.post(`${environment.baseURL}user/login`, payload);
  }
  deletePost(payload) {
    console.log(payload)
    return this.http.delete(`${environment.baseURL}user/deletepost/${payload}`);
  }
  getProtectedData() {
    return this.http.get(`${environment.baseURL}user/data`);
  }
  getImages() {
    return this.http.get(`${environment.baseURL}user/imageList`);
  }
  constructor(private http: HttpClient) {}

  addFiles(images: File,imageDesc,imageSkills) {
    var arr = []
    var formData = new FormData();
    arr.push(images);

    arr[0].forEach((item, i) => {
      formData.append('avatar', arr[0][i]);
    })

    formData.append('id',localStorage.getItem('Id'))
    formData.append('desc',imageDesc)
    formData.append('skills',imageSkills)

    console.log(localStorage.getItem('Id'))
    let user_id = localStorage.getItem('Id')
    
    return this.http.put(`${environment.baseURL}user/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
    
  }

  createVideo(images){
    return this.http.post('https://api.rocketium.com/videos?access_token=ea988f95632b2bc0b06b88476d3912ecb35708aaf2b3b867c909bde9c27395d05ed1a3e0bdea628ac1959f447fdc417d3d3edf0deef7504b41d6646af6bc15e53caff6bfbb35af5617f1d4dd', 
    images, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}