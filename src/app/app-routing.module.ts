import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SceltaPersonaggiComponent } from './components/scelta-personaggi/scelta-personaggi.component';
import { GameComponentComponent } from './components/game-component/game-component.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'scelta-personaggi', component: SceltaPersonaggiComponent },
  { path: 'game', component: GameComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
