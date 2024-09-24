import { PrismaClient, ProjectRound } from '@prisma/client'

import type { AddProjectApiPayload, ProjectProfileDbResponse } from '@/types/Project'

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

  /**
   * Retrieves a project from the database by its unique identifier.
   *
   * This function fetches detailed information about a project, including its
   * name, description, round, category, token metrics, social media links,
   * team members, and partners/investors.
   *
   * @async
   * @function getProjectByIdFromDb
   * @param {string} id - The unique identifier of the project to retrieve.
   * @returns {Promise<ProjectProfileDbResponse|null>} A promise that resolves to an object containing
   *                                  the project's details or null if no project
   *                                  is found with the given ID.
   * @throws {Error} Throws an error if there is an issue retrieving the project
   *                 from the database.
   */
  getProjectByIdFromDb = async (id: string): Promise<ProjectProfileDbResponse | null> =>
    await this.prisma.projects.findUnique({
      where: { id },
      select: {
        name: true,
        description: true,
        round: true,
        category: true,
        projectTokenMetrics: {
          select: {
            allocation: true,
            vesting: true,
            tge: true,
            tgeUnlock: true,
            price: true,
          },
        },
        projectSocials: {
          select: {
            discord: true,
            medium: true,
            telegram: true,
            x: true,
          },
        },
        projectTeamAndAdvisors: {
          select: {
            name: true,
            imgBase64: true,
          },
        },
        projectPartnersAndInvestors: {
          select: {
            name: true,
            logoBase64: true,
          },
        },
      },
    })

  getProjectStats = async (projectId: string) => {
    const [projDet, totInvestedAmt] = await Promise.all([
      this.getProjDet(projectId),
      this.getTotInvestedAmtInProj(projectId),
    ])

    return {
      projDet,
      totInvestedAmt: totInvestedAmt._sum.amount || 0,
    }
  }

  private getTotInvestedAmtInProj = async (projectId: string) =>
    await this.prisma.usersInvestedProjects.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        projectId,
      },
    })

  private getProjDet = async (projectId: string) =>
    await this.prisma.projects.findUniqueOrThrow({
      where: {
        id: projectId,
      },
      select: {
        name: true,
        round: true,
        category: true,
        projectTokenMetrics: {
          select: {
            price: true,
          },
        },
        projectDeals: {
          select: {
            acceptedTokens: true,
            maximum: true,
            minimum: true,
            poolFee: true,
          },
        },
      },
    })
}
