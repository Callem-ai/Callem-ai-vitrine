import { Routes } from '@angular/router';
import { CallInterfaceComponent } from './modules/call-interface/call-interface.component';

export const routes: Routes = [
    { path: '', redirectTo: 'call/Lisa/5100', pathMatch: 'full' }, 
    { path: 'call/:name/:phone', component : CallInterfaceComponent},


];
