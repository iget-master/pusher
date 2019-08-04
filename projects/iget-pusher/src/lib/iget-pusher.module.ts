import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {IGET_PUSHER_CONFIG, IgetPusherConfig} from './iget-pusher.config';
import {IgetPusherService} from './iget-pusher.service';
import {Observable, of, ReplaySubject} from 'rxjs';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: []
})

export class IgetPusherModule {
  static forRoot(configFactory: (...args: any[]) => Observable<IgetPusherConfig>, dependencies: any[]): ModuleWithProviders {
    // noinspection UnnecessaryLocalVariableJS
    const module = {
      ngModule: IgetPusherModule,
      providers: [
        IgetPusherService,
        {
          provide: IGET_PUSHER_CONFIG,
          useValue: new ReplaySubject<IgetPusherConfig>(1)
        },
        {
          provide: APP_INITIALIZER,
          useFactory: (subject: ReplaySubject<IgetPusherConfig>, ...deps) => {
            return () => {
              configFactory(...deps).subscribe((config: IgetPusherConfig) => {
                subject.next(config);
              });

              return of(null).toPromise();
            };
          },
          deps: [IGET_PUSHER_CONFIG, ...dependencies],
          multi: true
        }
      ]
    };

    return module;
  }
}
