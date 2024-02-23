import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { User } from '@prisma/client';

@WebSocketGateway()
export class ConversationGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  onModuleInit() {
    console.log('ChatGateway is initialized');
  }

  @SubscribeMessage('events')
  handleConnection(socket: Socket) {
    console.log(`socket Connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`socket Disconnected: ${socket.id}`);
  }

  handleError(error: Error) {
    console.log(`socket Error: ${error}`);
  }

  @SubscribeMessage('joinConversation')
  handleJoinConversation(socket: Socket, conversationId: string) {
    socket.join(conversationId);
    socket.to(conversationId).emit('userJoined', socket.id);
    return { event: 'userJoined', room: conversationId };
  }

  @SubscribeMessage('leaveConversation')
  handleLeaveConversation(socket: Socket, conversationId: string) {
    socket.leave(conversationId);
    socket.to(conversationId).emit('userLeaved', socket.id);
    return { event: 'userLeaved', room: conversationId };
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    socket: Socket,
    payload: { room: string; message: string; user: User },
  ) {
    this.server.to(payload.room).emit('newMessage', payload.message);
    //this.chatservice.saveMessage(payload.room, payload.message, payload.user);
  }
}
