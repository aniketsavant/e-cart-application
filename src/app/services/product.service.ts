import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LOGIN_CONSTANTS, MAIN_URL_CONSTANTS } from '../constants/apiUrl';
import { httpOptions } from '../constants/httpHeaders';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public addProductCall(requestPayload: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.BASE_URL}${MAIN_URL_CONSTANTS.SAVE_PRODUCT}`,
        requestPayload,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  public editProductCall(requestPayload: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.BASE_URL}${MAIN_URL_CONSTANTS.UPDATE_PRODUCT}`,
        requestPayload,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  public uploadImageCall(requestPayload: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.BASE_URL}${MAIN_URL_CONSTANTS.UPLOAD_IMAGE}`,
        requestPayload
      )
      .pipe(catchError(this.handleError));
  }

  public getAllProductsCall(requestPayload: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.BASE_URL}${MAIN_URL_CONSTANTS.GET_PRODUCT_LIST}`,
        requestPayload
      )
      .pipe(catchError(this.handleError));
  }

  public deleteProduct(requestPayload: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.BASE_URL}${MAIN_URL_CONSTANTS.DELETE_PRODUCT}`,
        requestPayload
      )
      .pipe(catchError(this.handleError));
  }

  public changeProductStatus(requestPayload: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.BASE_URL}${MAIN_URL_CONSTANTS.CHANGE_PRODUCT_STATUS}`,
        requestPayload
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
