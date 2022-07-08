class App {
    constructor() {
        this.photographersSection = document.querySelector('.photographer-header')
        this.photographersApi = new PhotographerApi('./data/photographers.json')
    }

    async main(photographerId) {
        const photographersData = await this.photographersApi.getPhotographers()

        const photographersInfosData = photographersData.photographers
        const photographersMediasData = photographersData.media

        for (let photographerInfosData of photographersInfosData) {
            if (photographerInfosData.id == photographerId) {
                const photographer = new Photographer(photographerInfosData)
                const userCardDOM = photographer.getCardPhotographers()

                this.photographersSection.innerHTML = userCardDOM.innerHTML
            }
        }
    }
}

// Photographer's id in $_GET params
const urlParams = new URLSearchParams(window.location.search)
const photographerId = urlParams.get('id')

const app = new App()
app.main(photographerId)

