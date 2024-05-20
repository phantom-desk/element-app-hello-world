import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Injector, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, isObservable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnChanges {
  @Input('elementId') elementId: string | undefined;
  @Output('onload') onload = new EventEmitter<any>();
  title = 'element-app-hello-world';
  bdpElementApi: any; // TODO should be an ElementAPI Type
  elemInterface = {
    bdpInitialize: (inputApi: any) => { this.initialize(inputApi).catch(console.log); return; },
    bdpElementParams$: undefined,
    bdpNotifyChanges: undefined,
    bdpIncomingMessage: () => { }
  }
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.changeDetectorRef.markForCheck();
    console.log((window as any).ngZone);
  }
  ngOnChanges(changes: SimpleChanges) {
    for (const prop in changes) {
      if (prop === 'elementId') {
        if (changes[prop].isFirstChange()) {
          this.onload.emit(this.elemInterface);
        }
      }
    }
  }
  async initialize(inputApi: any) {
    this.bdpElementApi = inputApi;
    console.log('element-app-hello-world initialized.');
    console.log(inputApi);
    this.changeDetectorRef.markForCheck();
  }
  changeTitle() {
    this.title = this.title === 'element-app-hello-world' ? 'element-app-hello-world-clicked' : 'element-app-hello-world';
    this.changeDetectorRef.markForCheck();
  }
}
