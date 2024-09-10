import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CallInterfaceComponent } from "./modules/call-interface/call-interface.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CallInterfaceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'callem-ai-vitrine';
}
