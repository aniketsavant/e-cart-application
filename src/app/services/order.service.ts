import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MAIN_URL_CONSTANTS } from '../constants/apiUrl';
import { httpOptions } from '../constants/httpHeaders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public getAllOrder(): Observable<any> {
    return this.http
      .post<any>(
        `${environment.BASE_URL}${MAIN_URL_CONSTANTS.GET_ALL_ORDER_LIST}`,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  public changeOrderStatus(tempPayload): Observable<any> {
    return this.http
      .post<any>(
        `${environment.BASE_URL}${MAIN_URL_CONSTANTS.CHANGE_ORDER_STATUS}`,
        tempPayload,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  public setOrderLimit(tempPayload): Observable<any> {
    return this.http
      .post<any>(
        `${environment.BASE_URL}${MAIN_URL_CONSTANTS.SET_ORDER_LIMIT}`,
        tempPayload,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  public getOrderLimit(): Observable<any> {
    return this.http
      .post<any>(
        `${environment.BASE_URL}${MAIN_URL_CONSTANTS.GET_ORDER_LIMIT}`,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
