import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class DomainInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let routeUrl;
    if (request.url[0] === '/') {
      routeUrl = request.url.slice(1);
    } else {
      routeUrl = request.url;
    }
    request = request.clone({ url: `${environment.baseUrl}/${routeUrl}` });
    return next.handle(request);
  }
}
