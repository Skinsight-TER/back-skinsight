import { Module } from '@nestjs/common';
import { GeneralisteService } from './generaliste.service';
import { GeneralisteController } from './generaliste.controller';
import { ConversationGateway } from '../conversation/conversation.gateway';

@Module({
  controllers: [GeneralisteController],
  providers: [GeneralisteService, ConversationGateway],
  exports: [GeneralisteService],
})
export class GeneralisteModule {}
