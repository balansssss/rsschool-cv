// Карусель для блока Pets
const btnLeftPets = document.querySelector('#petsLeft')
const btnRightPets = document.querySelector('#petsRight')

function carousel(btn) {
    btn.disabled = true

    const pets = document.querySelectorAll('.pets .catalog .grid_container article')
    const petsContainer = document.querySelector('.pets .catalog .grid_container')

    // Ф-ия для рандома карточек
    function getRandom(a, b) {
        return Math.random() - 0.5
    }

    let arr = [0, 1, 2, 3, 4, 5, 6]
    arr = arr.sort(getRandom)

    const newPets = document.createElement('div')

    if (btnLeftPets.id === btn.id) {
        newPets.className = 'grid_container slide_left'
    } else { newPets.className = 'grid_container slide_right' }

    for (let i = 0; i < arr.length; i++) {
        newPets.innerHTML = newPets.innerHTML + pets[arr[i]].outerHTML
    }

    petsContainer.replaceWith(newPets)

    setTimeout(() => {
        btn.disabled = false
    }, 900)
}

btnLeftPets.addEventListener('click', e => carousel(e.target))
btnRightPets.addEventListener('click', e => carousel(e.target))

// Прогрессбар
const progressbar = document.querySelector('#progressbar')
const reviews = document.querySelectorAll('.testimonials .reviews .gradient_wrapper')
let prevNumber = 0

progressbar.addEventListener('change', e => {
    let lastIndex = 4
    const firstReview = Number(e.target.value)
    const lastReview = Number(e.target.value) + lastIndex
    reviews.forEach(r => {
        r.classList.remove('visible')
        r.classList.remove('last_visible')
    })
    for (let i = firstReview; i < lastReview; i++) {
        if (prevNumber > firstReview && i === firstReview) reviews[i].classList.add('fade')
        if (i === lastReview - 1) {
            reviews[i].classList.add('last_visible')
            if (prevNumber < firstReview) {
                reviews[i].classList.add('fade')
            }
        }
        reviews[i].classList.add('visible')
    }
    prevNumber = firstReview
})

const wrapper = document.querySelector('#popup_wrapper')
const popupBody = document.querySelector('#popup .body')
const hidePopup = document.querySelector('#hidePopup')

reviews.forEach(r => {
    r.addEventListener('click', e => {
        if (window.innerWidth < 950) {
            wrapper.classList.add('active')
            document.body.style.overflow = 'hidden'
            wrapper.style.top = `${Math.floor(window.scrollY)}px`
            popupBody.innerHTML = r.outerHTML
        }
    })
})

function hideWrapper() {
    wrapper.classList.remove('active')
    wrapper.style.display = 'none'
    document.body.style.overflow = 'auto'
    popupBody.innerHTML = ''
}

hidePopup.addEventListener('click', hideWrapper)

wrapper.addEventListener('click', e => {
    if (e.target === wrapper) hideWrapper()
})
