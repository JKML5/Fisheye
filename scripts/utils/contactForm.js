function displayModal() {
    const modal = document.querySelector('.modal_background')
    modal.style.display = "block"

    const firstElement = document.getElementById('firstName')
    firstElement.focus()
}

function closeModal() {
    const modal = document.querySelector('.modal_background')
    modal.style.display = "none"
}
