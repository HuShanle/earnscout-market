import { test, expect } from '@playwright/test'

/**
 * The app ships a built-in EarnScout fixture so judges can inspect the full round without Docker.
 */
test('renders the live auction from the real feed pipeline', async ({ page }) => {
  await page.goto('/?session=earnscout-fixture')

  const settled = page.locator('[data-testid="round"][data-round="1"]')
  await expect(settled).toBeVisible()
  await expect(settled.getByTestId('status')).toHaveText('settled')

  await expect(settled.getByTestId('bid')).toHaveCount(3)
  await expect(settled.getByTestId('declined')).toHaveText(/copy-scout/)
  const winner = settled.locator('[data-testid="bid"][data-seller="compliance-scout"]')
  await expect(winner).toHaveClass(/bid-won/)

  await expect(settled.getByTestId('earnscout-report')).toContainText('Build EarnScout Market')
  await expect(settled.getByTestId('reason')).toBeVisible()
  const release = settled.getByTestId('settle').last()
  await expect(release).toHaveAttribute('href', /explorer\.solana\.com\/tx\/.+cluster=devnet/)
})

test('shows the connection indicator', async ({ page }) => {
  await page.goto('/?session=earnscout-fixture')
  await expect(page.getByTestId('conn')).toBeVisible()
})
