const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\pradeep2\\.gemini\\antigravity\\brain\\bb59380c-03b4-4536-a609-1fcf893756e8';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
    console.log('Testing Wire Routing without overlap (with and without breadboard)...');
    const browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
        defaultViewport: { width: 1920, height: 1080 }
    });

    const page = await browser.newPage();

    async function setupCircuit(componentName, useBreadboard, rotateBreadboard = null) {
        await page.goto('http://localhost:7088', { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('.main-canvas', { timeout: 30000 });
        await sleep(2500);

        // Dismiss tutorial popup if present
        await page.evaluate(() => {
            const skipBtn = document.querySelector('.introjs-skipbutton') || document.querySelector('.introjs-overlay');
            if (skipBtn) skipBtn.click();
        });
        await sleep(500);

        // Select Uno
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const unoBtn = buttons.find(b => b.textContent && b.textContent.includes('Arduino Uno'));
            if (unoBtn) unoBtn.click();
        });
        await sleep(2000);

        // Dismiss tutorial popup again if it reopened
        await page.evaluate(() => {
            const skipBtn = document.querySelector('.introjs-skipbutton') || document.querySelector('.introjs-overlay');
            if (skipBtn) skipBtn.click();
        });

        if (useBreadboard) {
            // Turn on breadboard
            await page.evaluate(() => {
                const cb = document.querySelector('.breadboard-switch input');
                if (cb && !cb.checked) {
                    cb.click();
                }
            });
            await sleep(1500);
            await page.waitForSelector('#component-bb', { timeout: 10000 });
        }

        // Expand directories
        const dirButtons = await page.$$('.directory-button');
        for (const btn of dirButtons) {
            try {
                const isHidden = await page.evaluate(b => {
                    const next = b.nextElementSibling;
                    return next && next.hasAttribute('hidden');
                }, btn);
                if (isHidden) {
                    await btn.click();
                    await sleep(40);
                }
            } catch (e) {}
        }
        await sleep(500);

        // Find component card
        const cards = await page.$$('.card-container');
        let compCard = null;
        for (const card of cards) {
            const name = await page.evaluate(c => {
                const n = c.querySelector('.card-name');
                return n ? n.textContent.trim() : '';
            }, card);
            if (name === componentName) {
                compCard = card;
                break;
            }
        }

        if (compCard) {
            await compCard.evaluate(el => el.scrollIntoView({ block: 'center' }));
            await sleep(200);
            const box = await compCard.boundingBox();
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            await sleep(100);
            // Drop onto canvas / breadboard
            const targetX = useBreadboard ? 700 : 750;
            const targetY = useBreadboard ? 350 : 350;
            await page.mouse.move(targetX, targetY, { steps: 20 });
            await sleep(200);
            await page.mouse.up();
            await sleep(2000);
        }

        // Collapse sidebar
        await page.evaluate(() => {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && !sidebar.style.left.includes('-')) {
                const expandBtn = document.querySelector('.expand-button-left');
                if (expandBtn) expandBtn.click();
            }
        });
        await sleep(800);

        if (useBreadboard && rotateBreadboard) {
            await page.waitForSelector('#component-bb', { timeout: 10000 });
            await page.evaluate(() => {
                const bb = document.getElementById('component-bb');
                const rect = bb.getBoundingClientRect();
                const evt = new MouseEvent('contextmenu', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    button: 2,
                    buttons: 2,
                    clientX: rect.left + 50,
                    clientY: rect.top + 50
                });
                bb.dispatchEvent(evt);
            });

            const btnSelector = rotateBreadboard === 'cw' ? '#component-rotate-cw' : '#component-rotate-ccw';
            await page.waitForSelector(btnSelector, { timeout: 5000 });
            await page.click(btnSelector);
            await sleep(1500);

            // Click canvas container to close context menu
            await page.evaluate(() => {
                const canvas = document.querySelector('.canvas-container');
                if (canvas) canvas.click();
            });
            await page.keyboard.press('Escape');
            await sleep(800);
        }
    }

    // 1. With Breadboard - Rotated (Exact match of user photo)
    console.log('1. Capturing RGB LED on rotated breadboard...');
    await setupCircuit('RGB LED', true, 'cw');
    await page.screenshot({ path: path.join(artifactDir, 'wire_routing_breadboard_rotated_workbench.png') });

    // Closeup of the breadboard wires
    const bbRotEl = await page.$('#component-bb');
    if (bbRotEl) {
        await bbRotEl.screenshot({ path: path.join(artifactDir, 'wire_routing_breadboard_rotated_closeup.png') });
    }

    // 2. With Breadboard - Unrotated
    console.log('2. Capturing RGB LED on unrotated breadboard...');
    await setupCircuit('RGB LED', true, null);
    await page.screenshot({ path: path.join(artifactDir, 'wire_routing_breadboard_unrotated_workbench.png') });
    const bbEl = await page.$('#component-bb');
    if (bbEl) {
        await bbEl.screenshot({ path: path.join(artifactDir, 'wire_routing_breadboard_unrotated_closeup.png') });
    }

    // 3. Without Breadboard - Direct wiring to Arduino
    console.log('3. Capturing RGB LED directly wired to Arduino (No Breadboard)...');
    await setupCircuit('RGB LED', false, null);
    await page.screenshot({ path: path.join(artifactDir, 'wire_routing_no_breadboard_workbench.png') });

    await browser.close();
    console.log('All verification screenshots captured successfully!');
}

main().catch(err => {
    console.error('Test error:', err);
    process.exit(1);
});
