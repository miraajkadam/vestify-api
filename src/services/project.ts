import { PrismaClient } from '@prisma/client'

import type { AddProjectApiPayload } from '@/types/ProjectTypes'

export default class ProjectService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  addProjectToDb = async (newProject: AddProjectApiPayload) =>
    await this.prisma.projects.create({
      data: {
        name: newProject.info.name,
        category: newProject.info.category,
        description: newProject.info.description,
        round: newProject.info.round,
        vcId: newProject.info.vcId,
        projectTokenMetrics: {
          create: {
            allocation: newProject.tokenMetrics.allocation,
            fdv: newProject.tokenMetrics.fdv,
            price: newProject.tokenMetrics.price,
            tgeUnlock: newProject.tokenMetrics.tgeUnlock,
            tge: newProject.tokenMetrics.tge,
            vesting: newProject.tokenMetrics.vesting,
          },
        },
        projectDeals: {
          create: {
            maximum: newProject.deals.maximum,
            minimum: newProject.deals.minimum,
            acceptedTokens: newProject.deals.acceptedTokens,
            poolFee: newProject.deals.poolFee,
          },
        },
        projectTeamAndAdvisors: {
          createMany: {
            data: newProject.teamAndAdvisors,
          },
        },
        projectPartnersAndInvestors: {
          createMany: {
            data: newProject.partnersAndInvestors,
          },
        },
        projectSocials: {
          create: {
            x: newProject.projectSocials.x,
            instagram: newProject.projectSocials.instagram,
            discord: newProject.projectSocials.discord,
            telegram: newProject.projectSocials.telegram,
            medium: newProject.projectSocials.medium,
            youtube: newProject.projectSocials.youtube,
          },
        },
      },
      select: {
        id: true,
      },
    })

  deleteProjectFromDb = async (projectId: string) =>
    await this.prisma.projects.delete({
      where: {
        id: projectId,
      },
      select: {
        id: true,
      },
    })

  getAllProjectFromDb = async () =>
    await this.prisma.projects.findMany({
      select: {
        name: true,
        description: true,
        round: true,
      },
    })

  checkProjectExistenceInDb = async (id: string): Promise<boolean> => {
    const entity = await this.prisma.projects.findUnique({
      where: { id },
    })

    return entity !== null
  }
}

// // const newProject: AddProjectApiPayload =
//   // {
//   //   "info": {
//   //     "name": "Bitcoin",
//   //     "category": "Crypto",
//   //     "description": "Bitcoing coincryoto",
//   //     "round": "PRE_SEED",
//   //   },
//   //   "tokenMetrics": {
//   //     "allocation": "KMSAKMDK",
//   //     "fdv": "KMDKSAMK",
//   //     "price": "192873219873",
//   //     "tgeUnlock": "Yes",
//   //     "tge": new Date(),
//   //     "vesting": new Date(),
//   //   },
//   //   "deals": {
//   //     "maximum": new Prisma.Decimal(2000.1),
//   //     "minimum": new Prisma.Decimal(1000),
//   //     "acceptedTokens": "BTC",
//   //     "poolFee": new Prisma.Decimal(100),
//   //   },
//   //   "teamAndAdvisors": [
//   //     {
//   //       "description": "Bitcoing is best",
//   //       "name": "Bitcoin Foundation",
//   //       "title": "Hello 123",
//   //     },
//   //     {
//   //       "description": "Bitcoing is best 2",
//   //       "name": "Bitcoin Foundation 2",
//   //       "title": "Hello 123 2",
//   //     },
//   //   ],
//   //   "partnersAndInvestors": [
//   //     {
//   //       "logo": "Hello Logo",
//   //       "name": "Partner Name",
//   //     },
//   //     {
//   //       "logo": "Hello Logo 2",
//   //       "name": "Partner Name 2",
//   //     },
//   //   ],
//   //   "projectSocials": {
//   //     "x": "sad",
//   //     "instagram": "",
//   //     "discord": "",
//   //     "telegram": "",
//   //     "medium": "",
//   //     "youtube": "",
//   //   },
//   // }
