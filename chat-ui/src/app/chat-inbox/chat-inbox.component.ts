import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from 'src/app/socket.service';

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

  /**
   * Sends message via socketService and adds the message to the messageList and finally clears the message
   */
  sendMessage(): void {
    this.socketService.sendMessage(this.message);
    this.messageList.push({ message: this.message, mine: true });
    this.message = '';
  }

}
