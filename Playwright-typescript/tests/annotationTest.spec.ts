// Playwright test annotations - reference + working examples
// Docs: https://playwright.dev/docs/test-annotations

import { test, expect } from '@playwright/test';

// ─────────────────────────────────────────────────────────────────────────
// 1. test.skip() - unconditional: never runs, shown as "skipped" in the report
// ─────────────────────────────────────────────────────────────────────────
test.skip('always skipped example', async ({ page }) => {
    // This body never executes.
    await page.goto('https://example.com');
});

// ─────────────────────────────────────────────────────────────────────────
// 2. test.skip(condition, reason) - conditional: skipped only when the
//    condition is true, evaluated against the test's fixtures.
//    Common use: skip a test on a browser/OS it doesn't support.
// ─────────────────────────────────────────────────────────────────────────
test('conditionally skipped on firefox', async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'This feature is not supported on Firefox');

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await expect(page.locator('h3')).toHaveText('JavaScript Alerts');
});

// You can also skip an entire file/worker for certain projects up front:
// test.skip(({ browserName }) => browserName === 'webkit', 'Whole file unsupported on WebKit');

// ─────────────────────────────────────────────────────────────────────────
// 3. test.fixme() - "known broken, don't run it yet". Behaves like skip, but
//    signals intent: this needs fixing, not that it's permanently irrelevant.
// ─────────────────────────────────────────────────────────────────────────
test('fixme example - known bug, tracked for a later fix', async ({ page }) => {
    test.fixme(true, 'Selector needs updating after the recent UI redesign - tracked in JIRA-1234');

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.locator('#this-selector-does-not-exist').click();
});

// ─────────────────────────────────────────────────────────────────────────
// 4. test.fail() - "this test is expected to fail right now". It still runs;
//    if it fails, Playwright reports it as an expected failure (not a red X).
//    If it unexpectedly PASSES, that's flagged as a failure instead.
// ─────────────────────────────────────────────────────────────────────────
test('fail example - expected to fail for now', async ({ page }) => {
    test.fail(true, 'Alert message copy changed on the site; assertion needs updating');

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();

    // Intentionally wrong expected text, to demonstrate the annotation for real
    await expect(page.locator('#result')).toHaveText('This text is wrong on purpose');
});

// ─────────────────────────────────────────────────────────────────────────
// 5. test.slow() - triples the test's timeout. Use for tests that are
//    legitimately slow (e.g. heavy pages, large file uploads) rather than
//    broken - avoids across-the-board timeout bumps in the config.
// ─────────────────────────────────────────────────────────────────────────
test('slow example - gets 3x the default timeout', async ({ page }) => {
    test.slow();

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await expect(page.locator('h3')).toHaveText('JavaScript Alerts');
});

// ─────────────────────────────────────────────────────────────────────────
// 6. Custom annotations - attach arbitrary metadata to a test, surfaced in
//    the HTML/JSON reporters (e.g. linking a test to a ticket or test-case id).
// ─────────────────────────────────────────────────────────────────────────
test(
    'custom annotation example - linked to a ticket',
    {
        annotation: [
            { type: 'issue', description: 'https://github.com/example/repo/issues/42' },
            { type: 'owner', description: 'aniruddha' },
        ],
    },
    async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
        await expect(page.locator('h3')).toHaveText('JavaScript Alerts');
    }
);

// Annotations can also be pushed at runtime, based on something only known
// once the test is executing:
test('custom annotation added at runtime', async ({ page }) => {
    test.info().annotations.push({ type: 'note', description: 'Added dynamically during the run' });

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await expect(page.locator('h3')).toHaveText('JavaScript Alerts');
});

// ─────────────────────────────────────────────────────────────────────────
// 7. Suite-level annotations - skip/fixme/fail/slow apply to every test in
//    a describe block when called inside test.describe (not inside a test).
// ─────────────────────────────────────────────────────────────────────────
test.describe('suite-level annotation example', () => {
    test.skip(({ browserName }) => browserName === 'webkit', 'Whole suite unsupported on WebKit');

    test('first test in the conditionally-skipped suite', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
        await expect(page.locator('h3')).toHaveText('JavaScript Alerts');
    });

    test('second test in the conditionally-skipped suite', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/checkboxes');
        await expect(page.locator('h3')).toHaveText('Checkboxes');
    });
});

// ─────────────────────────────────────────────────────────────────────────
// Real working example: handling a JS alert dialog (not an annotation itself,
// kept here as the original working test this file started from).
// ─────────────────────────────────────────────────────────────────────────
test('Alert dialog', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async (dialog) => {
        console.log('Alert message:', dialog.message());
        expect(dialog.message()).toBe('I am a JS Alert');
        await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
});
