import { Inject, Injectable } from '@nestjs/common';
import { CreatePreconsultationDto } from './dto/create-preconsultation.dto';
import { UpdatePreconsultationDto } from './dto/update-preconsultation.dto';
import { PrismaClient, Status } from '@prisma/client';
import { GeneralisteService } from 'src/generaliste/generaliste.service';

@Injectable()
export class PreconsultationService {
  prisma = new PrismaClient();

  @Inject(GeneralisteService)
  private readonly generalisteService: GeneralisteService;

  async create(createPreconsultationDto: CreatePreconsultationDto) {
    //get list of generaliste
    const generalisteList = await this.generalisteService.findAll();
    //si premiere preconsultation
    //prendre tout les generalistes
    //regarder ceux qui on le moins de preconsultation
    //prendre un random parmis les généralistes qui on le moins de preconsultation en attente
    const userPreconsulataion = await this.findAllByUser(
      '46a86d69-67bd-4b66-81e4-b2cb9e665cee',
    );

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
        status: createPreconsultationDto.status,
        description: createPreconsultationDto.description,
        patientId: createPreconsultationDto.patientId,
        generalisteId: generaliste.id,
        infoPatient: createPreconsultationDto.infoPatient,
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

  update(id: number, updatePreconsultationDto: UpdatePreconsultationDto) {
    return `This action updates a #${id} preconsultation`;
  }

  remove(id: number) {
    return `This action removes a #${id} preconsultation`;
  }
}
