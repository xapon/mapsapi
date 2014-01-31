## Класс DG.Map

{toc}

### Описание

DG.Map &mdash; основной класс API, используется для создания и управления картами на странице.

### Пример использования

Инициализация карты в элементе `div` с id "map", также указаны координаты центра карты и коэффициент масштабирования:

    var map = DG.map('map', {
        center: [54.98, 82.89],
        zoom: 13
    });

### Конструктор

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Использование</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>DG.Map</b>(
                <nobr>&lt;HTMLElement&nbsp;|&nbsp;String&gt; <i>id</i>,</nobr>
                <nobr>&lt;<a href="#опции">map options</a>&gt; <i>options?</i> )</nobr>
            </code></td>

            <td>
                <code>DG.map(&hellip;)</code>
            </td>

            <td>Инициализирует карту в переданном DOM элементе (также можно передать его id) с необязательным набором опций, которые описаны ниже.</td>
        </tr>
    </tbody>
</table>

### Опции

<table>
    <thead>
        <tr>
            <th>Опции</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>center</b></code></td>
            <td><code><a href="#latlng">LatLng</a></code></td>
            <td><code>null</code></td>
            <td>Начальный географический центр карты.</td>
        </tr>
        <tr>
            <td><code><b>zoom</b></code></td>
            <td><code>Number</code></td>
            <td><code>null</code></td>
            <td>Начальный уровень масштаба.</td>
        </tr>
        <tr>
            <td><code><b>layers</b></code></td>
            <td><code><a href="#ilayer">ILayer</a>[]</code></td>
            <td><code>null</code></td>
            <td>Слои, изначально добавленные на карту.</td>
        </tr>
        <tr id="map-maxbounds">
            <td><code><b>maxBounds</b></code></td>
            <td><code><a href="#latlngbounds">LatLngBounds</a></code></td>
            <td><code>null</code></td>
            <td>Если свойство установлено, карта ограничивает область просмотра согласно заданным географическим границам, "отбрасывая" пользователя назад, если он пытается выйти за пределы установленных границ, а также не позволяет уменьшить масштаб так, чтобы можно было просмотреть неразрешенные участки карты. Для установки ограничения динамически используйте метод <a href="#map-setmaxbounds">setMaxBounds</a>.</td>
        </tr>
    </tbody>
</table>

#### Опции взаимодействия

<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>dragging</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Разрешено ли перетаскивать карту мышкой.</td>
        </tr>
        <tr>
            <td><code><b>touchZoom</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Разрешено ли изменять масштаб карты двумя пальцами на тач-устройствах.</td>
        </tr>
        <tr>
            <td><code><b>scrollWheelZoom</b></code></td>
            <td><code>Boolean&nbsp;|&nbsp;String</code></td>
            <td><code>true&nbsp;|&nbsp;''</code></td>
            <td>Разрешено ли изменять масштаб карты колесиком мышки. Если передано значение `center`, карта всегда масштабируется в центр просматриваемой области, независимо от положения курсора.</td>
        </tr>
        <tr>
            <td><code><b>doubleClickZoom</b></code></td>
            <td><code>Boolean&nbsp;|&nbsp;String</code></td>
            <td><code>true&nbsp;|&nbsp;''</code></td>
            <td>Разрешено ли изменять масштаб карты двойным кликом мышки. Если передано значение `center`, карта всегда масштабируется в центр просматриваемой области, независимо от положения курсора.</td>
        </tr>
        <tr>
            <td><code><b>boxZoom</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Разрешено ли изменять масштаб карты, выделив прямоугольную область карты зажав клавишу shift.</td>
        </tr>
        <tr>
            <td><code><b>trackResize</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Обновляется ли карта при изменении размера окна браузера.</td>
        </tr>
        <tr>
            <td><code><b>worldCopyJump</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>false</code></td>
            <td>Опция позволяет зациклить просмотр карты с сохранением слоев и маркеров на ней.</td>
        </tr>
        <tr>
            <td><code><b>closePopupOnClick</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Закрывать ли балуны при клике в карту.</td>
        </tr>
        <tr>
            <td><code><b>bounceAtZoomLimits</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>false</code></td>
            <td>Опция позволяет установить анимацию восстановления карты при масштабировании пальцами на тач-устройствах на минимальных/максимальных уровнях масштаба.</td>
        </tr>
        <tr>
            <td><code><b>geoclicker</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Включено ли геокодирование по клику (геокликер). Если `true`, тогда при клике в любой объект карты (улицы, дома, остановки) будет отображаться информация об этом объекте.</td>
        </tr>
    </tbody>
</table>

#### Опции навигации клавишами

<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>keyboard</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Устанавливает фокус на карту и позволяет перемещаться по карте с помощью кнопок <code>+</code>/<code>-</code> и стрелок клавиатуры.</td>
        </tr>
        <tr>
            <td><code><b>keyboardPanOffset</b></code></td>
            <td><code>Number</code></td>
            <td><code>80</code></td>
            <td>Указывает, на сколько пикселей сдвинется карта при нажатии стрелки на клавиатуре.</td>
        </tr>
        <tr>
            <td><code><b>keyboardZoomOffset</b></code></td>
            <td><code>Number</code></td>
            <td><code>1</code></td>
            <td>Указывает, на сколько уровней изменится масштаб при нажатии на кнопки <code>+</code>/<code>-</code>.</td>
        </tr>
    </tbody>
