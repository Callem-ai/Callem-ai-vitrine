import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var SIPml: any;
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
  private sipStack: any;
  private session: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('SIPml:', (window as any).SIPml); // Check if SIPml is available  
    this.route.paramMap.subscribe(params => {
      this.agentName = params.get('name');
      this.phoneNumber = params.get('phone');
    });
   this.startSIPStack();
  }
  startSIPStack() {
    this.sipStack = new SIPml.Stack({
      realm: 'asterisk.com', // replace with your domain
      impi: '101', // replace with your SIP username
      impu: 'sip:101@webrtc-beta.callem.ai:8089', // replace with your SIP URI
      password: '101', // replace with your SIP password
      websocket_proxy_url: 'wss://webrtc-beta.callem.ai:8089/ws', // replace with your WebSocket server
      ice_servers: [{
        urls: "stun:stun.l.google.com:19302" // Google's public STUN server
      }],
      enable_rtcweb_breaker: false,
      events_listener: {
        events: '*',
        listener: (e: any) => {
          console.log('SIP event:', e);
        }
      },
      enable_early_ims: true,
      enable_media_stream_cache: false
    });

    this.sipStack.start();
  }
  async startCall() {
    try {
      await this.requestMicPermission();
      this.isCalling = true;
      this.micEnabled = true;

      // Logic for starting the call can be added here
      this.session = this.sipStack.newSession('call-audio', {
        audio_remote: document.createElement('audio'),
        events_listener: {
          events: '*',
          listener: (e: any) => {
            console.log('Call event:', e);
          }
        }
      });
      this.session.call('sip:5000@51.91.105.161'); // replace with the destination SIP URI
  
    } catch (error) {
      console.error('Microphone permission denied', error);
    }

  }

  hangUp() {
    this.isCalling = false;
    this.micEnabled = false;
    // Logic for hanging up the call can be added here
    if (this.session) {
      this.session.hangup();
    }
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
