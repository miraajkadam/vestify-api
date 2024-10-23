import { PrismaClient, ProjectRound } from '@prisma/client'

import type { AddProjectApiPayload, ProjectProfileDbResponse } from '@/types/Project'

/**
 * Service class for managing projects in the database.
 *
 * @class
 */
export default class ProjectService {
  private readonly prisma: PrismaClient

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
  addProjectToDb = async (newProject: AddProjectApiPayload): Promise<{ id: string }> => {
    const uniqueId = uuid()

    await Promise.all([
      this.prisma.projectDeals.create({
        data: {
          id: uniqueId,
          endDate: newProject.deals.endDate,
          startDate: newProject.deals.startDate,
          maximum: newProject.deals.maximum,
          minimum: newProject.deals.minimum,
          acceptedTokens: newProject.deals.acceptedTokens,
          poolFee: newProject.deals.poolFee,
        },
        select: { id: true },
      }),
      this.prisma.projectSocials.create({
        data: {
          id: uniqueId,
          x: newProject.projectSocials.x,
          instagram: newProject.projectSocials.instagram,
          discord: newProject.projectSocials.discord,
          telegram: newProject.projectSocials.telegram,
          medium: newProject.projectSocials.medium,
          youtube: newProject.projectSocials.youtube,
        },
        select: { id: true },
      }),
    ])

    await this.prisma.projects.create({
      data: {
id: uniqueId,
        name: newProject.info.name,
        categories: newProject.info.categories,
        description: newProject.info.description,
        vcId: newProject.info.vcId,
        projectTokenMetrics: {
          createMany: {
            data: newProject.tokenMetrics,
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
              },
      select: { id: true },
    })

    return { id: uniqueId }
  }

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
  > => {
    const allProjectsResp = await this.getAllProjectsFromDb()

    return this.strAllProjectsResp(allProjectsResp)
  }

  private strAllProjectsResp = (
    projects: {
      name: string
      description: string
      projectTokenMetrics: {
        round: ProjectRound
      }[]
    }[]
  ) =>
    projects.map(({ projectTokenMetrics, ...rest }) => ({
      ...rest,
      round: projectTokenMetrics[0].round,
    }))

  private getAllProjectsFromDb = async () => {
    return await this.prisma.projects.findMany({
      select: {
        name: true,
        description: true,
        projectTokenMetrics: {
          take: 1,
          select: {
            round: true,
          },
        },
      },
    })
  }

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
  getProjectByIdFromDb = async (id: string): Promise<ProjectProfileDbResponse> => {
    const project = await this.prisma.projects.findUnique({
      where: { id },
      select: {
        name: true,
        description: true,
        categories: true,
        projectTokenMetrics: {
          select: {
            tge: true,
            tgeUnlock: true,
            price: true,
            round: true,
            tgeSummary: true,
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

    const { ...rest } = project

    return {
      ...rest,
      projectTokenMetrics: rest.projectTokenMetrics[0],
    }
  }

  /**
   * Retrieves statistics for a specific project.
   *
   * This method fetches the project's detailed information and the total amount invested
   * in the project. It returns an object containing both project details and total investment
   * amount.
   *
   * @async
   * @param {string} projectId - The unique identifier of the project for which to retrieve statistics.
   * @returns {Promise<{ projDet: object, totInvestedAmt: number }>} A promise that resolves to an object containing:
   * - projDet: The detailed information about the project (name, round, category, token metrics, etc.).
   * - totInvestedAmt: The total amount invested in the project, defaulting to 0 if no investments exist.
   * @throws {Error} Throws an error if there is an issue retrieving the project statistics from the database.
   */
  getProjectStats = async (projectId: string) => {
    const [projDet, totInvestedAmt] = await Promise.all([
      this.getProjDet(projectId),
      this.getTotInvestedAmtInProj(projectId),
    ])

    const response = {
      projDet: {
        ...projDet,
        projectTokenMetrics: projDet.projectTokenMetrics[0],
      },
      totInvestedAmt: totInvestedAmt._sum.amount || 0,
    }

    return response
  }

  /**
   * Calculates the total amount invested in a specific project.
   *
   * This method aggregates the total investment amounts from users for the given project ID.
   *
   * @async
   * @param {string} projectId - The unique identifier of the project for which to calculate total investments.
   * @returns {Promise<{ _sum: { amount: number | null } }>} A promise that resolves to an object containing:
   * - _sum: An object with the total invested amount for the project. This will be null if no investments exist.
   * @throws {Error} Throws an error if there is an issue retrieving the total investment amount from the database.
   */
  private getTotInvestedAmtInProj = async (projectId: string) =>
    await this.prisma.usersInvestedProjects.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        projectId,
      },
    })

  /**
   * Retrieves detailed information about a project by its unique identifier.
   *
   * This method fetches project details, including the name, round, category, token metrics,
   * and other relevant information based on the provided project ID.
   *
   * @async
   * @param {string} projectId - The unique identifier of the project to retrieve.
   * @returns {Promise<{ name: string, round: ProjectRound, category: string, projectTokenMetrics: object, projectDeals: object }>}
   * A promise that resolves to an object containing:
   * - name: The name of the project.
   * - round: The round in which the project is (e.g., Seed, Series A).
   * - categories: The categories of the project.
   * - projectTokenMetrics: An object containing token metrics (e.g., price).
   * - projectDeals: An object containing deal information (e.g., accepted tokens, maximum and minimum amounts).
   * @throws {Error} Throws an error if no project is found with the given ID.
   */
  private getProjDet = async (projectId: string) =>
    await this.prisma.projects.findUniqueOrThrow({
      where: {
        id: projectId,
      },
      select: {
        name: true,
        categories: true,
        projectTokenMetrics: {
          select: {
            price: true,
            round: true,
          },
          take: 1,
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