</table>


#### Опции инерции карты

<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>inertia</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Если опция включена, тогда создается эффект инерции при движении карты &mdash; при перетаскивании карта продолжает движение в том же направлении какое-то время. Полезно для тач-устройств.</td>
        </tr>
        <tr>
            <td><code><b>inertiaDeceleration</b></code></td>
            <td><code>Number</code></td>
            <td><code>3000</code></td>
            <td>Величина, на которую замедляется движение карты, указывается в пикселях/секунду<sup>2</sup>.</td>
        </tr>
        <tr>
            <td><code><b>inertiaMaxSpeed</b></code></td>
            <td><code>Number</code></td>
            <td><code>1500</code></td>
            <td>Максимальная скорость инерционного движения, указывается в пикселях/секунду.</td>
        </tr>
        <tr>
            <td><code><b>inertiaThreshold</b></code></td>
            <td><code>Number</code></td>
            <td><code>depends</code></td>
            <td>Количество миллисекунд, которое должно пройти между остановкой движения карты и отпусканием кнопки мышки, для прекращения эффекта инерции. По умолчанию <code>32</code> для тач-устройств и <code>14</code> для остальных.</td>
        </tr>
    </tbody>
</table>


#### Опции элементов управления

<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>zoomControl</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Добавлен ли <a href="#control-zoom">элемент управления масштабом</a> на карту.</td>
        </tr>
        <tr>
            <td><code><b>fullscreenControl</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Добавлена ли <a href="#control-fullscreen">кнопка включения полноэкранного режима</a> на карту.</td>
        </tr>
    </tbody>
</table>

#### Опции анимации

<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>fadeAnimation</b></code></td>
            <td><code>Boolean</code></td>
            <td>depends</td>
            <td>Включена ли анимация затухания тайлов. По умолчанию включена во всех браузерах поддерживающих CSS3 transitions, кроме Android.</td>
        </tr>
        <tr>
            <td><code><b>zoomAnimation</b></code></td>
            <td><code>Boolean</code></td>
            <td>depends</td>
            <td>Включена ли анимация масштабирования тайлов. По умолчанию включена во всех браузерах поддерживающих CSS3 transitions, кроме Android.</td>
        </tr>
        <tr>
            <td><code><b>zoomAnimationThreshold</b></code></td>
            <td><code>Number</code></td>
            <td>4</td>
            <td>Порог, начиная с которого будет отключаться анимация масштабирования.</td>
        </tr>
        <tr>
            <td><code><b>markerZoomAnimation</b></code></td>
            <td><code>Boolean</code></td>
            <td>depends</td>
            <td>Включена ли анимация масштабирования маркеров при анимации масштабирования карты, если выключена, тогда маркеры пропадают во время анимации карты. По умолчанию включена во всех браузерах поддерживающих CSS3 transitions, кроме Android.</td>
        </tr>
    </tbody>
</table>


### События

