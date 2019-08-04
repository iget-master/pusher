import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {IgetPusherModule} from '../../projects/iget-pusher/src/lib/iget-pusher.module';
import {ApiKeyService} from './api-key.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IgetPusherConfig} from '../../projects/iget-pusher/src/lib/iget-pusher.config';
import {FormsModule} from '@angular/forms';

function igetPusherConfigFactory(apiKeyService: ApiKeyService): Observable<IgetPusherConfig> {
  return apiKeyService.get().pipe(
    map((API_KEY: string) => {
      return {
        API_KEY,
        config: {}
      };
    })
  );
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IgetPusherModule.forRoot(igetPusherConfigFactory, [ApiKeyService]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
