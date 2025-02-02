import { Chain } from '@prisma/client'

import prisma from '@/db'

/**
 * Service class for managing account-related operations.
 * This class provides methods to link wallets to an account, retrieve linked wallets, and check if an account exists in the database.
 */
export default class AccountService {
  /**
   * Links a wallet address to an account in the database.
   *
   * This function creates a new wallet record in the database and associates it with the given account ID.
   * It links the wallet address and its respective blockchain type (chain) to the specified account.
   *
   * @param {string} accountId - The unique identifier of the account to link the wallet to.
   * @param {Chain} chain - The blockchain type of the wallet (e.g., 'EVM', 'SOLANA').
   * @param {string} address - The wallet address to associate with the account.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the wallet was successfully linked, `false` otherwise.
   *
   * @example
   * const linked = await accountService.linkAddToAccInDb('4b509982-5dc0-4999-8fe7-e347f9764288', 'EVM', '0x1234567890abcdef');
   * if (linked) {
   *   console.log('Wallet successfully linked!');
   * } else {
   *   console.log('Failed to link wallet.');
   * }
   *
   * @throws {Error} Throws an error if the database operation fails.
   */
  linkAddToAccInDb = async (accountId: string, chain: Chain, address: string): Promise<boolean> => {
    const entity = await prisma.wallet.create({
      data: { address, chain, accountsId: accountId },
      select: {
        accountsId: true,
      },
    })

    return entity !== null
  }

  /**
   * Retrieves all linked wallets for a given account from the database.
   *
   * This function queries the database for all wallets associated with the specified account ID.
   * It returns the wallet addresses and their respective blockchain types.
   *
   * @param {string} accountId - The unique identifier of the account for which to retrieve linked wallets.
   * @returns {Promise<{ address: string; chain: Chain }[]>} A promise that resolves to an array of objects, each containing the wallet's address and chain type.
   *
   * @example
   * const wallets = await accountService.getLinkdWalletsFromDb('4b509982-5dc0-4999-8fe7-e347f9764288');
   * console.log(wallets);
   * // Example output: [{ address: '0x1234567890abcdef', chain: 'EVM' }, { address: '5Kx6M2nViwAaFr8KfGg2XZ8Z9H1h8Bo7V1bZxz26cjjE', chain: 'SOLANA' }]
   *
   * @throws {Error} Throws an error if the database query fails.
   */
  getLinkdWalletsFromDb = async (accountId: string): Promise<{ address: string; chain: Chain }[]> =>
    await prisma.wallet.findMany({
      where: {
        accountsId: accountId,
      },
      select: {
        address: true,
        chain: true,
      },
    })

  /**
   * Checks if a account entity exists in the database by its ID.
   *
   * This function queries the database to determine whether a account entity with the specified ID exists. It returns a boolean value indicating the presence of the entity.
   *
   * @param {string} id - The unique identifier of the account entity to check. Must be a valid GUID.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if the account entity exists, and `false` otherwise.
   *
   * @example
   * const idToCheck = '4b509982-5dc0-4999-8fe7-e347f9764288';
   * const exists = await accountService.checkAccExstByIdInDb(idToCheck);
   * if (exists) {
   *   console.log('Account exists.');
   * } else {
   *   console.log('Account does not exist.');
   * }
   *
   * @throws {Error} Throws an error if the database query fails.
   */
  checkAccExstByIdInDb = async (id: string): Promise<boolean> => {
    const entity = await prisma.accounts.findUnique({
      where: { id },
    })

    return entity !== null
  }

  getUserDetailsViaAddresses = async (projectId: string, wallets: string[]) => {
    const userDetails = []

    for await (const wallet of wallets) {
      const usrDet = await prisma.wallet.findFirstOrThrow({
        where: { address: wallet },
        select: {
          Accounts: {
            select: {
              user: {
                select: {
                  investedProjects: {
                    where: {
                      projectId,
                    },
                    select: {
                      amount: true,
                      fromWalletKey: true,
                      toWalletKey: true,
                    },
                  },
                  userSocial: {
                    select: {
                      discord: true,
                      x: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      const investedProj = usrDet.Accounts?.user?.investedProjects

      let totalInvest = 0
      if (!investedProj) {
        totalInvest = 0
      } else {
        investedProj.forEach(prj => {
          totalInvest += prj.amount.toNumber()
        })
      }

      userDetails.push({
        socials: {
          x: usrDet.Accounts?.user?.userSocial.x,
          discord: usrDet.Accounts?.user?.userSocial.discord,
        },
        investment: {
          amount: totalInvest,
          fromWallet: usrDet.Accounts?.user?.investedProjects[0].fromWalletKey,
          toWallet: usrDet.Accounts?.user?.investedProjects[0].toWalletKey,
        },
      })
    }

    return userDetails
  }
}