Вы можете подписаться на следующие события, используя [эти методы](#):

<table>
    <thead>
        <tr>
            <th>События</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>click</b></code></td>
            <td><code><a href="#mouse-event">MouseEvent</a></code>
            <td>Вызывается при клике в карту.</td>
        </tr>
        <tr>
            <td><code><b>dblclick</b></code></td>
            <td><code><a href="#mouse-event">MouseEvent</a></code>
            <td>Вызывается при двойном клике в карту.</td>
        </tr>
        <tr>
            <td><code><b>mousedown</b></code></td>
            <td><code><a href="#mouse-event">MouseEvent</a></code>
            <td>Вызывается при нажатии кнопки мышки над областью карты.</td>
        </tr>
        <tr>
            <td><code><b>mouseup</b></code></td>
            <td><code><a href="#mouse-event">MouseEvent</a></code>
            <td>Вызывается когда пользователь отпускает кнопку мышки над областью карты.</td>
        </tr>
        <tr>
            <td><code><b>mouseover</b></code></td>
            <td><code><a href="#mouse-event">MouseEvent</a></code>
            <td>Вызывается при наведении курсора мышки на карту.</td>
        </tr>
        <tr>
            <td><code><b>mouseout</b></code></td>
            <td><code><a href="#mouse-event">MouseEvent</a></code>
            <td>Вызывается когда курсор мышки покидает область карты.</td>
        </tr>
        <tr>
            <td><code><b>mousemove</b></code></td>
            <td><code><a href="#mouse-event">MouseEvent</a></code>
            <td>Вызывается когда курсор мышки перемещается над картой.</td>
        </tr>
        <tr>
            <td><code><b>contextmenu</b></code></td>
            <td><code><a href="#mouse-event">MouseEvent</a></code>
            <td>Вызывается при нажатии правой кнопки мышки на карте, предотвращает появление стандартного контекстного меню браузера, если на это событие подписан обработчик.</td>
        </tr>
        <tr>
            <td><code><b>focus</b></code></td>
            <td><code><a href="#event">Event</a></code>
            <td>Вызывается при установке фокуса на карту (с помощью клавиши tab, либо при клике в карту или ее перетаскивании).</td>
        </tr>
        <tr>
            <td><code><b>blur</b></code></td>
            <td><code><a href="#event">Event</a></code>
            <td>Вызывается при потере фокуса картой.</td>
        </tr>
        <tr>
            <td><code><b>preclick</b></code></td>
            <td><code><a href="#mouse-event">MouseEvent</a></code>
            <td>Вызывается перед кликом мышки на карте (полезно, если нужно выполнить какое-либо действие до вызова обработчика клика).</td>
        </tr>
        <tr>
            <td><code><b>load</b></code></td>
            <td><code><a href="#event">Event</a></code>
            <td>Вызывается при инициализации карты (при первой установке ее центра и масштаба).</td>
        </tr>
        <tr id="map-viewreset">
            <td><code><b>viewreset</b></code></td>
            <td><code><a href="#event">Event</a></code>
            <td>Вызывается когда нужно перерисовать содержимое карты (обычно при изменении масштаба или загрузке).</td>
        </tr>
        <tr>
            <td><code><b>movestart</b></code></td>
            <td><code><a href="#event">Event</a></code>
            <td>Вызывается при начале изменения области просмотра карты (например, когда пользователь начинает перетаскивать карту).</td>
        </tr>
        <tr>
            <td><code><b>move</b></code></td>
            <td><code><a href="#event">Event</a></code>
            <td>Вызывается во время любого передвижения карты.</td>
        </tr>
        <tr id="map-moveend">
            <td><code><b>moveend</b></code></td>
            <td><code><a href="#event">Event</a></code>
            <td>Вызывается при окончании передвижения краты (например, когда пользователь прекращает перетаскивать карту).</td>
        </tr>
        <tr>
            <td><code><b>dragstart</b></code></td>
            <td><code><a href="#event">Event</a></code>
            <td>Вызывается когда пользователь начинает перетаскивать карту.</td>
        </tr>
        <tr>
            <td><code><b>drag</b></code></td>
            <td><code><a href="#event">Event</a></code>
            <td>Вызывается когда пользователь перетаскивает карту.</td>
        </tr>
        <tr>
            <td><code><b>dragend</b></code></td>
            <td><code><a href="#dragend-event">DragEndEvent</a></code>
            <td>Вызывается когда пользователь прекращает перетаскивать карту.</td>
        </tr>
        <tr>
            <td><code><b>zoomstart</b></code></td>
            <td><code><a href="#event">Event</a></code>
            <td>Вызывается в начале изменения масштаба (перед анимацией изменения масштаба).</td>
        </tr>
        <tr>
            <td><code><b>zoomend</b></code></td>
            <td><code><a href="#event">Event</a></code>
            <td>Вызывается после изменения масштаба.</td>
        </tr>
        <tr>
            <td><code><b>zoomlevelschange</b></code></td>
            <td><code><a href="#event">Event</a></code></td>
            <td>Вызывается, если при добавлении или удалении слоя карты изменилось количество доступных уровней масштабирования.</td>
        </tr>
        <tr>
            <td><code><b>resize</b></code></td>
            <td><code><a href="#resize-event">ResizeEvent</a></code></td>
            <td>Вызывается при изменении размера карты.</td>
        </tr>
        <tr>
            <td><code><b>requestfullscreen</b></code></td>
            <td><code><a href="#event">Event</a></code>
            <td>Вызывается при активации полноэкранного режима.</td>
        </tr>
        <tr>
            <td><code><b>cancelfullscreen</b></code></td>
            <td><code><a href="#event">Event</a></code>
            <td>Вызывается при выходе из полноэкранного режима.</td>
        </tr>
        <tr>
            <td><code><b>autopanstart</b></code></td>
            <td><code><a href="#event">Event</a></code>
            <td>Вызывается при автоматическом сдвиге карты после появления балуна.</td>
        </tr>
        <tr>
            <td><code><b>layeradd</b></code></td>
            <td><code><a href="#layer-event">LayerEvent</a></code>
            <td>Вызывается при добавлении нового слоя на карту.</td>
        </tr>
        <tr>
            <td><code><b>locationfound</b></code></td>
            <td><code><a href="#location-event">LocationEvent</a></code>
            <td>Вызывается при успешном обнаружении местоположения пользователя (используется метод <a href="#map-locate">locate</a>).</td>
        </tr>
        <tr>
            <td><code><b>locationerror</b></code></td>
            <td><code><a href="#error-event">ErrorEvent</a></code>
            <td>Вызывается при возникновении ошибок во время обнаружения местоположения пользователя.</td>
        </tr>
        <tr>
            <td><code><b>popupopen</b></code></td>
            <td><code><a href="#popup-event">PopupEvent</a></code>
            <td>Вызывается при открытии балуна (используя метод <code>openPopup</code>).</td>
        </tr>
        <tr>
            <td><code><b>popupclose</b></code></td>
            <td><code><a href="#popup-event">PopupEvent</a></code>
            <td>Вызывается при закрытии балуна (используя метод <code>closePopup</code>).</td>
        </tr>
        <tr>
            <td><code><b>entranceshow</b></code></td>
            <td><code><a href="#event">EntranceEvent</a></code>
            <td>Вызывается при отображении входа в здание.</td>
        </tr>
        <tr>
            <td><code><b>entrancehide</b></code></td>
            <td><code><a href="#event">EntranceEvent</a></code>
            <td>Вызывается при скрытии входа в здание.</td>
        </tr>
        <tr>
            <td><code><b>poihover</b></code></td>
            <td><code><a href="#event">PoiEvent</a></code>
            <td>Вызывается при наведении курсора мышки на POI.</td>
        </tr>
        <tr>
            <td><code><b>poileave</b></code></td>
            <td><code><a href="#event">PoiEvent</a></code>
            <td>Вызывается когда курсор мышки покидает область POI.</td>
        </tr>
    </tbody>
</table>

### Методы изменения состояния карты

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>setView</b>(
                <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>center</i>,</nobr>
                <nobr>&lt;Number&gt; <i>zoom?</i>,</nobr>
                <nobr>&lt;<a href="#опции-масштабирования-и-перемещения">zoom/pan options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Устанавливает область просмотра карты (географический центр и масштаб). Дополнительно можно указать опции анимации.</td>
        </tr>
        <tr>
            <td><code><b>setZoom</b>(
                <nobr>&lt;Number&gt; <i>zoom</i></nobr>,
                <nobr>&lt;<a href="#опции-масштабирования">zoom options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Устанавливает уровень масштаба.</td>
        </tr>
        <tr>
            <td><code><b>zoomIn</b>(
                <nobr>&lt;Number&gt; <em>delta?</em></nobr>,
                <nobr>&lt;<a href="#опции-масштабирования">zoom options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Увеличивает масштаб карты на величину <code>delta</code> (по умолчанию <code>1</code>).</td>
        </tr>
        <tr>
            <td><code><b>zoomOut</b>(
                <nobr>&lt;Number&gt; <em>delta?</em></nobr>,
                <nobr>&lt;<a href="#опции-масштабирования">zoom options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Уменьшает масштаб карты на величину <code>delta</code> (по умолчанию <code>1</code>).</td>
        </tr>
        <tr>
            <td><code><b>setZoomAround</b>(
                <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i>, </nobr>
                <nobr>&lt;Number&gt; <i>zoom</i></nobr>,
                <nobr>&lt;<a href="#опции-масштабирования">zoom options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Масштабирует карту, сохраняя при этом указанную точку в области видимости (например, используется для масштабировании при помощи колесика мышки и двойного клика).</td>
        </tr>
        <tr id="map-fitbounds">
            <td><code><b>fitBounds</b>(
                <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
                <nobr>&lt;<a href="#опции-соответствия-границам">fitBounds options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Устанавливает область просмотра карты так, чтобы она содержала заданные границы на максимально возможном уровне масштаба.</td>
        </tr>
        <tr>
            <td><code><b>fitWorld</b>(
                <nobr>&lt;<a href="#опции-соответствия-границам">fitBounds options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Устанавливает область просмотра карты так, чтобы та отображала весь мир на максимально возможном уровне масштаба.</td>
        </tr>
        <tr>
            <td><code><b>panTo</b>(
                <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                <nobr>&lt;<a href="#опции-перемещения">pan options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Перемещает карту в указанный центр. Передвижение анимируется, если центр находится на расстоянии не более одного экрана относительно текущего.</td>
        </tr>
        <tr id="map-paninsidebounds">
            <td><code><b>panInsideBounds</b>(
                <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
                <nobr>&lt;<a href="#опции-перемещения">pan options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Перемещает карту в ближайшую область просмотра, лежащую в пределах заданных границ. Можно контролировать анимацию, передав объект опций вторым параметром.</td>
        </tr>
        <tr>
            <td><code><b>panBy</b>(
                <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i></nobr>,
                <nobr>&lt;<a href="#опции-перемещения">pan options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Перемещает карту на заданное колличетво пикселей (анимируется).</td>
        </tr>
        <tr>
            <td><code><b>invalidateSize</b>(
                <nobr>&lt;Boolean&gt; <i>animate?</i></nobr>,
                <nobr>&lt;<a href="#опции-масштабирования-и-перемещения">zoom/pan options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Обновляет карту при изменении размера ее контейнера. Этот метод необходимо вызывать если размер контейнера изменяется динамически. Если параметр <code>animate</code> установлен в <code>true</code>, тогда обновление карты анимируется.</td>
        </tr>
        <tr id="map-setmaxbounds">
            <td><code><b>setMaxBounds</b>(
                <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Ограничивает область просмотра карты заданными границами (см. опцию <a href="#map-maxbounds">maxBounds</a>).</td>
        </tr>
        <tr id="map-locate">
            <td><code><b>locate</b>(
                <nobr>&lt;<a href="#опции-определения-местоположения">locate options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Пытается определить местоположение пользователя используя <a href="https://en.wikipedia.org/wiki/W3C_Geolocation_API" target="_blank">Geolocation API</a>. При успешном определении вызывается событие <code>locationfound</code> с данными о местоположении, в случае ошибки будет вызвано событие <code>locationerror</code>. Опционально устанавливает область просмотра карты согласно местоположению пользователя (или отображает карту мира, если возникла ошибка геолокации). Для дополнительной информации см. <a href="#опции-определения-местоположения">опции определения местоположения</a>.</td>
        </tr>
        <tr>
            <td><code><b>stopLocate</b>()</code></td>
            <td><code>this</code></td>
            <td>Останавливает отслеживание местоположения, предварительно инициированное методом <code><b>map.locate</b>({watch: true})</code>.</td>
        </tr>
        <tr id="map-remove">
            <td><code><b>remove</b>()</code></td>
            <td><code>this</code></td>
            <td>Удаляет карту и очищает все связанные с ней обработчики событий.</td>
        </tr>
    </tbody>
</table>

### Методы получения состояния карты

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>getCenter</b>()</code></td>
            <td><code><a href="#latlng">LatLng</a></code></td>
            <td>Возвращает географический центр области просмотра карты.</td>
        </tr>
        <tr>
            <td><code><b>getZoom</b>()</code></td>
            <td><code>Number</code></td>
            <td>Возвращает текущий уровень масштабирования.</td>
        </tr>
        <tr>
            <td><code><b>getMinZoom</b>()</code></td>
            <td><code>Number</code></td>
            <td>Возвращает минимальный уровень масштабирования.</td>
        </tr>
        <tr>
            <td><code><b>getMaxZoom</b>()</code></td>
            <td><code>Number</code></td>
            <td>Возвращает максимальный уровень масштабирования.</td>
        </tr>
        <tr>
            <td><code><b>getBounds</b>()</code></td>
            <td><code><a href="#latlngbounds">LatLngBounds</a></code></td>
            <td>Возвращает географические прямоугольные границы текущей области просмотра карты.</td>
        </tr>
        <tr>
            <td><code><b>getBoundsZoom</b>(
                <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>inside?</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>

            <td>Возвращает максимальный уровень масштабирования, при котором заданные границы полностью входят в область просмотра. Если опция <code>inside</code> установлена в <code>true</code>, тогда метод возвращает минимальный уровень зума с теми же условиями.</td>
        </tr>
        <tr>
            <td><code><b>getSize</b>()</code></td>
            <td><code><a href="#point">Point</a></code></td>
            <td>Возвращает текущий размер контейнера карты.</td>
        </tr>
        <tr>
            <td><code><b>getPixelBounds</b>()</code></td>
            <td><code>Bounds</code></td>
            <td>Возвращает пиксельные прямоугольные границы области просмотра карты.</td>
        </tr>
        <tr>
            <td><code><b>getPixelOrigin</b>()</code></td>
            <td><code><a href="#point">Point</a></code></td>
            <td>Возвращает пиксельные координаты левой верхней точки слоя карты.</td>
        </tr>
    </tbody>
</table>

### Методы слоев и элементов управления

<table>
    <thead>
            <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="map-addlayer">
            <td><code><b>addLayer</b>(
                <nobr>&lt;<a href="#ilayer">ILayer</a>&gt; <i>layer</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>insertAtTheBottom?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет слой на карту. Если опция <code>insertAtTheBottom</code> установлена в <code>true</code>, тогда слой добавляется под всеми остальными.</td>
        </tr>
        <tr>
            <td><code><b>removeLayer</b>(
                <nobr>&lt;<a href="#ilayer">ILayer</a>&gt; <i>layer</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Удаляет переданные слои с карты.</td>
        </tr>
        <tr>
            <td><code><b>hasLayer</b>(
                <nobr>&lt;<a href="#ilayer">ILayer</a>&gt; <i>layer</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если слой на данный момент добавлен на карту.</td>
        </tr>
        <tr>
            <td><code><b>getLayer</b>(
                <nobr>&lt;String&gt;)</nobr>
            </code></td>

            <td><code><a href="#ilayer">&lt;ILayer</a>&gt; <i>layer</i></code></td>
            <td>Возвращает cлой по заданному идентификатору. Для слоя можно указать свой идентификатор, задав ему значение options.uid.</td>
        </tr>
        <tr id="map-openpopup">
            <td><code><b>openPopup</b>(
                <nobr>&lt;<a href="#popup">Popup</a>&gt; <i>popup</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Показывает переданный балун, предварительно закрыв все открытые.</td>
        </tr>
        <tr id="map-openpopup2">
            <td><code><b>openPopup</b>(
                <nobr>&lt;String&gt; <i>html</i> </nobr> | <nobr>&lt;HTMLElement&gt; <i>el</i>,
                <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                <nobr>&lt;<a href="#popup-options">Popup options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Создает балун с переданными опциями и открывает его в определенной точке на карте.</td>
        </tr>
        <tr id="map-closepopup">
            <td><code><b>closePopup</b>(
                <nobr>&lt;<a href="#popup">Popup</a>&gt; <i>popup?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Закрывает балун, открытый с помощью <a href="#map-openpopup">openPopup</a>.</td>
        </tr>
        <tr id="map-addcontrol">
            <td><code><b>addControl</b>(
                <nobr>&lt;<a href="#icontrol">IControl</a>&gt; <i>control</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет элемент управления на карту.</td>
        </tr>
        <tr>
            <td><code><b>removeControl</b>(
                <nobr>&lt;<a href="#icontrol">IControl</a>&gt; <i>control</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Удаляет элемент управления с карты.</td>
        </tr>
    </tbody>
</table>

### Методы преобразования

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </tbody>
    <thead>
        <tr>
            <td><code><b>latLngToLayerPoint</b>(
                <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
            </code></td>

            <td><code><a href="#point">Point</a></code></td>
            <td>Возвращает точку на карте, соответствующую переданным географическим координатам (удобно при размещении дополнительных слоев на карте).</td>
        </tr>
        <tr>
            <td><code><b>layerPointToLatLng</b>(
                <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
            </code></td>

            <td><code><a href="#latlng">LatLng</a></code></td>
            <td>Возвращает географические координаты, соответствующие переданной точке на карте.</td>
        </tr>
        <tr>
            <td><code><b>containerPointToLayerPoint</b>(
                <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
            </code></td>

            <td><code><a href="#point">Point</a></code></td>
            <td>Конвертирует точку контейнера карты в точку слоя карты.</td>
        </tr>
        <tr>
            <td><code><b>layerPointToContainerPoint</b>(
                <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
            </code></td>

            <td><code><a href="#point">Point</a></code></td>
            <td>Конвертирует точку слоя карты в точку контейнера карты.</td>
        </tr>
        <tr>
            <td><code><b>latLngToContainerPoint</b>(
                <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
            </code></td>

            <td><code><a href="#point">Point</a></code></td>
            <td>Возвращает точку контейнера карты, соответствующую географическим координатам.</td>
        </tr>
        <tr>
            <td><code><b>containerPointToLatLng</b>(
                <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
            </code></td>

            <td><code><a href="#latlng">LatLng</a></code></td>
            <td>Возвращает географические координаты, соответствующие переданной точке контейнера.</td>
        </tr>
        <tr>
            <td><code><b>project</b>(
                <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i>,</nobr>
                <nobr>&lt;Number&gt; <i>zoom?</i> )</nobr>
            </code></td>

            <td><code><a href="#point">Point</a></code></td>
            <td>Проецирует географические координаты в пиксельные для переданного уровня масштаба (по умолчанию текущий уровень).</td>
        </tr>
        <tr>
            <td><code><b>unproject</b>(
                <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i>,</nobr>
                <nobr>&lt;Number&gt; <i>zoom?</i> )</nobr>
            </code></td>

            <td><code><a href="#latlng">LatLng</a></code></td>
            <td>Проецирует пиксельные координаты в географические для переданного уровня масштаба (по умолчанию текущий уровень).</td>
        </tr>
        <tr>
            <td><code><b>mouseEventToContainerPoint</b>(
                <nobr>&lt;MouseEvent&gt; <i>event</i> )</nobr>
            </code></td>

            <td><code><a href="#point">Point</a></code></td>
            <td>Возвращает пиксельные координаты мышки относительно левого верхнего угла контейнера карты, на основе переданного объекта <code>event</code>.</td>
        </tr>
        <tr>
            <td><code><b>mouseEventToLayerPoint</b>(
                <nobr>&lt;MouseEvent&gt; <i>event</i> )</nobr>
            </code></td>

            <td><code><a href="#point">Point</a></code></td>
            <td>Возвращает пиксельные координаты мышки относительно слоя, на основе переданного объекта <code>event</code>.
        </tr>
        <tr>
            <td><code><b>mouseEventToLatLng</b>(
                <nobr>&lt;MouseEvent&gt; <i>event</i> )</nobr>
            </code></td>

            <td><code><a href="#latlng">LatLng</a></code></td>
            <td>Возвращает географические координаты мышки, на основе переданного объекта <code>event</code>.</td>
        </tr>
    </tbody>
</table>

### Другие методы

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>getContainer</b>()</code></td>
            <td><code>HTMLElement</code></td>
            <td>Возвращает контейнер карты.</td>
        </tr>
        <tr id="map-getpanes">
            <td><code><b>getPanes</b>()</code></td>
            <td><code><a href="#панели-карты">MapPanes</a></code></td>
            <td>Возвращает объект с панелями карты (для отрисовки дополнительных слоев).</td>
        </tr>
        <tr id="map-whenready">
            <td><code><b>whenReady</b>(
                <nobr>&lt;Function&gt; <i>fn</i></nobr>,
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr></code></td>
            <td><code>this</code></td>
            <td>Выполняет функцию <code>fn</code> после инициализации карты или сразу, если она была инициализирована ранее. Опционально можно передать контекст выполнения.</td>
        </tr>
    </tbody>
</table>

### Опции определения местоположения

<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>watch</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>false</code></td>
            <td>Если <code>true</code>, тогда постоянно отслеживает изменения местоположения (вместо определения местоположения один раз) используя W3C метод <code>watchPosition</code>. Можно остановить отслеживание вызвав метод <code><b>map.stopLocate</b>()</code>.</td>
        </tr>
        <tr>
            <td><code><b>setView</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>false</code></td>
            <td>Если <code>true</code>, тогда автоматически устанавливает область просмотра карты в точку местоположения пользователя в соответствии с точностью определения. В случае ошибки поиска отображаетcя карта мира.</td>
        </tr>
        <tr>
            <td><code><b>maxZoom</b></code></td>
            <td><code>Number</code></td>
            <td><code>Infinity</code></td>
            <td>Задает максимальный уровень масштабирования при автоматическом перемещения карты (если включена опция <code>setView</code>).</td>
        </tr>
        <tr>
            <td><code><b>timeout</b></code></td>
            <td><code>Number</code></td>
            <td><code>10000</code></td>
            <td>Количество миллисекунд ожидания ответа геолокации перед тем как вызовется событие <code>locationerror</code>.</td>
        </tr>
        <tr>
            <td><code><b>maximumAge</b></code></td>
            <td><code>Number</code></td>
            <td><code>0</code></td>
            <td>Максимальное время жизни данных местоположения. Если с момента последнего поиска прошло меньше времени, чем указанно в данной опции, данные будут получены из кэша.</td>
        </tr>
        <tr>
            <td><code><b>enableHighAccuracy</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>false</code></td>
            <td>Включает функцию повышения точности, см. <a target="_blank" href="http://dev.w3.org/geo/api/spec-source.html#high-accuracy">описание в W3C спецификации</a>.</td>
        </tr>
    </tbody>
</table>

### Опции масштабирования и перемещения

<table data-id='map'>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>reset</b></code></td>
            <td><code>Boolean</code></td>
            <td><code><span class="literal">false</span></code></td>
            <td>Если <code>true</code>, тогда область просмотра карты будет сброшена без каких-либо анимаций.</td>
        </tr>
        <tr>
            <td><code><b>pan</b></code></td>
            <td><code><a href="#опции-перемещения">pan options</a></code></td>
            <td><code>-</code></td>
            <td>Опции перемещения.</td>
        </tr>
        <tr>
            <td><code><b>zoom</b></code></td>
            <td><code><a href="#опции-масштабирования">zoom options</a></code></td>
            <td><code>-</code></td>
            <td>Опции масштабирования.</td>
        </tr>
        <tr>
            <td><code><b>animate</b></code></td>
            <td><code>Boolean</code></td>
            <td><code><span class="literal">-</span></code></td>
            <td>Эквивалентно передаче <code>animate</code> и для опций масштабирования и для опций перемещения.</td>
        </tr>
    </tbody>
</table>

### Опции перемещения

<table data-id='map'>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>animate</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>-</code></td>
            <td>Если <code>true</code>, тогда перемещение будет всегда анимироваться, если это возможно, в противном случае анимация не будет осуществляться.</td>
        </tr>
        <tr>
            <td><code><b>duration</b></code></td>
            <td><code>Number</code></td>
            <td><code><span class="number">0.25</span></code></td>
            <td>Продолжительность анимации перемещения.</td>
        </tr>
        <tr>
            <td><code><b>easeLinearity</b></code></td>
            <td><code>Number</code></td>
            <td><code>0.25</code></td>
            <td>Уровень искривления затухания анимации (третий параметр <a target="_blank" href="http://cubic-bezier.com/">Кривой Безье</a>). Значение 1.0 означает линейную анимацию.</td>
        </tr>
        <tr>
            <td><code><b>noMoveStart</b></code></td>
            <td><code>Boolean</code></td>
            <td><code><span class="literal">false</span></code></td>
            <td>Если <code>true</code>, тогда при перемещении не будет инициироваться событие <code>movestart</code>.</td>
        </tr>
    </tbody>
</table>

### Опции масштабирования

<table data-id='map'>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>animate</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>-</code></td>
            <td>Если не указано, тогда масштабирование будет анимироваться в пределах просматриваемой области карты. Если <code>true</code>, тогда всегда будет произведена попытка анимировать масштабирование, вне зависимости от положения источника масштабирования. Если <code>false</code>, тогда масштабирование будет происходить без анимации.</td>
        </tr>
    </tbody>
</table>

### Опции соответствия границам

<p>То же самое, что в <a href="#опции-масштабирования-и-перемещения">опциях масштабирования и перемещения</a> и дополнительно:</p>

<table data-id='map'>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>paddingTopLeft</b></code></td>
            <td><code><a href="#point">Point</a></code></td>
            <td><code><nobr>[<span class="number">0</span>, <span class="number">0</span>]</nobr>
            <td>Задает отступ от верхнего левого угла контейнера карты, который не должен учитываться при подстройке центра и масштаба. Удобно использовать, например, если на карте приложения имеется левая панель и вы не хотите, чтобы при масштабировании под ней скрывались объекты.</td>
        </tr>
        <tr>
            <td><code><b>paddingBottomRight</b></code></td>
            <td><code><a href="#point">Point</a></code></td>
            <td><code><nobr>[<span class="number">0</span>, <span class="number">0</span>]</nobr>
            <td>То же самое, но для нижнего правого угла карты.</td>
        </tr>
        <tr>
            <td><code><b>padding</b></code></td>
            <td><code><a href="#point">Point</a></code></td>
            <td><code><nobr>[<span class="number">0</span>, <span class="number">0</span>]</nobr>
            <td>Эквивалентно установке и верхнего левого и нижнего правого отступов в одинаковые значения.</td>
        </tr>
        <tr>
            <td><code><b>maxZoom</b></code></td>
            <td><code>Number</code></td>
            <td><code><nobr>null</nobr>
            <td>Максимальный уровень зума.</td>
        </tr>
    </tbody>
</table>

### Свойства

Свойства карты включают в себя обработчики взаимодействия, которые позволяют контролировать интерактивное поведение, подключение и отключение определенных возможностей карты, таких как масштабирование и тач-события (см. методы [IHandler](#)). Например:

    map.doubleClickZoom.disable();

Вы также можете получить доступ к элементам управления картой, которые включены по умолчанию, например, к элементу управления масштабом:

    map.zoomControl.setPosition('topright');

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>dragging</b></code></td>
            <td><a href="#ihandler"><code>IHandler</code></a></td>
            <td>Обработчик перетаскивания карты (мышкой и тачем).</td>
        </tr>
        <tr>
            <td><code><b>touchZoom</b></code></td>
            <td><a href="#ihandler"><code>IHandler</code></a></td>
            <td>Обработчик тач-масштабирования.</td>
        </tr>
        <tr>
            <td><code><b>doubleClickZoom</b></code></td>
            <td><a href="#ihandler"><code>IHandler</code></a></td>
            <td>Обработчик масштабирования по двойному клику.</td>
        </tr>
        <tr>
            <td><code><b>scrollWheelZoom</b></code></td>
            <td><a href="#ihandler"><code>IHandler</code></a></td>
            <td>Обработчик масштабирования по скроллу.</td>
        </tr>
        <tr>
            <td><code><b>boxZoom</b></code></td>
            <td><a href="#ihandler"><code>IHandler</code></a></td>
            <td>Обработчик box-масштабирования (shift + выделение мышкой).</td>
        </tr>
        <tr>
            <td><code><b>keyboard</b></code></td>
            <td><a href="#ihandler"><code>IHandler</code></a></td>
            <td>Обработчик навигации с помощью клавиатуры.</td>
        </tr>
        <tr>
            <td><code><b>geoclicker</b></code></td>
            <td><a href="#ihandler"><code>IHandler</code></a></td>
            <td>Обработчик геокодирования по клику.</td>
        </tr>
        <tr>
            <td><code><b>zoomControl</b></code></td>
            <td><a href="#control-zoom"><code>Control.Zoom</code></a></td>
            <td>Элемент управления масштабом.</td>
        </tr>
        <tr>
            <td><code><b>fullscreenControl</b></code></td>
            <td><a href="#control-fullscreen"><code>Control.FullScreen</code></a></td>
            <td>Кнопка включения полноэкранного режима.</td>
        </tr>
    </tbody>
</table>

### Панели карты

Объект (возвращаемый методом [getPanes](#map-getpanes)) содержит панели карты, которые можно использовать для собственных слоев. Основное различие панелей в параметре `zIndex`, определяющем порядок наложения.
<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>mapPane</b></code></td>
            <td><code>HTMLElement</code></td>
            <td>Панель, содержащая все другие панели карты.</td>
        </tr>
        <tr>
            <td><code><b>tilePane</b></code></td>
            <td><code>HTMLElement</code></td>
            <td>Панель слоя тайлов.</td>
        </tr>
        <tr>
            <td><code><b>objectsPane</b></code></td>
            <td><code>HTMLElement</code></td>
            <td>Панель, содержащая все панели, кроме тайловой.</td>
        </tr>
        <tr>
            <td><code><b>shadowPane</b></code></td>
            <td><code>HTMLElement</code></td>
            <td>Панель для наложения теней.</td>
        </tr>
        <tr>
            <td><code><b>overlayPane</b></code></td>
            <td><code>HTMLElement</code></td>
            <td>Панель геометрий, таких как ломаные и многоугольники.</td>
        </tr>
        <tr>
            <td><code><b>markerPane</b></code></td>
            <td><code>HTMLElement</code></td>
            <td>Панель маркеров.</td>
        </tr>
        <tr>
            <td><code><b>popupPane</b></code></td>
            <td><code>HTMLElement</code></td>
            <td>Панель балунов.</td>
        </tr>
    </tbody>
</table>