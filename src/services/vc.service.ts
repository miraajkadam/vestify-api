import { PrismaClient, ProjectRound, VCSocial } from '@prisma/client'
import type { Decimal } from '@prisma/client/runtime/library'

import { VCProfileResponse, VCProjectsResponse } from '@/types/VC.d'

/**
 * Service class for managing Venture Capitalists (VCs) in the database.
 *
 * @class
 */
export default class VCService {
  private prisma: PrismaClient

  /**
   * Creates an instance of VCService and initializes PrismaClient.
   *
   * @constructor
   */
  constructor() {
    this.prisma = new PrismaClient()
  }

  /**
   * Creates a new venture capitalist record in the database.
   *
   * @param {string} accountId - Account ID for the venture capitalist.
   * @param {string} name - The name of the venture capitalist.
   * @param {string} description - A description of the venture capitalist.
   * @param {string} logoBase64 - The base64-encoded logo of the venture capitalist.
   * @param {number} subscriptionFee - The subscription fee associated with the venture capitalist.
   * @param {string[]} tags - An array of tags associated with the venture capitalist.
   * @param {boolean} kycDone - Indicates whether Know Your Customer (KYC) verification has been completed for the venture capitalist.
   * @param {Object} socials - The social media links associated with the VC.
   * @param {string|null} [socials.x] - Additional info (optional).
   * @param {string|null} [socials.instagram] - Instagram link (optional).
   * @param {string|null} [socials.discord] - Discord link (optional).
   * @param {string|null} [socials.telegram] - Telegram link (optional).
   * @param {string|null} [socials.medium] - Medium link (optional).
   * @param {string|null} [socials.youtube] - YouTube channel link (optional).
   *
   * @returns {Promise<string | undefined> } The ID of the newly created venture capitalist record, or `undefined` if creation fails.
   */
  createNewVCInDB = async (
    accountId: string,
    name: string,
    description: string,
    logoBase64: string,
    subscriptionFee: Decimal,
    tags: string[],
    kycDone: boolean,
    socials: Omit<VCSocial, 'id' | 'vcId'>
  ) => {
    await this.prisma.vC.update({
      where: {
        id: accountId,
      },
      data: {
        name,
        description,
        logoBase64,
        subscriptionFee,
        tags,
        kycDone,
        VCSocial: {
          create: {
            discord: socials.discord,
            instagram: socials.instagram,
            medium: socials.medium,
            telegram: socials.telegram,
            x: socials.x,
            youtube: socials.youtube,
          },
        },
      },
      select: {
        id: true,
      },
    })
  }

