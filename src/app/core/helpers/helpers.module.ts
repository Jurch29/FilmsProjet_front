import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './fake-backend';

import { JwtInterceptor } from './jwt.interceptor';
import { ErrorInterceptor } from './error.interceptor';

@NgModule({
    imports: [

    ],
    declarations: [

    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // Fourni le fake backend
        // Simplement commenter la ligne pour brancher sur un véritable backend
        // fakeBackendProvider
    ]
})
export class HelpersModule { }
