// Функционал для progressbar на странице donate
// Функции, которые возвращают необходимые элементы (селекторы)
function getDivPointChecked() {
    return document.querySelector('div.point.checked')
}

function getImgChecked(parent) {
    return parent.querySelector('img.radio_img')
}

function getPointPriceChecked() {
    return document.querySelector('.donation .progressbar_prices .price.checked')
}

const amountInput = document.querySelector('#amount')
const pointChecked = getDivPointChecked()
drawChecked(pointChecked)

// Функция возвращает div-ы с классом поинт
function getDivPoints() {
    return document.querySelectorAll('div.progressbar div.point')
}

// Заменяем стандартный radio на radio:checked
function drawChecked(point) {
    const prevPointChecked = getDivPointChecked()
    prevPointChecked.className = 'point'
    const pointPriceChecked = getPointPriceChecked()
    if (pointPriceChecked) {
        pointPriceChecked.className = 'price'
    }
    getImgChecked(prevPointChecked).src = '../../assets/img/donate/radio.png'

    point.className = 'point checked'
    const img = point.querySelector('img.radio_img')
    img.src = '../../assets/img/donate/radio_checked.png'
    amountInput.value = img.id.slice(1)
    document.querySelector(`.donation .progressbar_prices .price[data-img='${img.id}']`).className = 'price checked'
}

// Навешиваем событие для всех поинтов на progressbar
getDivPoints().forEach(e => {
    e.addEventListener('click', () => {
        drawChecked(e)
    })
})

//При вводе в input автовыбор суммы
amountInput.addEventListener('input', e => {
    const findPoint = document.querySelector(`.donation .progressbar .point[data-amount="${e.target.value}"]`)
    if (findPoint) drawChecked(findPoint)

})

// Реализация для смены checked эле-та в progressbar по-умолчанию от размера экрана
// window.addEventListener('resize', () => {
//     const windowInnerWidth = window.innerWidth
//     let point = pointChecked

//     if (windowInnerWidth < 700) {
//         point = document.querySelector('div.progressbar div.point:nth-child(6)')
//     } else {
//         point = pointChecked
//     }
//     drawChecked(point)
// })
