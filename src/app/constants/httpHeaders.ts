import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET, POST, PUT',
  }),
};
