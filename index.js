const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
	const browser = await puppeteer.launch({
		headless: false
	});
	const page    = await browser.newPage();
	await page.goto('https://www.instagram.com/robson_lucas.te');
	// await page.screenshot({path: 'instagram.png'});

	const imgList = await page.evaluate(() => {
		// toda essa função será executada no browser

		// vamos pegar todas as imagens que estão na parte de posts
		const nodeList = document.querySelectorAll('article img');
		// transformar o NodeList em array
		const imgArray = [...nodeList];
		// trasnformar os nodes (elementos html) em objetos JS
		const imageList = imgArray.map(img => ({
			src: img.src
		}));
		// colocar para fora da função
		return imageList;
	});

	// Escrever os dados em um arquivo local
	fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
		if (err) {
			throw new Error('Algo ocorreu de errado');
		}
		console.log('Deu certo');
	});

	await browser.close();
})();
