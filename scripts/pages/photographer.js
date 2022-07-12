class App {
    constructor() {
        this.photographersHeaderSection = document.querySelector('.photographer-header')
        this.photographersMediaSection  = document.querySelector('.photographer-media')
        this.photographersApi = new PhotographerApi('./data/photographers.json')
    }

    async main(photographerId) {
        // Get datas from JSON
        const photographersData       = await this.photographersApi.getPhotographers()
        const photographersInfosData  = photographersData.photographers
        const photographersMediasData = photographersData.media

        // Show photographer's informations
        for (let photographerInfosData of photographersInfosData) {
            if (photographerInfosData.id == photographerId) {
                const photographer = new Photographer(photographerInfosData)
                const userCardDOM  = photographer.getCardPhotographers()

                this.photographersHeaderSection.innerHTML = userCardDOM.innerHTML
            }
        }

        // Show photographer's realisations
        for (let photographersMediaData of photographersMediasData) {
            if (photographersMediaData.photographerId == photographerId) {
                const media = new MediaFactory(photographersMediaData, Media.getType(photographersMediaData))
                this.photographersMediaSection.append(media.getCardPhotographers())
            }
        }
    }
}

// Photographer's id in $_GET params
const urlParams = new URLSearchParams(window.location.search)
const photographerId = urlParams.get('id')

const app = new App()
app.main(photographerId)

