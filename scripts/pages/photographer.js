class App {
    constructor() {
        this.photographersHeaderSection = document.querySelector('.photographer-header')
        this.photographersMediaSection  = document.querySelector('.photographer-media')
        this.photographersApi = new PhotographerApi('./data/photographers.json')
    }

    async main(photographerId) {
        // DOM Elements
        const sortBy = document.getElementById('sortBy');

        // Get datas from JSON
        const photographersData       = await this.photographersApi.getPhotographers()
        const photographersInfosData  = photographersData.photographers
        const photographersMediasData = photographersData.media

        // Get datas of photographer in params only
        const selectedPhotographerMediasData = [];

        for (let photographersMediaData of photographersMediasData) {
            if (photographersMediaData.photographerId == photographerId) {
                selectedPhotographerMediasData.push(new MediaFactory(photographersMediaData, Media.getType(photographersMediaData))) 
            }
        }

        // Show photographer's informations
        for (let photographerInfosData of photographersInfosData) {
            if (photographerInfosData.id == photographerId) {
                const photographer = new Photographer(photographerInfosData)
                const userCardDOM  = photographer.getCardPhotographers()

                this.photographersHeaderSection.innerHTML = userCardDOM.innerHTML
            }
        }

        // Show photographer's realisations
        showMedia(this.photographersMediaSection, selectedPhotographerMediasData)

        // Sort selectbox
        sortBy.addEventListener('change', sortMedia)
        sortBy.section = this.photographersMediaSection // TODO propre ?
        sortBy.medias = selectedPhotographerMediasData

        /**
         * Show photographer's realisations
         * @param {*} section 
         * @param {*} medias Audio or video
         */
        function showMedia(section, medias) {
            section.innerHTML = '';

            for (let media of medias) {
                section.append(media.getCardPhotographers())
            }

            // Librairie Plyr pour des vidéos + accessibles
            // https://openclassrooms.com/fr/courses/6691451-codez-un-site-web-accessible-avec-html-css/6964639-guidez-vos-utilisateurs-sur-les-contenus-multimedia
            const player  = new Plyr('video');
            window.player = player; // Expose player so it can be used from the console
        }

        /**
         * Sort photographer's realisations
         */
        function sortMedia() {
            const sortByMapped = (map, compareFn) => (a,b) => compareFn(map(a), map(b)); // Map element before comparison
            const byPopularity = sortByMapped(e => e._likes, (a,b) => b - a);
            const byDate       = sortByMapped(e => new Date(e._date).getTime(), (a,b) => a - b);
            const byTitle      = sortByMapped(e => e._title, (a, b) => a.localeCompare(b, undefined));

            switch (this.value) {
                case 'date':
                    showMedia(this.section, [...this.medias].sort(byDate))
                    break;
                case 'popularity':
                    showMedia(this.section, [...this.medias].sort(byPopularity))
                    break;
                case 'title':
                    showMedia(this.section, [...this.medias].sort(byTitle))
                    break;
                default:
                    showMedia(this.section, [...this.medias].sort(byDate))
                    console.error('Valeur de tri non renseignée');
            }
        }
    }
}

// Photographer's id in $_GET params
const urlParams = new URLSearchParams(window.location.search)
const photographerId = urlParams.get('id')

const app = new App()
app.main(photographerId)

