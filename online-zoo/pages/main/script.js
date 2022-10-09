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

