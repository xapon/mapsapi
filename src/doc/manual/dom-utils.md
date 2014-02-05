## Работа с DOM

{toc}

### Класс DG.DomEvent

Класс для работы с DOM событиями.

#### Методы

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
            <td><code><b>addListener</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
                <nobr>&lt;String&gt; <i>type</i></nobr>,
                <nobr>&lt;Function&gt; <i>fn</i></nobr>,
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Подписывает обработчик <code>fn</code> на DOM событие определенного типа. Ключевое слово <code>this</code> внутри обработчика будет указывать на <code>context</code>, или на элемент на котором произошло событие, если контекст не задан.</td>
        </tr>
        <tr>
            <td><code><b>removeListener</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
                <nobr>&lt;String&gt; <i>type</i></nobr>,
                <nobr>&lt;Function&gt; <i>fn</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Отписывает ранее подписанный обработчик.</td>
        </tr>
        <tr>
            <td><code><b>stopPropagation</b>(
                <nobr>&lt;DOMEvent&gt; <i>e</i> )</nobr>
            </code></td>

            <td><code><span class="keyword">this</span></code></td>
            <td>Останавливает всплытие события к родительским элементам. Используется внутри функции-обработчика:
                <code>DG.DomEvent.addListener(div, 'click', function (e) {
                    DG.DomEvent.stopPropagation(e);
                });</code>
            </td>
        </tr>
        <tr>
            <td><code><b>preventDefault</b>(
                <nobr>&lt;DOMEvent&gt; <i>e</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Предотвращает поведение DOM элемента по умолчанию (например, переход по ссылке указанной в свойстве <code>href</code> элемента <code>a</code>). Используется внутри функции-обработчика.</td>
        </tr>
        <tr>
            <td><code><b>stop</b>(
                <nobr>&lt;DOMEvent&gt; <i>e</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Вызывает одновременно <code>stopPropagation</code> и <code>preventDefault</code>.</td>
        </tr>
        <tr>
            <td><code><b>disableClickPropagation</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет <code>stopPropagation</code> к DOM элементу для событий <code>'click'</code>, <code>'doubleclick'</code>, <code>'mousedown'</code> и <code>'touchstart'</code>.</td>
        </tr>
        <tr>
            <td><code><b>getMousePosition</b>(
                <nobr>&lt;DOMEvent&gt; <i>e</i></nobr>,
                <nobr>&lt;HTMLElement&gt; <i>container?</i> )</nobr>
            </code></td>

            <td><code><a href="/doc/2.0/maps/manual/base-classes#класс-dgpoint">Point</a></code></td>
            <td>Возвращает позицию мышки из DOM события относительно контейнера или относительно всей страницы, если контейнер не указан.</td>
        </tr>
        <tr>
            <td><code><b>getWheelDelta</b>(
                <nobr>&lt;DOMEvent&gt; <i>e</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Возвращает дельту колесика мышки из DOM события <code>mousewheel</code>.</td>
        </tr>
    </tbody>
</table>

### Класс DG.DomUtil

Класс для работы с DOM деревом.

#### Методы

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
            <td><code><b>get</b><nobr>(
                &lt;String или HTMLElement&gt; <i>id</i> )</nobr>
            </code></td>
            <td><code>HTMLElement</code></td>
            <td>Возвращает элемент по его id, если параметром была передана строка, либо возвращает тот же элемент, если он был передан в качестве параметра.</td>
        </tr>
        <tr>
            <td><code><b>getStyle</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
                <nobr>&lt;String&gt; <i>style</i> )</nobr>
            </code></td>

            <td><code>String</code></td>
            <td>Возвращает значение стиля элемента, включая рассчитанные значения или значения указанные с помощью CSS.</td>
        </tr>
        <tr>
            <td><code><b>getViewportOffset</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
            </code></td>

            <td><a href="/doc/2.0/maps/manual/base-classes#класс-dgpoint"><code>Point</code></a></td>
            <td>Возвращает смещение элемента относительно области просмотра (viewport-а).</td>
        </tr>
        <tr>
            <td><code><b>create</b>(
                <nobr>&lt;String&gt; <i>tagName</i></nobr>,
                <nobr>&lt;String&gt; <i>className</i></nobr>,
                <nobr>&lt;HTMLElement&gt; <i>container?</i> )</nobr>
            </code></td>
            <td><code>HTMLElement</code></td>
            <td>Создает элемент <code>tagName</code>, устанавливает ему значение класса <code>className</code> и опционально добавляет его в элемент <code>container</code>.</td>
        </tr>
        <tr>
            <td><code><b>disableTextSelection</b>()</code></td>
            <td>-</td>
            <td>Отключает возможность выделения текста, например, во время перетаскивания.</td>
        </tr>
        <tr>
            <td><code><b>enableTextSelection</b>()</code></td>
            <td>-</td>
            <td>Включает возможность выделения текста.</td>
        </tr>
        <tr>
            <td><code><b>hasClass</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
                <nobr>&lt;String&gt; <i>name</i> )</nobr>
            </code></td>
            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если элемент содержит класс <code>name</code>.</td>
        </tr>
        <tr>
            <td><code><b>addClass</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
                <nobr>&lt;String&gt; <i>name</i> )</nobr>
            </code></td>
            <td>-</td>
            <td>Добавляет класс <code>name</code> к элементу.</td>
        </tr>
        <tr>
            <td><code><b>removeClass</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
                <nobr>&lt;String&gt; <i>name</i> )</nobr>
            </code></td>
            <td>-</td>
            <td>Удаляет класс <code>name</code> из элемента.</td>
        </tr>
        <tr>
            <td><code><b>setOpacity</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
                <nobr>&lt;Number&gt; <i>value</i> )</nobr>
            </code></td>
            <td>-</td>
            <td>Устанавливает прозрачность элемента (включая поддержку старых IE). Значение должно быть от <code>0</code> до <code>1</code>.</td>
        </tr>
        <tr>
            <td><code><b>testProp</b>(
                <nobr>&lt;String[]&gt; <i>props</i> )</nobr>
            </code></td>
            <td><code>String</code> или <code><span class="literal">false</span></code></td>
            <td>Обходит массив названий стилей и возвращает первое имя, которое является корректным для текущего браузера. Если такого нет, тогда будет возвращено <code>false</code>. Удобно для стилей с префиксами производителей браузеров, например <code>transform</code>.</td>
        </tr>
        <tr>
            <td><code><b>getTranslateString</b>(
                <nobr>&lt;<a href="/doc/2.0/maps/manual/base-classes#класс-dgpoint">Point</a>&gt; <i>point</i> )</nobr>
            </code></td>
            <td><code>String</code></td>
            <td>Возвращает CSS строку трансформации для смещения элемента. Использует 3D трансформацию для браузеров на основе WebKit с поддержкой аппаратного ускорения и 2D для других браузеров.</td>
        </tr>
        <tr>
            <td><code><b>getScaleString</b>(
                <nobr>&lt;Number&gt; <i>scale</i></nobr>,
                <nobr>&lt;<a href="/doc/2.0/maps/manual/base-classes#класс-dgpoint">Point</a>&gt; <i>origin</i> )</nobr>
            </code></td>
            <td><code>String</code></td>
            <td>Возвращает CSS строку трансформации для масштабирования элемента.</td>
        </tr>
        <tr id="domutil-setposition">
            <td><code><b>setPosition</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
                <nobr>&lt;<a href="/doc/2.0/maps/manual/base-classes#класс-dgpoint">Point</a>&gt; <i>point</i></nobr>,
                <nobr>&lt;Boolean&gt; <i>disable3D?</i> )</nobr>
            </code></td>
            <td>-</td>
            <td>Устанавливает позицию элемента в координаты <code>point</code>, используя CSS translate или свойства <code>top</code> и <code>left</code>, в зависимости от браузера. Принудительно использует позиционирование с помощью <code>top</code> и <code>left</code>, если <code>disable3D</code> установлено в <code>true</code>.</td>
        </tr>
        <tr>
            <td><code><b>getPosition</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
            </code></td>
            <td><a href="/doc/2.0/maps/manual/base-classes#класс-dgpoint">Point</a></td>
            <td>Возвращает координаты элемента, который ранее был спозиционирован с помощью метода <code>setPosition</code>.</td>
        </tr>
    </tbody>
