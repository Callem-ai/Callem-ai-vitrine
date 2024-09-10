import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-call-interface',
  standalone: true,
  imports: [],
  templateUrl: './call-interface.component.html',
  styleUrl: './call-interface.component.scss'
})
export class CallInterfaceComponent implements OnInit {
  isCalling = false;
  micEnabled = false;
  agentName: string | null = null;
  phoneNumber: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.agentName = params.get('name');
      this.phoneNumber = params.get('phone');
    });
  }
  async startCall() {
    try {
      await this.requestMicPermission();
      this.isCalling = true;
      this.micEnabled = true;
      // Logic for starting the call can be added here
    } catch (error) {
      console.error('Microphone permission denied', error);
    }
  }

  hangUp() {
    this.isCalling = false;
    this.micEnabled = false;
    // Logic for hanging up the call can be added here
  }

  toggleMic() {
    this.micEnabled = !this.micEnabled;
    // Logic for enabling/disabling the mic can be added here
  }

  async requestMicPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the mic after permission is granted
    } catch (err) {
      throw new Error('Microphone permission denied');
    }
  }
}
