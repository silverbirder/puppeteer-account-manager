(async () => {
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.23 Safari/537.36');
    await page.goto('https://qiita.com/login')
    await page.$eval('.btn-google-inverse', form => form.submit())
    const mailInput = 'input[type="email"]'
    await page.waitForSelector(mailInput, {visible: true})
    await page.type(mailInput, process.env.GOOGLE_MAIL)
    await page.click('#identifierNext')
    const passwordInput = 'input[type="password"]'
    await page.waitForSelector(passwordInput, {visible: true})
    await page.type(passwordInput, process.env.GOOGLE_PASS)
    await page.click('#passwordNext')
    await page.waitForNavigation()
    await page.goto('https://qiita.com/settings/account/custom_image');
    const filePath = "avater.JPG";
    const input = await page.$('input[type=file]');
    await input.uploadFile(filePath);
    await page.waitForSelector('input[type="submit"]', {visible: true})
    await page.click('input[type="submit"]')
    await page.waitFor(1000)
    await browser.close()
})()
