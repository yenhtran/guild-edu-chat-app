import { Component, OnDestroy, OnInit } from '@angular/core';
// import * as io from 'socket.io-client';
// import { environment } from 'src/environments/environment';
import { SocketService } from 'src/app/socket.service';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css'],
  providers: [SocketService]
})

export class ChatInboxComponent implements OnInit, OnDestroy {
  message: string = '';
  messageList: { message: string, mine: boolean }[] = [];

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.setUpSocketConnection();
    this.socketService.messageRecieved$.subscribe((message) => {
      this.messageList.push({ message , mine: false  })
    })
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  sendMessage(): void {
    this.socketService.sendMessage(this.message);
    this.messageList.push({ message: this.message, mine: true });
    this.message = '';
  }

}
