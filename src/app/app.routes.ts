import { Routes } from '@angular/router';
import { CallInterfaceComponent } from './modules/call-interface/call-interface.component';

export const routes: Routes = [
    { path: 'call/:name/:phone', component : CallInterfaceComponent},


];
