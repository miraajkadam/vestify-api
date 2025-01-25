import prisma from '@/db'
import { getRandomBetween, getRandomBoolean } from '@/utils/common'
import { genRandomETHAddress } from '@/utils/web3'
import { faker } from '@faker-js/faker'
import { AccountType, Chain, Interval, ProjectRound, Release } from '@prisma/client'
import { getRandomValues, randomUUID } from 'crypto'

// #region sample arrays
const WEB_3_TAGS = [
  'Blockchain',
  'Crypto',
  'Decentralization',
  'NFT (Non-Fungible Token)',
  'Smart Contract',
  'DeFi (Decentralized Finance)',
  'Tokenomics',
  'DApp (Decentralized Application)',
  'Ethereum',
  'Solidity',
  'Gas Fee',
  'DAO (Decentralized Autonomous Organization)',
  'Staking',
  'Mining',
  'Layer-2',
  'Zero Knowledge Proofs',
  'Hashing',
  'Consensus Mechanism',
  'Proof of Work',
  'Proof of Stake',
  'Wallet',
  'Private Key',
  'Public Key',
  'Hashrate',
  'Crypto Wallet',
  'Metaverse',
  'Interoperability',
  'Token',
  'Airdrop',
  'Burning (Token Burning)',
  'Yield Farming',
  'Liquidity Pool',
  'Oracle',
  'Cross-chain',
  'Synthetic Assets',
  'Gas Limit',
  'Fungibility',
  'Cryptography',
  'Web3',
  'Immutable Ledger',
  'Private Blockchain',
  'Smart Chain',
  'ICO (Initial Coin Offering)',
  'Tokenization',
  'Stablecoin',
  'Governance Token',
  'Satoshi',
  'Interchain',
  'Sharding',
  'Validator',
]

const POOL_NAMES = [
  'Main Allocations',
  'Capital Pools',
  'Investor Pools',
  'Private Pools',
  'Public Pools',
  'Token Sale Pools',
  'Early Stage Pools',
  'Founding Groups',
  'Launch Pools',
  'Liquidity Pools',
  'Crowdfunding Pools',
  'Community Pools',
  'Project Fund Pools',
  'Staking Vaults',
  'Yield Pools',
  'Token Distribution Pools',
  'Airdrop Pools',
  'Initial Capital Pools',
  'Liquidity Mining Pools',
  'Staking Rewards Pools',
  'Yield Farming Pools',
  'Liquidity Mining Vaults',
  'Staking Pools',
  'Farming Pools',
  'Revenue Sharing Pools',
  'Governance Pools',
  'Validator Pools',
  'DeFi Protocol Pools',
  'Yield Aggregator Pools',
  'AMM (Automated Market Maker) Pools',
  'Synthetic Asset Pools',
  'Vault Yield Pools',
  'Venture Capital Pools',
  'Seed Funding Pools',
  'Private Sale Pools',
  'Pre-sale Pools',
  'ICO Pools (Initial Coin Offering)',
  'IDO Pools (Initial DEX Offering)',
  'IEO Pools (Initial Exchange Offering)',
  'Crowdloan Pools',
  'Project Fundraising Pools',
  'Investor Participation Pools',
  'Staking & Liquidity Provider Pools',
  'DAO Treasury Pools',
  'Governance Fund Pools',
  'DAO Investment Pools',
  'Governance Staking Pools',
  'DAO Reward Pools',
  'DAO Voting Pools',
  'Vesting Pools',
  'Token Vesting Pools',
  'Token Lockup Pools',
  'Token Allocation Pools',
  'Project Token Pools',
  'Inflationary Token Pools',
  'Deflationary Token Pools',
  'NFT Sale Pools',
  'NFT Minting Pools',
  'NFT Auction Pools',
  'NFT Staking Pools',
  'NFT Distribution Pools',
  'Metaverse Land Pools',
  'Virtual Asset Pools',
  'Airdrop Event Pools',
  'Token Reward Pools',
  'Hackathon Reward Pools',
  'Referral Reward Pools',
  'Community Incentive Pools',
  'Referral Program Pools',
  'Insurance Pools',
  'Risk Mitigation Pools',
  'Security Staking Pools',
  'Liquidity Protection Pools',
  'Cross-Chain Liquidity Pools',
  'Bridge Liquidity Pools',
  'Multi-chain Pools',
  'Cross-Chain Staking Pools',
  'Interoperability Pools',
  'Genesis Pools',
  'Genesis Vaults',
  'Launchpad Pools',
  'Fundraising Vaults',
  'Genesis Staking Pools',
  'Capital Vaults',
  'Foundation Pools',
  'Liquidity Distribution Pools',
  'Token Offering Pools',
  "Founder's Pools",
]
// #endregion

