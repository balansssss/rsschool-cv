
const pageDonate = window.location.pathname.includes('/donate/')

// Валидатор для input-а с типом email
const inputEmail = document.querySelector('#iEmail')
const inputSubmit = document.querySelector('#iSubmit')

function emailValidator(input, submit) {
    let state = true
    input.addEventListener('input', () => {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        const check = reg.test(input.value)
        if (check) {
            submit.className = 'submit'
            state = false
        } else if (!check && !state) {
            submit.className = 'submit default'
            state = true
        }
    })
}

emailValidator(inputEmail, inputSubmit)

// Функционал для progressbar на странице donate
if (pageDonate) {
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
        document.querySelector(`.donation .progressbar_prices .price[data-img='${img.id}']`).className = 'price checked'
    }

    // Навешиваем событие для всех поинтов на progressbar
    getDivPoints().forEach(e => {
        e.addEventListener('click', () => {
            drawChecked(e)
        })
    })

    // Реализация для смены checked эле-та в progressbar
    window.addEventListener('resize', () => {
        const windowInnerWidth = window.innerWidth
        let point = pointChecked

        if (windowInnerWidth < 700) {
            point = document.querySelector('div.progressbar div.point:nth-child(6)')
        } else {
            point = pointChecked
        }
        drawChecked(point)
    })
}


// Переход на страницы по ссылкам в footer
const footWrapperLinks = document.querySelectorAll('footer .foot .social li')

footWrapperLinks.forEach(link => {
    link.addEventListener('click', () => {
        const linkPath = link.querySelector('.social_link').href
        window.open(linkPath)
    })
})