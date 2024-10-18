import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var SIPml: any;
@Component({
  selector: 'app-call-interface',
  standalone: true,
  imports: [],
  templateUrl: './call-interface.component.html',
  styleUrl: './call-interface.component.scss'
})
export class CallInterfaceComponent implements AfterViewInit {
  private stack: any;
  private callSession: any;
  private micEnabled = false;
//isCalling = false;
  ngAfterViewInit(): void {
    (window as any).startCall = this.startCall.bind(this);
    (window as any).hangUp = this.hangUp.bind(this);
    (window as any).toggleMic = this.toggleMic.bind(this);

    // Initialize SIPml
    (window as any).SIPml.init(
      () => this.initializeSIP(),
      (e: any) => console.error('Failed to initialize SIPml:', e)
    );
  }

  initializeSIP() {
    this.stack = new (window as any).SIPml.Stack({
      realm: 'webrtc-beta.callem.ai',
      impi: '101',
      impu: 'sip:101@webrtc-beta.callem.ai',
      password: '101',
      websocket_proxy_url: 'wss://webrtc-beta.callem.ai:8089/ws',
      ice_servers: [{ urls: 'stun:stun.l.google.com:19302' }],
      enable_rtcweb_breaker: false,
      enable_early_ims: false,
      enable_media_stream_cache: true,
      events_listener: {
        events: '*',
        listener: (e: any) => {
          console.log('SIP event:', e);
        }
      }
    });

    // Start the SIP stack
    this.stack.start(
      () => {
        console.log('SIP stack started');
      },
      (e: any) => {
        console.error('Failed to start SIP stack:', e);
      }
    );
  }

  startCall() {
   // this.isCalling = true;
    this.micEnabled = true;

    // if (this.stack && this.stack.started) {
      this.callSession = this.stack.newSession('call-audio', {
        audio_remote: document.getElementById('audio-remote')
      });
      this.callSession.call('sip:5100@webrtc-beta.callem.ai');
    // } else {
      console.error('SIP stack is not initialized or not started.');
    // }
  }

  hangUp() {
   // this.isCalling = false;
    this.micEnabled = false;
    document.getElementById('callButton')!.style.display = 'block';
    document.getElementById('callActions')!.style.display = 'none';
    if (this.callSession) {
      this.callSession.hangup();
    }
  }

  toggleMic() {
   // this.micEnabled = !this.micEnabled;
    const micIcon = document.getElementById('micIcon');
    if (micIcon) {
      micIcon.innerHTML = this.micEnabled ? '<i class="bi bi-mic"></i>' : '<i class="bi bi-mic-mute"></i>';
    }
    // Add logic to enable/disable the mic here if necessary
  
  }

  
}
