import { IUser } from './../Models/iuser';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersServService {
  httpOption;
  constructor(private HTTPClient : HttpClient) 
  { 
    this.httpOption = 
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }
  private handleError(error: HttpErrorResponse) {
    // Generic Error handler
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Write error details in Generic error log

    // Return an observable with a user-facing error message.
    return throwError(
      ()=>new Error('Error occured, please try again')
    )
  }


  CheckIfEmailUsed(Email:string ):Observable<IUser[]>
  {
    return this.HTTPClient.get<IUser[]>(`${environment.APIURL}/Users`);    
  }

  AddUser(User:IUser)
  {
    return this.HTTPClient.post
    (`${environment.APIURL}/Users`, JSON.stringify(User) , this.httpOption)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }


}
