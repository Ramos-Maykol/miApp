import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({ projectId: "ionic-5e347", appId: "1:266773388675:web:5df453150a715fe2e92ab6", storageBucket: "ionic-5e347.firebasestorage.app", apiKey: "AIzaSyBOZOtrO0pxo2RyndbUYdJbHcZz_92TrgI", authDomain: "ionic-5e347.firebaseapp.com", messagingSenderId: "266773388675", measurementId: "G-0BR2RSRKRL" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
});
