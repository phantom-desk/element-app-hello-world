
// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

import { createApplication } from "@angular/platform-browser";
import { appConfig } from './app/app.config';
import {createCustomElement} from '@angular/elements';
import { AppComponent } from './app/app.component';

(async () => {
  const app = await createApplication(appConfig);
  const elem = createCustomElement(AppComponent, {injector: app.injector});
  if (!customElements.get('element-app-hello-world')) {
    customElements.define('element-app-hello-world', elem);
  }
})().catch(err => console.log(err));