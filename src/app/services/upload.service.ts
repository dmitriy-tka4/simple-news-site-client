import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http: HttpClient
  ) {

  }

  upload(data: FormData) {
    return this.http
      .post(`${environment.backendUrl}/upload`, data, { responseType: 'text' });
  }
}
