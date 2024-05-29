import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SceltaPersonaggiComponent } from './components/scelta-personaggi/scelta-personaggi.component';
import { SceltaPersonaggiFormComponent } from './components/scelta-personaggi/scelta-personaggi-form/scelta-personaggi-form.component';
import { GameComponentComponent } from './components/game-component/game-component.component';
import { StarterComponent } from './components/game-component/starter/starter.component';
import { FightingComponent } from './components/game-component/fighting/fighting.component';
import { ToastMessagesComponent } from './components/common/toast-messages/toast-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SceltaPersonaggiComponent,
    SceltaPersonaggiFormComponent,
    GameComponentComponent,
    StarterComponent,
    FightingComponent,
    ToastMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