  /**
   * Retrieves VC details from the database by VC ID.
   *
   * This function queries the database for a VC (Venture Capital) record based on the provided ID. It returns the VC details, including its description, KYC status, logo, name, subscription fee, tags, and associated projects.
   *
   * @param {string} id - The unique identifier of the VC to retrieve. Must be a valid GUID.
   *
   * @returns {Promise<VCProfileResponse|null>} A promise that resolves to an object containing the VC details, or `null` if no VC with the given ID is found. The returned object includes:
   *
   * - `description` (string): The description of the VC.
   * - `kycDone` (boolean): A flag indicating whether the KYC (Know Your Customer) process is complete.
   * - `logoBase64` (string): The base64 encoded logo of the VC.
   * - `name` (string): The name of the VC.
   * - `subscriptionFee` (number): The subscription fee associated with the VC.
   * - `tags` (Array<string>): An array of tags related to the VC.
   * - `projects` (Array<Object>): An array of projects associated with the VC, where each project object includes:
   *   - `id` (string): The unique identifier of the project.
   *   - `name` (string): The name of the project.
   *
   * @throws {Error} Throws an error if the database query fails.
   */
  getVCDetailsFromDB = async (id: string): Promise<VCProfileResponse | null> => {
    const vcDetails = await this.prisma.vC.findUnique({
      where: { id },
      select: {
        id: true,
        description: true,
        kycDone: true,
        logoBase64: true,
        name: true,
        subscriptionFee: true,
        tags: true,
        projects: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return vcDetails ? { ...vcDetails, vcId: vcDetails.id } : null
  }

  /**
   * Retrieves a list of projects associated with a VC from the database by VC ID.
   *
   * This function queries the database to fetch the projects related to a VC (Venture Capital) record based on the provided ID. It returns an array of project details, each including the project's ID, name, description, and round.
   *
   * @param {string} id - The unique identifier of the VC whose projects are to be retrieved. Must be a valid GUID.
   *
   * @returns {Promise<VCProjectsResponse | undefined>} A promise that resolves to an array of project details (`VCProjectsResponse`) or `undefined` if no VC with the given ID is found. The array includes objects with the following properties:
   *
   * - `id` (string): The unique identifier of the project.
   * - `name` (string): The name of the project.
   * - `description` (string): A description of the project.
   * - `round` (ProjectRound): The round of the project. The type `ProjectRound` should be defined elsewhere in your codebase.
   *
   * @throws {Error} Throws an error if the database query fails.
   */
  getVCProjectsByIdFromDB = async (id: string): Promise<VCProjectsResponse | undefined> => {
    const vcProjects = await this.prisma.vC.findUnique({
      where: { id },
      select: {
        id: true,
        projects: {
          select: {
            id: true,
            name: true,
            description: true,
            projectTokenMetrics: {
              select: {
                round: true,
              },
              take: 1,
            },
          },
        },
      },
    })

    const restProjects = vcProjects?.projects.map(({ projectTokenMetrics, ...rest }) => ({
      ...rest,
      round: projectTokenMetrics[0].round,
    })) as {
      round: ProjectRound
      id: string
      name: string
      description: string
    }[]

    return vcProjects ? { vcId: vcProjects.id, projects: restProjects } : undefined
  }

  /**
   * Checks if a VC (Venture Capital) entity exists in the database by its ID.
   *
   * This function queries the database to determine whether a VC entity with the specified ID exists. It returns a boolean value indicating the presence of the entity.
   *
   * @param {string} id - The unique identifier of the VC entity to check. Must be a valid GUID.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if the VC entity exists, and `false` otherwise.
   *
   * @example
   * const idToCheck = '4b509982-5dc0-4999-8fe7-e347f9764288';
   * const exists = await checkVCExistByIdInDb(idToCheck);
   *
   * @throws {Error} Throws an error if the database query fails.
   */
  checkVCExistByIdInDb = async (id: string): Promise<boolean> => {
    const entity = await this.prisma.vC.findUnique({
      where: { id },
    })

    return entity !== null
  }

  /**
   * Retrieves a list of all venture capitalists (VCs) from the database.
   *
   * This function queries the database to fetch all VC records, returning an array of VC details. Each VC detail includes the VC's name, description, logo (encoded in base64), subscription fee, and ID.
   *
   * @async
   * @returns {Promise<Array<{ name: string, description: string, logoBase64: string, subscriptionFee: number, id: string }> | undefined>}
   * A promise that resolves to an array of VC objects, where each object contains:
   *
   * - `name` (string): The name of the VC.
   * - `description` (string): A description of the VC.
   * - `logoBase64` (string): The base64-encoded logo of the VC.
   * - `subscriptionFee` (Decimal): The subscription fee associated with the VC.
   * - `id` (string): The unique identifier of the VC.
   *
   * @throws {Error} Throws an error if the database query fails.
   */
  getAllVCsFromDb = async (): Promise<
    | Array<{
        name: string
        description: string
        logoBase64: string
        subscriptionFee: Decimal
        id: string
      }>
    | undefined
  > => {
    const vcs = await this.prisma.vC.findMany({
      select: {
        name: true,
        description: true,
        logoBase64: true,
        subscriptionFee: true,
        id: true,
      },
    })

    return vcs
  }
}
