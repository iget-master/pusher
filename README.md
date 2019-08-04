# @iget/pusher

## Using

Since Pusher library often require changing config on the fly, the `IgetPusherModule`
should be imported `forRoot()`, and will receive two arguments:
1. `configFactory`: a function that should return an `Observable<IgetPusherConfig>`
2. `dependencies`: a list of dependencies that will be injected as arguments to your config factory

This allow changing some settings on the fly:
* API key (see our demo code)
* Pusher authentication configuration

### Samples

#### Configuration with asynchronous API_KEY

You application might have a service that asynchronously give us the Pusher `API_KEY` through a `get` method that
return an Observable. 

Since our factory function can inject this service using the `dependencies` argument, we can inject that server and use it to factory our `IgetPusherConfig` object.

```
import { IgetPusherModule } from '@iget/pusher'

@NgModule({
  // ...
  imports: [
    IgetPusherModule.forRoot((apiKeyService: ApiKeyService) => {
      return apiKeyService.get().pipe(
        map((API_KEY: string) => {
          return {
            API_KEY,
            config: {}
          };
        })
      }, [ApiKeyService])
  ],
  // ...
}) 
```

#### Static configuration

On some situations, you just don't need such complex logic on your pusher config,
se we can use the [`of()` rxjs operator](https://www.learnrxjs.io/operators/creation/of.html)
to return a static `IgetPusherConfig` object:

```
import { IgetPusherModule } from '@iget/pusher'

@NgModule({
  // ...
  imports: [
    IgetPusherModule.forRoot(() => {
      of({
        API_KEY: 'YOUR_PUSHER_KEY',
        config: {}
      })
  ],
  // ...
}) 
```

#### Subscribing to channels and events

```
interface FooEvent {
  foo: string,
}

interface BarEvent {
  bar: string;
}

class AppComponent implements OnInit {
  constructor(private pusher: IgetPusherService) {
  }

  ngOnInit(): void {
    const channel = pusher.subscribe('my-channel');
    
    // Bind to a single event
    const bind = channel.bind<FooEvent>('foo-event')
    bind.subscribe((event: FooEvent) => {
      console.log('FooEvent received', event);
    });

    // Bind to all events
    const globalBind = channel.bindGlobal<FooEvent|BarEvent|any>();
    globalBind.subscribe((event: FooEvent|BarEvent|any) => {
      console.log('Global event', event);
    }

    // Unbinding events - You should unbind to events when you don't
    // need it anymore, avoiding unecessary data usage
    bind.unsubscribe();
    globalBind.unsubscribe();
  }
}
```
