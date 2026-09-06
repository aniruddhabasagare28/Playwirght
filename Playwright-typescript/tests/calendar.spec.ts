//handle calendar using luxon

import { DateTime } from 'luxon';
import { test, expect, Page } from '@playwright/test';

test('Handle calendar using luxon', async ({ page }) => {
  // Navigate to the calendar page
  await page.goto('https://lambdatest.com/selenium-playground/bootstrap-date-picker-demo');
  await page.waitForLoadState('networkidle');

  // Get the current date using Luxon
  const currentDate = DateTime.now();

  // This widget disables today and all future dates, so pick a date a couple of
  // months in the past - that also exercises selectDate's month navigation.
  const targetDate = currentDate.minus({ months: 2 }).set({ day: 10 });

  await selectDate(page, targetDate.toFormat('MMMM yyyy'), targetDate.day.toString());

  // The bootstrap datepicker writes the picked day into the input as dd/MM/yyyy
  await expect(page.locator('input[placeholder="dd/mm/yyyy"]')).toHaveValue(targetDate.toFormat('dd/MM/yyyy'));
})

async function selectDate(page: Page, monthYearString: string, dayString: string) {
  // Open the date picker
  await page.locator('input[placeholder="dd/mm/yyyy"]').click();

  const monthYear = page.locator('.datepicker-days th.datepicker-switch');
  const prevButton = page.locator('.datepicker-days th.prev');
  const nextButton = page.locator('.datepicker-days th.next');

  const targetDate = DateTime.fromFormat(monthYearString, 'MMMM yyyy');

  // Click prev/next until the calendar header shows the target month/year.
  // Capped at 24 tries so a widget that can never reach the target (e.g. this one
  // disables navigating into future months) fails fast instead of looping forever.
  for (let attempts = 0; attempts < 24; attempts++) {
    const displayedMonthYear = await monthYear.textContent();
    const displayedDate = DateTime.fromFormat(displayedMonthYear!, 'MMMM yyyy');

    if (displayedDate.hasSame(targetDate, 'month')) {
      break;
    } else if (targetDate < displayedDate) {
      await prevButton.click();
    } else {
      await nextButton.click();
    }
  }

  await expect(monthYear).toHaveText(targetDate.toFormat('MMMM yyyy'));

  // Click the target day. Scoped to plain "day" cells (excludes "old"/"new" cells,
  // which are the previous/next month's spillover days shown in the same grid) and
  // matched exactly so e.g. day "3" doesn't also match "13"/"23"/"30".
  const dayCell = page.locator('.datepicker-days td.day:not(.old):not(.new)')
    .filter({ hasText: new RegExp(`^${dayString}$`) });
  await dayCell.click();
}