// #region Account
export const genRandAccData = () => {
  return {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}

export const genRandVCData = () => ({
  name: faker.company.name(),
  description: faker.company.buzzPhrase(),
  logoBase64: generateRandomBase64(16),
  subscriptionFee: getRandomBetween(50, 200),
  subscriptionRenewalInterval: randomInterval(),
  tags: faker.helpers.arrayElements(WEB_3_TAGS, getRandomBetween(3, 7)),
  kycDone: getRandomBoolean(),
})

export const createVCAccounts = async (vcIds: string[], wallets: string[]) => {
  vcIds.forEach(async (vcId: string, index: number) => {
    await prisma.accounts.create({
      data: {
        id: vcId,
        ...genRandAccData(),
        accountType: AccountType.VC,
        vc: {
          create: {
            ...genRandVCData(),
            VCSocial: {
              create: {
                id: vcId,
                ...generateRandomSocials(),
              },
            },
          },
        },
        wallets: {
          create: {
            address: wallets[index],
            chain: Chain.EVM,
          },
        },
      },
    })
  })
}

export const createUserAccounts = async (userIds: string[], wallets: string[]) => {
  userIds.forEach(async (userId: string, index: number) => {
    const { discord, x } = generateRandomSocials()

    await prisma.accounts.create({
      data: {
        id: userId,
        ...genRandAccData(),
        accountType: AccountType.USER,
        user: {
          create: {
            userSocial: {
              create: {
                id: userId,
                discord,
                x,
              },
            },
          },
        },
        wallets: {
          create: {
            address: wallets[index],
            chain: Chain.EVM,
          },
        },
      },
    })
  })
}
// #endregion

// #region Projects
const genRandProjData = (addresses: string[]) => {
  const { discord, x, medium, telegram, website } = generateRandomSocials()

  return {
    info: {
      name: faker.company.name(),
      description: faker.company.buzzPhrase(),
      categories: faker.helpers.arrayElements(WEB_3_TAGS, getRandomBetween(3, 7)),
    },
    roundDetails: {
      acceptedTokens: 'ETH, BTC, USDT',
      startDate: faker.date.recent(),
      endDate: faker.date.future(),
      raiseAmount: getRandomBetween(100000, 1000000),
      maximum: getRandomBetween(201, 10000),
      minimum: getRandomBetween(50, 200),
      tokenTicker: generateTicker(),
      poolFee: getRandomBetween(50, 200),
    },
    socials: {
      discord,
      x,
      medium,
      telegram,
      website,
    },
    currProjTokenMetrics: {
      round: randomRound(),
      fdv: getRandomBetween(1000000, 5000000),
      price: getRandomBetween(1, 50),
      tgeUnlock: getRandomBetween(20, 80),
      tge: faker.date.future(),
      lockupPeriod: getRandomBetween(6, 12),
      releaseType: randomRelease(),
      releaseMonths: getRandomBetween(12, 36),
    },
    teamAndAdvisors: randomTeamAndAdvisors(faker.number.int({ min: 3, max: 10 })),
    partnersAndInvestors: randomPartnersAndInvestors(faker.number.int({ min: 3, max: 10 })),
    distributionPools: randomDistributionPools(faker.number.int({ min: 3, max: 7 }), addresses),
    vestingSchedule: randomVestingSchedule(),
  }
}

const randomVestingSchedule = () => {
  return {}
}

const randomDistributionPools = (num: number, addresses: string[]) => {
  const randomPools = []

  for (let i = 0; i < num; i++) {
    const randomPoolName = faker.helpers.arrayElements(POOL_NAMES, 1)[0]

    const pool = {
      name: randomPoolName,
      addresses: faker.helpers.arrayElements(addresses, getRandomBetween(1, addresses.length)),
      fee: getRandomBetween(50, 200),
      maxAllocation: getRandomBetween(201, 10000),
      minAllocation: getRandomBetween(50, 200),
    }

    randomPools.push(pool)
  }

  return randomPools
}

const randomTeamAndAdvisors = (num: number) => {
  const randomTaA = []

  for (let i = 0; i < num; i++) {
    const ta = {
      name: faker.person.fullName(),
      title: faker.person.jobTitle(),
      description: faker.lorem.paragraph(),
      imgBase64: generateRandomBase64(16),
    }

    randomTaA.push(ta)
  }

  return randomTaA
}

const randomPartnersAndInvestors = (num: number) => {
  const randomPaI = []

  for (let i = 0; i < num; i++) {
    const pi = {
      name: faker.company.name(),
      logoBase64: generateRandomBase64(16),
    }

    randomPaI.push(pi)
  }

  return randomPaI
}

export const createProjects = async (
  vcIds: string[],
  userIds: string[],
  maxProjectsPerVC: number
) => {
  vcIds.forEach(async vcId => {
    const randomMaxProj = faker.number.int({ min: 1, max: maxProjectsPerVC })

    const projectAddresses = Array.from({ length: randomMaxProj }, () => genRandomETHAddress())
    const projectWallets = Array.from({ length: randomMaxProj }, () => genRandomETHAddress())

    projectAddresses.forEach(async (projectId: string, index) => {
    const randomProject = genRandProjData(userIds)

    await prisma.projectRoundDetails.create({
      data: {
        id: projectId,
        ...randomProject.roundDetails,
      },
    })

    await prisma.projectSocials.create({
      data: {
        id: projectId,
        ...randomProject.socials,
      },
    })

    await prisma.currentProjectTokenMetrics.create({
      data: {
        id: projectId,
        ...randomProject.currProjTokenMetrics,
      },
    })

    await prisma.projectWallet.create({
      data: {
        id: projectId,
        chain: Chain.EVM,
          walletAddress: projectWallets[index],
      },
    })

    await prisma.projects.create({
      data: {
        id: projectId,
          vcId: vcId,
        ...randomProject.info,
        projectPartnersAndInvestors: {
          createMany: {
            data: randomProject.partnersAndInvestors,
          },
        },
        projectTeamAndAdvisors: {
          createMany: {
            data: randomProject.teamAndAdvisors,
          },
        },
        DistributionPools: {
          createMany: {
            data: randomProject.distributionPools,
          },
        },
      },
      })
    })
  })
}

const generateTicker = () => {
  const length = faker.number.int({ min: 3, max: 5 })
  const ticker = faker.string.alpha({ length, casing: 'upper' })
  return ticker
}
// #endregion

// #endregion

// #region Common
const randomInterval = () => {
  const intervals = [Interval.ANNUALLY, Interval.MONTHLY, Interval.QUARTERLY]

  const randomIndex = Math.floor(Math.random() * intervals.length)

  const randomInterval = intervals[randomIndex]

  return randomInterval
}

const randomRound = () => {
  const rounds = [
    ProjectRound.PRE_SEED,
    ProjectRound.PRIVATE_1,
    ProjectRound.PRIVATE_2,
    ProjectRound.PRIVATE_3,
    ProjectRound.PUBLIC,
    ProjectRound.SEED,
  ]

  const randomIndex = Math.floor(Math.random() * rounds.length)

  const randomRound = rounds[randomIndex]

  return randomRound
}

const randomRelease = () => {
  const releases = [Release.LINEAR, Release.QUARTERLY, Release.YEARLY]

  const randomIndex = Math.floor(Math.random() * releases.length)

  const randomRelease = releases[randomIndex]

  return randomRelease
}

const generateRandomBase64 = (length: number) => {
  const randomBytes = new Uint8Array(length) // Create a random byte array of the desired length
  getRandomValues(randomBytes) // Fill the array with cryptographically strong random values

  // Convert to Base64
  return btoa(String.fromCharCode(...randomBytes))
}

export const generateRandomSocials = () => {
  const randomName = faker.internet.displayName()

  return {
    x: `https://x.com/${randomName}`,
    telegram: `https://t.me/${randomName}`,
    website: `https://${randomName}.com`,
    discord: `https://discord.gg/${randomName}`,
    medium: `https://medium.com/@${randomName}`,
    youtube: `https://www.youtube.com/c/${randomName}`,
  }
}
// #endregion
