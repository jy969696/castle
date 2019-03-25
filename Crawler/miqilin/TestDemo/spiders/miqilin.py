# -*- coding: utf-8 -*-
import scrapy
from scrapy import Request
from TestDemo.items import TestdemoItem

class MiqilinSpider(scrapy.Spider):
    name = 'miqilin'
    #allowed_domains = ['www.baidu.com']
    start_urls = ['https://restaurant.michelin.fr/restaurants-etoiles-france/']

    def parse(self, response):
        # 获取所有页数的url地址
        scrapy.Request(url='https://restaurant.michelin.fr/restaurants-etoiles-france/', callback=self.get_title)
        urls = response.xpath("/html/body/div[1]/div/div[3]/div/div[2]/div/div/div/div[2]/div/p/a")

        # for循环所有url
        for url in urls:
            if url.xpath('@href').extract_first():
                url = str(url.xpath('@href').extract_first())
                yield scrapy.Request(url, callback=self.get_title)

    def get_title(self, response):
        list = response.xpath(
            "//div[@class='content']/div[@class='field field--name-field-links field--type-link-field field--label-hidden']/div[@class='field__items']/div")
        for i_item in list:
            mi_title = TestdemoItem()
            mi_title['title'] = i_item.xpath(".//a/text()").extract_first()
            print(mi_title)
