function displayModal() {
    const modal = document.querySelector('.modal_background')
    const firstFocusableElement = document.getElementById('firstName')
    const lastFocusableElement = document.querySelector('.contact_modal__btnClose')

    document.addEventListener('keydown', function(e) {
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) { // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // add focus for the last focusable element
                e.preventDefault();
          }
        } else { // if tab key is pressed
            if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                console.log('last');
                firstFocusableElement.focus(); // add focus for the first focusable element
                e.preventDefault();
            }
        }
    });

    modal.style.display = "block"
    firstFocusableElement.focus();

    window.addEventListener('keyup', function(e) {
        if (e.code == 'Escape') {
            closeModal()
        }
    })
}

function closeModal() {
    const modal = document.querySelector('.modal_background')
    modal.style.display = "none"
}
