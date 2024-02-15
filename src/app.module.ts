import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientModule } from './patient/patient.module';
import { PreconsultationModule } from './preconsultation/preconsultation.module';
import { GeneralisteModule } from './generaliste/generaliste.module';
import { IaModule } from './ia/ia.module';
@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    PatientModule,
    PreconsultationModule,
    GeneralisteModule,
    IaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
