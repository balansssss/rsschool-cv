// Обработка ссылка в футере, для переброски наверх.
const logo = document.querySelector('#toTop')

const path = window.location.pathname.includes('/main/')

// Проверка на какой странице необходимо реализовать функционал
if(path) {
    logo.addEventListener('click', e => {
        e.preventDefault()
        window.scrollTo(0, 0)
    })
}

// Валидатор для input-а с типом email
const inputEmail = document.querySelector('#iEmail')
const inputSubmit = document.querySelector('#iSubmit')

function emailValidator(input, submit) {
    let state = true
    input.addEventListener('input', () => {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        const check = reg.test(input.value)
        if(check) {
            submit.className = 'submit'
            state = false
        } else if (!check && !state){
            submit.className = 'submit default'
            state = true
        }
    })
}

emailValidator(inputEmail, inputSubmit)

// Функционал для progressbar на странице donate
// Функции, которые возвращают необходимые элементы (селекторы)

function getDivPointChecked() {
    return document.querySelector('div.point.checked')
}

function getImgChecked(parent) {
    return parent.querySelector('img.radio_img')
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
    getImgChecked(prevPointChecked).src = '../../assets/img/donate/radio.png'

    point.className = 'point checked'
    point.querySelector('img.radio_img').src = '../../assets/img/donate/radio_checked.png'
}

// Навешиваем событие для всех поинтов на progressbar
getDivPoints().forEach(e=>{
    e.addEventListener('click', () => {
        drawChecked(e)
    })
})


