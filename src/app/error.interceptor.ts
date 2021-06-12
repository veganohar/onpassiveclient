import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OnpassiveService } from './onpassive.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private ops:OnpassiveService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.ops.emitErrorInterceptor(true);
            }
            const error = err.error.message;
            return throwError(error);
        }))
    }
}