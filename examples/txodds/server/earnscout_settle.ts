/**
 * No-Docker EarnScout settlement proof.
 *
 * This proves the paid service without coral-server: it produces the EarnScout delivery, binds that
 * delivery hash into the escrow reference, deposits devnet SOL, then releases it to the seller wallet.
 *
 * Required root .env:
 *   BUYER_KEYPAIR_B58=<base58 disposable devnet keypair>
 *   WALLET=<seller payout pubkey>   or SELLER_WALLET=<seller payout pubkey>
 */
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import bs58 from 'bs58'
import { deliverService } from '../agent/service.js'
import { deposit, escrowPda, makeProgram, release } from '../agent/escrow.js'

const ROOT = fileURLToPath(new URL('../../..', import.meta.url))
const ENV_PATH = process.env.KIT_ENV ?? join(ROOT, '.env')
const OUT_DIR = join(ROOT, 'deliverables', 'devnet-proof')
const OUT_JSON = join(OUT_DIR, 'earnscout-settlement.json')
const OUT_MD = join(OUT_DIR, 'earnscout-settlement.md')

function loadEnv(): Record<string, string> {
  const env: Record<string, string> = { ...(process.env as Record<string, string>) }
  try {
    for (const line of readFileSync(ENV_PATH, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m && env[m[1]] === undefined) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  } catch {
    throw new Error(`missing env file: ${ENV_PATH}`)
  }
  return env
}

function buyerKeypair(env: Record<string, string>): Keypair {
  const b58 = env.BUYER_KEYPAIR_B58
  if (!b58) throw new Error('BUYER_KEYPAIR_B58 is not set')
  return Keypair.fromSecretKey(bs58.decode(b58.trim()))
}

function explorer(kind: 'tx' | 'address', id: string): string {
  return `https://explorer.solana.com/${kind}/${id}?cluster=devnet`
}

function sha256Hex(input: string): string {
  return createHash('sha256').update(input).digest('hex')
}

function makeReference(preimage: string): PublicKey {
  return new PublicKey(createHash('sha256').update(preimage).digest())
}

async function getBalanceWithRetry(connection: Connection, buyer: PublicKey): Promise<number> {
  let lastError: unknown
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      return await connection.getBalance(buyer)
    } catch (e) {
      lastError = e
      await new Promise((resolve) => setTimeout(resolve, attempt * 750))
    }
  }
  throw lastError
}

async function main(): Promise<void> {
  const env = loadEnv()
  const rpc = env.SOLANA_RPC_URL ?? 'https://api.devnet.solana.com'
  if (env.ALLOW_MAINNET !== '1' && /mainnet/i.test(rpc)) {
    throw new Error(`Refusing mainnet RPC "${rpc}"`)
  }

  const buyer = buyerKeypair(env)
  const seller = new PublicKey(env.SELLER_WALLET || env.WALLET || buyer.publicKey.toBase58())
  const amountSol = Math.max(0.001, Number(env.EARNSCOUT_PRICE_SOL ?? '0.001'))
  const slug = env.EARNSCOUT_SLUG ?? 'imperial-ai-agent-hackathon-build-the-agent-economy'
  const request = `earnscout ${slug}`
  const deliveryRaw = await deliverService(request)
  const deliveryHash = sha256Hex(deliveryRaw)
  const referencePreimage = `earnscout:${slug}:${deliveryHash}:${Date.now()}`
  const reference = makeReference(referencePreimage)

  const connection = new Connection(rpc, 'confirmed')
  const balanceLamports = await getBalanceWithRetry(connection, buyer.publicKey)
  const balanceSol = balanceLamports / LAMPORTS_PER_SOL
  const minimumSol = amountSol + 0.004
  if (balanceSol < minimumSol) {
    throw new Error(
      `buyer wallet has ${balanceSol.toFixed(6)} SOL; fund ${buyer.publicKey.toBase58()} with at least ${minimumSol.toFixed(3)} devnet SOL`,
    )
  }

  const program = await makeProgram(buyer, rpc)
  const depositSig = await deposit(program, buyer, seller, reference, amountSol, 600)
  const releaseSig = await release(program, buyer, seller, reference)
  const escrow = escrowPda(buyer.publicKey, reference)
  const proof = {
    service: 'earnscout-triage',
    mode: 'no-docker-direct-escrow',
    cluster: 'devnet',
    request,
    amountSol,
    buyer: buyer.publicKey.toBase58(),
    seller: seller.toBase58(),
    reference: reference.toBase58(),
    referencePreimage,
    deliveryHash,
    delivery: JSON.parse(deliveryRaw),
    escrow: {
      pda: escrow.toBase58(),
      explorer: explorer('address', escrow.toBase58()),
    },
    deposit: {
      sig: depositSig,
      explorer: explorer('tx', depositSig),
    },
    release: {
      sig: releaseSig,
      explorer: explorer('tx', releaseSig),
    },
    generatedAt: new Date().toISOString(),
  }

  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(OUT_JSON, `${JSON.stringify(proof, null, 2)}\n`, 'utf8')
  writeFileSync(OUT_MD, [
    '# EarnScout No-Docker Devnet Settlement Proof',
    '',
    `- Service: ${proof.service}`,
    `- Mode: ${proof.mode}`,
    `- Cluster: ${proof.cluster}`,
    `- Request: \`${proof.request}\``,
    `- Amount: ${proof.amountSol} SOL`,
    `- Buyer: \`${proof.buyer}\``,
    `- Seller: \`${proof.seller}\``,
    `- Delivery SHA-256: \`${proof.deliveryHash}\``,
    `- Escrow PDA: [${proof.escrow.pda}](${proof.escrow.explorer})`,
    `- Deposit tx: [${proof.deposit.sig}](${proof.deposit.explorer})`,
    `- Release tx: [${proof.release.sig}](${proof.release.explorer})`,
    `- Generated: ${proof.generatedAt}`,
    '',
    'This proof runs without Docker or coral-server. It binds the delivered EarnScout report hash into the escrow reference, deposits devnet SOL, and releases it after delivery.',
    '',
  ].join('\n'), 'utf8')

  console.log(JSON.stringify({
    ok: true,
    proof: OUT_JSON,
    markdown: OUT_MD,
    deposit: proof.deposit.explorer,
    release: proof.release.explorer,
  }, null, 2))
}

main().catch((e) => {
  console.error(`[earnscout:settle] ${e instanceof Error ? e.message : String(e)}`)
  process.exitCode = 1
})
