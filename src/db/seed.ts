import prisma from '@/db'
import { genRandomETHAddress } from '@/utils/web3'
import { v4 as uuid } from 'uuid'
import { createProjects, createUserAccounts, createVCAccounts } from './data/seedFunctions'

async function main() {
  const [userNum, vcNum, projectsNum] = [100, 2, 5]

  const userIds = Array.from({ length: userNum }, () => uuid())
  const userWallets = Array.from({ length: userNum }, () => genRandomETHAddress())

  const vcIds = Array.from({ length: vcNum }, () => uuid())
  const vcWallets = Array.from({ length: vcNum }, () => genRandomETHAddress())

  await createVCAccounts(vcIds, vcWallets)

  await createUserAccounts(userIds, userWallets)

  const projectAddresses = Array.from({ length: projectsNum }, () => genRandomETHAddress())

  const projectWallets = Array.from({ length: projectsNum }, () => genRandomETHAddress())

  await createProjects(projectAddresses, projectWallets, vcIds, userWallets)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
