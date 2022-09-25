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