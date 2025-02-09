import { DistributionPool, ProjectRound, Release, VestingBatch } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

import prisma from '@/db'
import type {
  AddDistributionPoolPayload,
  AddProjectApiPayload,
  AddVestingSchedule,
} from '@/types/Project'

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
  addProjectToDb = async (newProject: AddProjectApiPayload): Promise<void> => {
    const id = newProject.onChain.projectId

    await Promise.all([
      prisma.projectRoundDetails.create({
        data: {
          id,
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
          id,
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
          id,
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
      prisma.projectWallet.create({
        data: {
          id,
          chain: newProject.projectWallet.chain,
          walletAddress: newProject.projectWallet.walletAddress,
        },
      }),
    ])

    await prisma.projects.create({
      data: {
        id,
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

    return allProjectsResp.map(({ currentProjectTokenMetrics, ...items }) => ({
      ...items,
      round: currentProjectTokenMetrics.round,
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

  // #region distribution pools
  /**
   * Adds a new distribution pool to the database.
   *
   * This function creates a new record in the `distributionPool` table with the provided details,
   * and returns the `id` of the newly created distribution pool.
   *
   * @param {string} pid - The ID of the Project associated with the distribution pool.
   * @param {string} name - The name of the distribution pool.
   * @param {string[]} addresses - An array of addresses associated with the distribution pool.
   * @param {number} fee - The fee for the distribution pool (a non-negative number).
   * @param {number} maxAllocation - The maximum allocation allowed for the pool (a positive number).
   * @param {number} minAllocation - The minimum allocation allowed for the pool (a positive number).
   *
   * @returns {Promise<string>} - A promise that resolves to the `id` of the newly created distribution pool.
   */
  addDistributionPoolInDb = async (
    pid: AddDistributionPoolPayload['projectId'],
    name: AddDistributionPoolPayload['name'],
    addresses: AddDistributionPoolPayload['addresses'],
    fee: AddDistributionPoolPayload['fee'],
    maxAllocation: AddDistributionPoolPayload['maxAllocation'],
    minAllocation: AddDistributionPoolPayload['minAllocation']
  ): Promise<string> => {
    const { id } = await prisma.distributionPool.create({
      data: {
        projectsId: pid,
        name,
        addresses,
        fee,
        maxAllocation,
        minAllocation,
      },
      select: {
        id: true,
      },
    })

    return id
  }

  editDistributionPoolInDb = async (
    name: AddDistributionPoolPayload['name'],
    addresses: AddDistributionPoolPayload['addresses'],
    fee: AddDistributionPoolPayload['fee'],
    maxAllocation: AddDistributionPoolPayload['maxAllocation'],
    minAllocation: AddDistributionPoolPayload['minAllocation'],
    distPoolId: DistributionPool['id']
  ) => {
    const { id } = await prisma.distributionPool.update({
      where: {
        id: distPoolId,
      },
      data: {
        name,
        addresses,
        fee,
        maxAllocation,
        minAllocation,
      },
      select: {
        id: true,
      },
    })

    return id
  }

  /**
   * Fetches the distribution pools for a given project from the database.
   *
   * This function queries the database for all distribution pools associated with the given project ID.
   * It returns a list of distribution pools with the pool's `addresses`, `name`, and `id`.
   *
   * @async
   * @function getDistributionPoolsFromDb
   * @param {string} pid - The unique identifier for the project.
   * @returns {Promise<DistributionPool[]>} - A promise that resolves to an array of distribution pool objects. Each object contains:
   *   - `id`: The unique identifier of the distribution pool.
   *   - `name`: The name of the distribution pool.
   *   - `addresses`: An array of addresses associated with the pool.
   *
   * @example
   * const projectId = 'c87b0321-f22e-4bc6-929d-3a42fec2e227';
   * const pools = await getDistributionPoolsFromDb(projectId);
   * console.log(pools);
   */
  getDistributionPoolsFromDb = async (pid: string) =>
    await prisma.distributionPool.findMany({
      where: {
        projectsId: pid,
      },
      select: {
        addresses: true,
        name: true,
        id: true,
      },
    })

  deleteDistributionPoolFromDb = async (distPoolId: string) =>
    await prisma.distributionPool.delete({
      where: {
        id: distPoolId,
      },
    })

  deleteAllDistributionPoolFromDb = async (projectId: string) =>
    await prisma.distributionPool.deleteMany({
      where: {
        projectsId: projectId,
      },
    })
  // #endregion

  checkDistPoolExistenceInDb = async (id: string): Promise<boolean> => {
    const entity = await prisma.distributionPool.findUnique({
      where: { id },
    })

    return entity !== null
  }

  /**
   * Retrieves the main investors' wallet addresses for a given project.
   *
   * This function queries the database for users who have invested in the specified project and
   * extracts their wallet addresses from the associated user data. It returns a list of wallet addresses
   * for all the main investors in the project.
   *
   * @async
   * @function getProjectInvestors
   * @param {string} pid - The unique identifier for the project.
   * @returns {Promise<UsersInvestedProjects[]>} - A promise that resolves to an array of users' wallet addresses:
   *   Each user has an array of `wallets` containing their respective wallet addresses.
   *
   * @example
   * const projectId = 'c87b0321-f22e-4bc6-929d-3a42fec2e227';
   * const investors = await getProjectInvestors(projectId);
   * console.log(investors);
   */
  getProjectInvestors = async (pid: string) =>
    await prisma.usersInvestedProjects.findMany({
      where: {
        projectId: pid,
      },
      select: {
        user: {
          select: {
            account: {
              select: {
                wallets: {
                  select: {
                    address: true,
                  },
                },
              },
            },
          },
        },
      },
    })

  getDistributionPoolFromDb = async (distPoolId: string) => {
    const distPool = await prisma.distributionPool.findUnique({
      where: {
        id: distPoolId,
      },
      select: {
        addresses: true,
        projectsId: true,
        fee: true,
        maxAllocation: true,
        minAllocation: true,
        name: true,
      },
    })

    return distPool
  }

  // #region vesting schedule
  createVestingSchedulesInDb = async (
    batches: {
      name: VestingBatch['name']
      date: VestingBatch['date']
      percentage: number
    }[],
    releaseType: Release,
    pId: string
  ) =>
    await prisma.vestingSchedule.create({
      data: {
        releaseInterval: releaseType,
        VestingBatch: {
          createMany: {
            data: batches,
          },
        },
        Projects: {
          connect: {
            id: pId,
          },
        },
      },
    })

  /**
   * Checks if a vesting schedule already exists for a given project.
   *
   * This function queries the database to see if a vesting schedule has been created
   * for the specified project. It returns a boolean indicating whether a vesting schedule
   * already exists for the project.
   *
   * @async
   * @param {string} projectId - The unique identifier of the project to check for an existing vesting schedule.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if a vesting schedule exists for the project,
   *                                otherwise `false`.
   * @throws {Error} Throws an error if there is an issue checking the vesting schedule existence in the database.
   *
   * @example
   * const exists = await checkExistingVestingScheduleInDb('0xf9492e17a');
   * console.log(exists); // true or false
   */
  checkExistingVestingScheduleInDb = async (projectId: string): Promise<boolean> => {
    const isExisting = await prisma.vestingSchedule.findUnique({
      where: {
        projectsId: projectId,
      },
    })

    return isExisting !== null
  }

  /**
   * Deletes a vesting schedule from the database for a specific project.
   *
   * This function removes the vesting schedule associated with the provided project ID.
   * All vesting batches and related data will be deleted as well.
   *
   * @async
   * @param {string} projectId - The unique identifier of the project for which the vesting schedule should be deleted.
   * @returns {Promise<void>} - A promise that resolves once the vesting schedule has been successfully deleted.
   * @throws {Error} Throws an error if there is an issue deleting the vesting schedule from the database.
   *
   * @example
   * await deleteVestingScheduleFromDb('0xf9492e17a');
   */
  deleteVestingScheduleFromDb = async (projectId: string): Promise<void> => {
    await prisma.vestingSchedule.delete({
      where: {
        projectsId: projectId,
      },
    })
  }

  /**
   * Retrieves the vesting schedule for a given project from the database.
   * This function fetches the batch interval and vesting batch details (name, date, percentage)
   * for a specific project, and returns the vesting batch details with the field name renamed
   * from 'VestingBatch' to 'vestingBatch'.
   *
   * @async
   * @param {string} projectId - The unique identifier of the project whose vesting schedule is to be fetched.
   * @returns {Promise<{ batchInterval: string, vestingBatches: { name: string, date: Date, percentage: Decimal }[] }>}
   *          A promise that resolves to an object containing:
   *          - `batchInterval`: The interval between vesting batches (e.g., "MONTHLY").
   *          - `vestingBatch`: An array of vesting batches, each containing:
   *            - `name`: The name of the vesting batch.
   *            - `date`: The date of the vesting batch.
   *            - `percentage`: The percentage of the total allocation for the batch.
   * @throws {Error} Throws an error if the vesting schedule for the given project ID is not found.
   */
  getVestingScheduleFromDB = async (
    projectId: string
  ): Promise<{
    releaseInterval: Release
    vestingBatches: { name: string; date: Date; percentage: Decimal }[]
  } | null> => {
    const vestingSchedule = await prisma.vestingSchedule.findUnique({
      where: {
        projectsId: projectId,
      },
      select: {
        releaseInterval: true,
        VestingBatch: {
          select: {
            name: true,
            date: true,
            percentage: true,
          },
        },
      },
    })

    if (!vestingSchedule) return null

    // Rename the 'VestingBatch' field to 'vestingBatch'
    return {
      releaseInterval: vestingSchedule.releaseInterval,
      vestingBatches: vestingSchedule.VestingBatch,
    }
  }

  /**
   * Edits the vesting schedule for a given project by deleting the existing schedule and
   * creating a new one with updated details. This method updates the batch interval and
   * the associated vesting batches (name, date, and percentage) for the specified project.
   *
   * @async
   * @param {string} projectId - The unique identifier of the project whose vesting schedule is to be updated.
   * @param {AddVestingSchedule} schedule - The new vesting schedule details, including:
   *          - `batchInterval`: The interval between vesting batches (e.g., "MONTHLY").
   *          - `vestingBatches`: An array of vesting batch objects containing:
   *            - `name`: The name of the vesting batch.
   *            - `date`: The date of the vesting batch.
   *            - `percentage`: The percentage of the total allocation for the batch.
   * @returns {Promise<void>} A promise that resolves when the vesting schedule has been successfully updated.
   * @throws {Error} Throws an error if there is an issue deleting or creating the vesting schedule in the database.
   */
  editVestingScheduleInDb = async (
    projectId: string,
    schedule: AddVestingSchedule
  ): Promise<void> => {
    await prisma.vestingSchedule.delete({
      where: {
        projectsId: projectId,
      },
    })

    await prisma.vestingSchedule.create({
      data: {
        releaseInterval: schedule.batchInterval,
        Projects: {
          connect: {
            id: projectId,
          },
        },
        VestingBatch: {
          createMany: {
            data: schedule.vestingBatches.map(item => ({
              ...item,
              date: new Date(item.date),
            })),
          },
        },
      },
    })
  }
  // #endregion
}
