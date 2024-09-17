import { PrismaClient, ProjectRound } from '@prisma/client'

import type { AddProjectApiPayload } from '@/types/ProjectTypes'

/**
 * Service class for managing projects in the database.
 *
 * @class
 */
export default class ProjectService {
  private prisma: PrismaClient

  /**
   * Constructs a new ProjectService instance.
   * Initializes a PrismaClient instance for database interactions.
   *
   * @constructor
   */
  constructor() {
    this.prisma = new PrismaClient()
  }

  /**
   * Adds a new project to the database.
   *
   * @async
   * @param {AddProjectApiPayload} newProject - The payload containing project details to be added.
   * @returns {Promise<{id: string}>} - A promise that resolves to an object containing the ID of the newly created project.
   */
  addProjectToDb = async (newProject: AddProjectApiPayload): Promise<{ id: string }> =>
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

  /**
   * Deletes a project from the database by its ID.
   *
   * @async
   * @param {string} projectId - The ID of the project to be deleted.
   * @returns {Promise<{id: string}>} - A promise that resolves to an object containing the ID of the deleted project.
   */
  deleteProjectFromDb = async (projectId: string): Promise<{ id: string }> =>
    await this.prisma.projects.delete({
      where: {
        id: projectId,
      },
      select: {
        id: true,
      },
    })

  /**
   * Retrieves all projects from the database.
   *
   * @async
   * @returns {Promise<Array<{name: string, description: string, round: ProjectRound}>>} - A promise that resolves to an array of project objects containing name, description, and round.
   */
  getAllProjectFromDb = async (): Promise<
    Array<{ name: string; description: string; round: ProjectRound }>
  > =>
    await this.prisma.projects.findMany({
      select: {
        name: true,
        description: true,
        round: true,
      },
    })

  /**
   * Checks if a project exists in the database by its ID.
   *
   * @async
   * @param {string} id - The ID of the project to check for existence.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the project exists, otherwise `false`.
   */
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
