# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from lode_runner.dataprovider import dataprovider
from classes.util.scripts import SetScripts
from classes.util.scripts import GetScripts


class MarkerTest(MapsAPIBaseTest):

    @dataprovider([
        config.aut['local'] + u'/demo.html'
    ])
    def baloon_to_marker_test(self, url):
        """
        :param url: Адрес страницы
        Проверка появления маркера при закрытии балуна
        1.Кликаем в контрол закрытия балуна
        2.Проверяем видимость маркера
        """
        self.driver.get(url)
        self.page.map_container.wait_map_init()
        self.page.callout_crossed.wait_present()
        self.page.callout_crossed.close()
        self.assertTrue(self.page.marker.is_visible)

    @dataprovider([
        config.aut['local'] + u'/demo.html'
    ])
    def marker_to_baloon_test(self, url):
        """
        :param url: Адрес страницы
        Проверка появления балуна при клике в маркер
        1.Кликаем в контрол закрытия балуна
        2.Кликаем в маркер
        3.Проверяем наличие балуна
        """
        self.driver.get(url)
        self.page.map_container.wait_map_init()
        self.page.callout_crossed.wait_present()
        self.page.callout_crossed.close()
        self.page.marker.wait_present()
        self.page.marker.click()
        self.page.callout_crossed.wait_present()
        self.assertTrue(self.page.callout_crossed.is_visible)

    @dataprovider([
        config.aut['local'] + u'/dragableMarker.html'
    ])
    def drag_marker_test(self, url):
        """
        :param url: Адрес страницы
        Проверка изменения координат маркера
        1.Драгаем маркер на 10px вниз и вправо
        2.Проверяем значение абзацев с координатами
        """
        self.driver.get(url)
        self.page.map_container.wait_map_init()
        self.page.marker.drag_marker(10, 10)
        lat = self.page.marker.get_lat()
        lng = self.page.marker.get_lng()
        self.assertEqual(lat, '54.981')
        self.assertEqual(lng, '82.891')

    @dataprovider([
        config.aut['local'] + u'/markerLabels.html'
    ])
    def marker_static_label_test(self, url):
        """
        :param url: Адрес страницы
        Проверка наличия статического лэйбла у маркера
        1.Проверяем наличие лейбла у маркера
        """
        self.driver.get(url)
        self.page.map_container.wait_map_init()
        self.assertEqual(self.page.marker.get_labels()[0].text, u'static')

    @dataprovider([
        config.aut['local'] + u'/markerLabels.html'
    ])
    def marker_dynamic_label_test(self, url):
        """
        :param url: Адрес страницы
        Проверка наличия стандартного лейбла у маркера
        1.Наводим мышь на маркер
        2.Проверяем наличие лейбла
        """
        self.driver.get(url)
        self.page.map_container.wait_map_init()
        self.page.marker.hover_marker(1)
        text = self.page.marker.get_labels()[1].text
        self.assertEqual(text, u'default')

    @dataprovider([
        config.aut['local'] + u'/demo.html'
    ])
    def marker_programm_open_test(self, url):
        """
        :param url: Адрес страницы
        Проверка возможности програмного открытия маркеров
        1.Закрываем колаут
        2.Открываем его программно
        """
        self.driver.get(url)
        self.page.map_container.wait_map_init()
        self.page.callout_crossed.close()
        self.driver.execute_script(SetScripts.open_marker())
        self.assertTrue(self.page.callout_crossed.is_visible)

    @dataprovider([
        config.aut['local'] + u'/groupMarkerEvent.html'
    ])
    def marker_programm_open_test(self, url):
        """
        :param url: Адрес страницы
        Проверка обработки событиев у маркеров
        1.Кликаем в маркер 3
        2.Проверяем изменение координат карты
        """
        self.driver.get(url)
        self.page.map_container.wait_map_init()
        self.page.marker.click(2)
        center = self.driver.execute_script(GetScripts.getCenter)
        lat = '%.3f' % center['lat']
        lng = '%.3f' % center['lng']
        self.assertEqual(lat, self.page.marker.get_lat('marker3'))
        self.assertEqual(lng, self.page.marker.get_lng('marker3'))