import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { PrismaClient, User } from "@prisma/client";
import { Socket } from "socket.io";

@Injectable()
export class ConversationService {
  prisma = new PrismaClient();
  private readonly users: Map<string, Socket> = new Map();
  create(createConversationDto: CreateConversationDto) {
    return this.prisma.conversation.create({
      data: {
        createdAt: new Date(),
        updatedAt: new Date(),
        dermatologistId: createConversationDto.dermatologistId,
        generalisteId: createConversationDto.generalisteId,
      },
    });
  }

  getConversationsByUser(id: string) {
    return this.prisma.conversation.findMany({
      where: {
        OR: [
          {
            dermatologistId: id,
          },
          {
            generalisteId: id,
          },
        ],
      },
    });
  }

  getConversation(id: string) {
    const conversation = this.prisma.conversation.findUnique({
      where: {
        id: id,
      },
      include: {
        message: true,
      },
    });
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    return conversation;
  }

  saveMessage(conversationId: string, message: string, user: User) {
    return this.prisma.message.create({
      data: {
        content: message,
        date: new Date(),
        conversationId: conversationId,
        userId: user.id,
      },
    });
  }
}
