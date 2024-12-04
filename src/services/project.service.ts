import { ProjectRound } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { v4 as uuid } from 'uuid'

import prisma from '@/db'
import type { AddProjectApiPayload } from '@/types/Project'

/**
 * Service class for managing projects in the database.
 *
 * @class
 */
export default class ProjectService {
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
      prisma.projectRoundDetails.create({
        data: {
          id: uniqueId,
          endDate: newProject.roundDetails.endDate,
          startDate: newProject.roundDetails.startDate,
          maximum: newProject.roundDetails.maximum,
          minimum: newProject.roundDetails.minimum,
          acceptedTokens: newProject.roundDetails.acceptedTokens,
          poolFee: newProject.roundDetails.poolFee,
          raiseAmount: newProject.roundDetails.raiseAmount,
          tokenTicker: newProject.roundDetails.tokenTicker,
        },
        select: { id: true },
      }),
      prisma.projectSocials.create({
        data: {
          id: uniqueId,
          x: newProject.projectSocials.x,
          discord: newProject.projectSocials.discord,
          telegram: newProject.projectSocials.telegram,
          medium: newProject.projectSocials.medium,
          website: newProject.projectSocials.website,
        },
        select: { id: true },
      }),
      prisma.currentProjectTokenMetrics.create({
        data: {
          id: uniqueId,
          round: newProject.curProjTokenMetrics.round,
          fdv: newProject.curProjTokenMetrics.fdv,
          price: newProject.curProjTokenMetrics.price,
          tgeUnlock: newProject.curProjTokenMetrics.tgeUnlock,
          tge: newProject.curProjTokenMetrics.tge,
          lockupPeriod: newProject.curProjTokenMetrics.lockupPeriod,
          releaseType: newProject.curProjTokenMetrics.releaseType,
          releaseMonths: newProject.curProjTokenMetrics.releaseMonths,
        },
      }),
    ])

    await prisma.projects.create({
      data: {
        id: uniqueId,
        name: newProject.info.name,
        categories: newProject.info.categories,
        description: newProject.info.description,
        vcId: newProject.info.vcId,
        pastProjectTokenMetrics: {
          createMany: {
            data: newProject.pastProjTokenMetrics,
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
    await prisma.projects.delete({
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

    return allProjectsResp.map(item => ({
      ...item,
      round: item.currentProjectTokenMetrics.round,
    }))
  }

  private readonly getAllProjectsFromDb = async () =>
    await prisma.projects.findMany({
      select: {
        name: true,
        description: true,
        currentProjectTokenMetrics: {
          select: {
            round: true,
          },
        },
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
    const entity = await prisma.projects.findUnique({
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
   * @returns {Promise} A promise that resolves to an object containing
   *                                  the project's details or null if no project
   *                                  is found with the given ID.
   * @throws {Error} Throws an error if there is an issue retrieving the project
   *                 from the database.
   */
  getProjectByIdFromDb = async (id: string) => {
    const project = await prisma.projects.findUnique({
      where: { id },
      select: {
        name: true,
        description: true,
        categories: true,
        currentProjectTokenMetrics: {
          select: {
            tge: true,
            tgeUnlock: true,
            price: true,
            round: true,
            fdv: true,
          },
        },
        projectSocials: {
          select: {
            website: true,
            medium: true,
            telegram: true,
            x: true,
          },
        },
        projectTeamAndAdvisors: {
          select: {
            name: true,
            imgBase64: true,
            title: true,
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

    return project
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
        projectTokenMetrics: projDet.currentProjectTokenMetrics,
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
  private readonly getTotInvestedAmtInProj = async (projectId: string) =>
    await prisma.usersInvestedProjects.aggregate({
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
   *
   * A promise that resolves to an object containing:
   * - name: The name of the project.
   * - round: The round in which the project is (e.g., Seed, Series A).
   * - categories: The categories of the project.
   * - currentProjectTokenMetrics: An object containing current project token metrics (e.g., price).
   * - projectRoundDetails: An object containing round information (e.g., accepted tokens, maximum and minimum amounts).
   * @throws {Error} Throws an error if no project is found with the given ID.
   */
  private readonly getProjDet = async (
    projectId: string
  ): Promise<{
    name: string
    categories: string[]
    currentProjectTokenMetrics: {
      round: ProjectRound
      price: Decimal
    }
    projectRoundDetails: {
      maximum: Decimal
      minimum: Decimal
      acceptedTokens: string
      poolFee: Decimal
    }
  }> =>
    await prisma.projects.findUniqueOrThrow({
      where: {
        id: projectId,
      },
      select: {
        name: true,
        categories: true,
        currentProjectTokenMetrics: {
          select: {
            price: true,
            round: true,
          },
        },
        projectRoundDetails: {
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
