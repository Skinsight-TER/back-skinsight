import { Inject, Injectable } from '@nestjs/common';
import { PreconsultationDto } from './dto/preconsultation.dto';
import { PrismaClient, Status } from '@prisma/client';
import { GeneralisteService } from 'src/generaliste/generaliste.service';
import { IaService } from 'src/ia/ia.service';

@Injectable()
export class PreconsultationService {
  prisma = new PrismaClient();

  @Inject(GeneralisteService)
  private readonly generalisteService: GeneralisteService;

  @Inject(IaService)
  private readonly iaService: IaService;

  async create(preconsultationDto: PreconsultationDto, patientId: string) {
    //get list of generaliste
    const generalisteList = await this.generalisteService.findAll();
    //si premiere preconsultation
    //prendre tout les generalistes
    //regarder ceux qui on le moins de preconsultation
    //prendre un random parmis les généralistes qui on le moins de preconsultation en attente
    const userPreconsulataion = await this.findAllByUser(patientId);

    let generaliste = generalisteList[0];
    if (userPreconsulataion.length === 0) {
      generalisteList.forEach((element) => {
        if (
          element.preconsultation.length < generaliste.preconsultation.length
        ) {
          generaliste = element;
        }
      });
    } else {
      const lastPreconsultation = userPreconsulataion[0];
      generaliste = generalisteList.find(
        (generaliste) => generaliste.id === lastPreconsultation.generalisteId,
      );
    }
    //dire au patient qu'il obteindras un résultat de ça préconsultation en fonction
    //du nombre de preconsultation en attente du géneraliste en
    //sachant qu'un géneraliste peut traiter max 8 preconsultation par jour
    //ex : si 8 preconsultation en attente alors 1 jour, si 100 preconsultation en attente alors 12 jours
    const generalistePreconsultationWaitingList = generalisteList.map(
      (generaliste) => {
        return generaliste.preconsultation.filter(
          (preconsultation) => preconsultation.status === Status.COMMING,
        );
      },
    );
    const timeToWait = generalistePreconsultationWaitingList.length / 8;

    const preconsultaionCreate = await this.prisma.preconsultation.create({
      data: {
        status: preconsultationDto.status,
        description: preconsultationDto.description,
        patientId: preconsultationDto.patientId,
        generalisteId: generaliste.id,
        infoPatient: preconsultationDto.infoPatient,
      },
    });
    return {
      preconsultaionCreate,
      timeToWait,
    };
  }

  async findAllByUser(id: string) {
    return await this.prisma.preconsultation.findMany({
      where: {
        patientId: id,
      },
    });
  }

  async findAllByGeneraliste(id: string) {
    return await this.prisma.preconsultation.findMany({
      where: {
        generalisteId: id,
      },
    });
  }

  async findOne(id: string) {
    const preconsultation = await this.prisma.preconsultation.findUnique({
      where: {
        id: id,
      },
      include: {
        generaliste: true,
        patient: true,
        Image: true,
      },
    });

    if (preconsultation.infoPatient['messageIA'] === '') {
      return this.prisma.preconsultation.update({
        where: {
          id: preconsultation.id,
        },
        data: {
          infoPatient: {
            messageIA: await this.iaService.sendMessageIA(),
          },
        },
      });
    }
    return preconsultation;
  }

  finishPreconsultation(id: string, nextStep: string) {
    return this.prisma.preconsultation.update({
      where: {
        id: id,
      },
      data: {
        status: Status.DONE,
        infoPatient: {
          nextStep: nextStep['nextStep'],
          messageGeneraliste: nextStep['messageGeneraliste'],
        },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} preconsultation`;
  }
}