</table>

#### Свойства

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
            <td><code><b>TRANSITION</b></nobr>
            </code></td>
            <td><code>String</code></td>
            <td>Название CSS свойства transition с учетом префикса производителя браузера (например, <code>'webkitTransition'</code> для WebKit).</td>
        </tr>
        <tr>
            <td><code><b>TRANSFORM</b></nobr>
            </code></td>
            <td><code>String</code></td>
            <td>Название CSS свойства transform с учетом префикса производителя браузера.</td>
        </tr>
    </tbody>
</table>

### Класс DG.PosAnimation

Используется для плавного перемещения элементов, использует CSS3 transitions для современных браузеров и таймер для IE6-9\.

    var fx = new DG.PosAnimation();
    fx.run(el, [300, 500], 0.5);

#### Конструктор

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
            <td><code><b>DG.PosAnimation</b>()</code></td>
            <td><code>new DG.PosAnimation()</code></td>
            <td>Создает объект PosAnimation.</td>
        </tr>
    </tbody>
</table>

#### Методы

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
            <td><code><b>run</b>(
                <nobr>&lt;HTMLElement&gt; <i>element</i>,</nobr>
                <nobr>&lt;<a href="/doc/2.0/maps/manual/base-classes#класс-dgpoint">Point</a>&gt; <i>newPos</i></nobr>,
                <nobr>&lt;Number&gt; <i>duration?</i></nobr>,
                <nobr>&lt;Number&gt; <i>easeLinearity?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Запускает анимацию переданного элемента, смещая его в новую позицию, опционально задается продолжительность в секундах (по умолчанию <code>0.25</code>) и функция затухания (третий аргумент <a target="_blank" href="http://cubic-bezier.com/#0,0,.5,1">кубической кривой Безье</a>, по умолчанию <code>0.5</code>).</td>
        </tr>
    </tbody>
</table>

#### События

Вы можете подписаться на следующие события используя [эти методы](/doc/2.0/maps/manual/events#методы-управления-событиями):

<table>
    <thead>
        <tr>
            <th>Событие</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>start</b></code></td>
            <td><code><a href="/doc/2.0/maps/manual/events#event">Event</a></code>
            <td>Вызывается во время старта анимации.</td>
        </tr>
        <tr>
            <td><code><b>step</b></code></td>
            <td><code><a href="/doc/2.0/maps/manual/events#event">Event</a></code>
            <td>Вызывается в процессе анимации.</td>
        </tr>
        <tr>
            <td><code><b>end</b></code></td>
            <td><code><a href="/doc/2.0/maps/manual/events#event">Event</a></code>
            <td>Вызывается во время окончания анимации.</td>
        </tr>
    </tbody>
</table>

### Класс DG.Draggable

Класс, с помощью которого можно сделать DOM элемент перетаскиваемым (включая поддержку тач-устройств). Работает только в том случае, если элемент был позиционирован с помошью <a href="#domutil-setposition">DomUtil#setPosition</a>.

    var draggable = new DG.Draggable(elementToDrag);
    draggable.enable();

#### Конструктор

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
            <td><code><b>DG.Draggable</b>(
                <nobr>&lt;HTMLElement&gt; <i>element</i>,</nobr>
                <nobr>&lt;HTMLElement&gt; <i>dragHandle?</i> )</nobr>
            </code></td>
            <td>
                <code>new DG.Draggable(&hellip;)</code><!--<br />
                <code>DG.draggable(<span class="comment">&hellip;</span>)</code>-->
            </td>
            <td>Создает объект, с помощью которого можно двигать элемент <code>element</code> во время перетаскивания элемента <code>dragHandle</code> (по умолчанию <code>dragHandle</code> является тем же элементом, что и <code>element</code>).</td>
        </tr>
    </tbody>
</table>

#### События

Вы можете подписаться на следующие события используя [эти методы](/doc/2.0/maps/manual/events#методы-управления-событиями):

<table>
    <thead>
        <tr>
            <th>Событие</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>dragstart</b></code></td>
            <td><code><a href="/doc/2.0/maps/manual/events#event">Event</a></code>
            <td>Вызывается в момент начала перетаскивания.</td>
        </tr>
        <tr>
            <td><code><b>predrag</b></code></td>
            <td><code><a href="/doc/2.0/maps/manual/events#event">Event</a></code>
            <td>Вызывается в процессе перетаскивания <i>перед</i> каждым обновлением позиции элемента.</td>
        </tr>
        <tr>
            <td><code><b>drag</b></code></td>
            <td><code><a href="/doc/2.0/maps/manual/events#event">Event</a></code>
            <td>Вызывается в процессе перетаскивания.</td>
        </tr>
        <tr>
            <td><code><b>dragend</b></code></td>
            <td><code><a href="/doc/2.0/maps/manual/events#dragendevent">DragEndEvent</a></code>
            <td>Вызывается в момент окончания перетаскивания.</td>
        </tr>
    </tbody>
</table>

#### Методы

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
            <td><code><b>enable</b>()</code></td>
            <td><code>-</code></td>
            <td>Включает возможность перетаскивания.</td>
        </tr>
        <tr>
            <td><code><b>disable</b>()</code></td>
            <td><code>-</code></td>
            <td>Отключает возможность перетаскивания.</td>
        </tr>
    </tbody>
</table>