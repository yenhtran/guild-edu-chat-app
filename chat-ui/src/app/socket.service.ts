import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;
  private messageRecievedSource = new Subject<string>();
  messageRecieved$ = this.messageRecievedSource.asObservable();

  /**
   * Sets up the socket connection
   */
  setUpSocketConnection(): void {
    this.socket = io.io(environment.SOCKET_ENDPOINT);
    this.socket.emit('my message', 'Hello there from Angular');
    this.setupListener();
  }

  /**
   * Listens to messages recieved from socket connection
   */
  setupListener(): void {
    this.socket.on('message-broadcast', (data: { message: string }) => {
      this.messageRecievedSource.next(data.message);
    })
  }

  /**
   * Disconnects the socket connection
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  /**
   * Sends the message through the socket connection
   * @param message
   */
  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }
}
