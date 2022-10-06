
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


// Переход на страницы по ссылкам в footer
const footWrapperLinks = document.querySelectorAll('footer .foot .social li')

footWrapperLinks.forEach(link => {
    link.addEventListener('click', () => {
        const linkPath = link.querySelector('.social_link').href
        window.open(linkPath)
    })
})


// Меню
const butHideMenu = document.querySelector('#hideMenu')
const butShowMenu = document.querySelector('#hamburger')
const menuWrapper = document.querySelector('#menuWrapper')

function hideMenu() {
    document.body.style.overflow = 'auto'
    menuWrapper.className = 'menu_wrapper'
    menuWrapper.style.display = 'none'
}

butShowMenu.addEventListener('click', () => {
    menuWrapper.style.display = 'flex'
    document.body.style.overflow = 'hidden'
    menuWrapper.className = 'menu_wrapper active'
})

butHideMenu.addEventListener('click', hideMenu)

menuWrapper.addEventListener('click', e => {
    if (e.target === menuWrapper) hideMenu()
})