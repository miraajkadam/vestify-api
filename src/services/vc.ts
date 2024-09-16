import { PrismaClient } from '@prisma/client'

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
   * @param {string} name - The name of the venture capitalist.
   * @param {string} description - A description of the venture capitalist.
   * @param {string} logoBase64 - The base64-encoded logo of the venture capitalist.
   * @param {number} subscriptionFee - The subscription fee associated with the venture capitalist.
   * @param {string[]} tags - An array of tags associated with the venture capitalist.
   * @param {boolean} kycDone - Indicates whether Know Your Customer (KYC) verification has been completed for the venture capitalist.
   *
   * @returns {Promise<string | undefined> } The ID of the newly created venture capitalist record, or `undefined` if creation fails.
   */
  createNewVCInDB = async (
    name: string,
    description: string,
    logoBase64: string,
    subscriptionFee: number,
    tags: string[],
    kycDone: boolean
  ): Promise<string | undefined> => {
    const vc = await this.prisma.vC.create({
      data: { name, description, logoBase64, subscriptionFee, tags, kycDone },
      select: {
        id: true,
      },
    })

    return vc?.id
  }
}
