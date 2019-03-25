const superagent= require('superagent');
const cheerio = require('cheerio');


let getHotel = (htmlStr) =>{
	let hotels = [];
	let prices = [];
	let hrefs = [];
	let whole = [];
	
	let $ = cheerio.load(htmlStr);
	$('h3.mainTitle3 a span').each((idx,ele) => {
		let hotel = $(ele).text();
		hotels.push(hotel)
	});
	$('h3.mainTitle3 a').each((idx,ele) => {
		let href = $(ele).attr('href');
		hrefs.push(href)
	});
	
	$('span.price span.price').each((idx,ele) => {
		let price = $(ele).text();
		prices.push(price)
	});
	//console.log(hotels)
	//console.log(prices)
	var j = 0;
	for (var i = 0;i < hotels.length; i++){
		let all = {
			hotel:hotels[i],
			price:prices[i],
			href:hrefs[i]
		}
	whole.push(all);
	j++;
	}
	
	//return whole;
	console.log(whole);
	console.log(j);
};
	var url = [
	'https://www.relaischateaux.com/us/destinations/europe/france',
	'https://www.relaischateaux.com/us/destinations/europe/france?page=2/',
	'https://www.relaischateaux.com/us/destinations/europe/france?page=3/',
	'https://www.relaischateaux.com/us/destinations/europe/france?page=4/',
	'https://www.relaischateaux.com/us/destinations/europe/france?page=5/',
	'https://www.relaischateaux.com/us/destinations/europe/france?page=6/',
	'https://www.relaischateaux.com/us/destinations/europe/france?page=7/',
	'https://www.relaischateaux.com/us/destinations/europe/france?page=8/',
	];
		
	var hotel = [];
	url.forEach(url =>{
	const Nightmare = require('nightmare');          // 自动化测试包，处理动态页面
	const nightmare = Nightmare({ show: false });     // show:true  显示内置模拟浏览器
		nightmare
			.goto(url)
			.wait("div.overmapWrap")
			.evaluate(() => document.querySelector('div.overmapWrap').innerHTML)
			.then(htmlStr => {
				let vhotels = getHotel(htmlStr);
				//console.log(vhotels);
				/*for(var j = 0; j < vhotels.length; j++){
					hotel.push(vhotels[j]);
				}
				*/
			})
			.catch(error =>{
				console.log(`fail to scrapy - ${error}`);
			})
	})


				
		
	
	