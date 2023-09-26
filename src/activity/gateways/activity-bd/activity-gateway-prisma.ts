import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { ActivityGatewayInterface } from "./activity-gateway-interface";


@Injectable()
export class ActivityGatewayPrisma implements ActivityGatewayInterface{

    constructor(
        private prisma: PrismaService
    ){}
}