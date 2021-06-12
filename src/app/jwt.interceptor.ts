import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CookiesService } from './cookie.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private cs: CookiesService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiUrl = request.url.startsWith(environment.baseUrl);
        if (this.cs.checkCookie("accessToken") && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    "x-access-token": `${this.cs.getCookie("accessToken")}`
                }
            });
        }
        return next.handle(request);
    }
}