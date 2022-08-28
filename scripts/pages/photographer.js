class App {
    constructor() {
        this.photographersHeaderSection = document.querySelector('.photographer-header')
        this.photographersMediaSection  = document.querySelector('.photographer-media')
        this.photographersApi = new PhotographerApi('./data/photographers.json')
    }

    async main(photographerId) {
        // Get datas from JSON
        const photographersData       = await this.photographersApi.getPhotographers()

        // DOM Elements
        const sortBy      = document.getElementById('sortBy')
        const nbLikes     = document.getElementById('nbLikes')

        for (let photographerInfosData of photographersData.photographers) {
            if (photographerInfosData.id == photographerId) {
                // Instance of Protographer class
                const photographer = new Photographer(photographerInfosData)

                // Get photographer's medias
                for (let photographersMediaData of photographersData.media) {
                    if (photographersMediaData.photographerId == photographerId) {
                        photographer.addMedia(new MediaFactory(photographersMediaData)) 
                    }
                }

                // Show photographer's informations
                const userCardDOM  = photographer.getCardPhotographers()
                this.photographersHeaderSection.innerHTML = userCardDOM.innerHTML

                // Show photographer's realisations
                showMedia(this.photographersMediaSection, photographer._medias)

                // Number of likes
                nbLikes.innerText = photographer._nbLikes

                // Sort selectbox
                sortBy.addEventListener('change', sortMedia)
                sortBy.section = this.photographersMediaSection // TODO propre ?
                sortBy.medias = photographer._medias

                // Click on thumbnails -> launch modal
                document.querySelectorAll('.media__link').forEach(item => {
                    item.addEventListener('click', function () {
                        photographer.displayLightbox(this.dataset.id, this.dataset.type)
                    }, false)
                })

                // Click on next button -> launch modal with next image
                document.querySelector('.lightbox__link--right').addEventListener('click', function () {
                    photographer.displayLightbox(this.dataset.id, this.dataset.type)
                }, false)

                // Click on previous button -> launch modal with previous image
                document.querySelector('.lightbox__link--left').addEventListener('click', function () {
                    photographer.displayLightbox(this.dataset.id, this.dataset.type)
                }, false)

                // Click on close button -> close lightbox
                document.querySelector('.close').addEventListener('click', closeLightbox)

                // TODO a lancer QUE lorsque la modale est lancée
                window.addEventListener('keyup', function(e) {
                    if (e.code == 'Escape') {
                        closeLightbox()
                    } else if (e.code == 'ArrowRight') {
                        photographer.displayLightbox(document.querySelector('.lightbox__link--right').dataset.id, document.querySelector('.lightbox__link--right').dataset.type)
                    } else if (e.code == 'ArrowLeft') {
                        photographer.displayLightbox(document.querySelector('.lightbox__link--left').dataset.id, document.querySelector('.lightbox__link--left').dataset.type)
                    }
                })

                // Click like button
                document.querySelectorAll('.media__link--likes').forEach(item => {
                    item.addEventListener('click', function (e) {
                        if (this.dataset.liked === 'true') {
                            this.dataset.liked = false;
                            this.parentElement.querySelector('.media__likes--value').textContent --
                            nbLikes.innerText --
                        } else if (this.dataset.liked == undefined || this.dataset.liked === 'false') {
                            this.dataset.liked = true;
                            this.parentElement.querySelector('.media__likes--value').textContent ++
                            nbLikes.innerText ++
                        }

                        e.preventDefault();
                    }, false)
                })
            }
        }

        /**
         * Show photographer's realisations
         * @param {*} section 
         * @param {*} medias Audio or video
         */
        function showMedia(section, medias) {
            section.innerHTML = ''

            for (let media of medias) {
                section.append(media.getCardPhotographers())
            }

            // Librairie Plyr pour des vidéos + accessibles
            // https://openclassrooms.com/fr/courses/6691451-codez-un-site-web-accessible-avec-html-css/6964639-guidez-vos-utilisateurs-sur-les-contenus-multimedia
            // const player  = new Plyr('video')
            // window.player = player // Expose player so it can be used from the console
        }

        /**
         * Sort photographer's realisations
         */
        function sortMedia() {
            const sortByMapped = (map, compareFn) => (a,b) => compareFn(map(a), map(b)) // Map element before comparison
            const byPopularity = sortByMapped(e => e._likes, (a,b) => b - a)
            const byDate       = sortByMapped(e => new Date(e._date).getTime(), (a,b) => a - b)
            const byTitle      = sortByMapped(e => e._title, (a, b) => a.localeCompare(b, undefined))

            switch (this.value) {
                case 'date':
                    showMedia(this.section, [...this.medias].sort(byDate))
                    break
                case 'popularity':
                    showMedia(this.section, [...this.medias].sort(byPopularity))
                    break
                case 'title':
                    showMedia(this.section, [...this.medias].sort(byTitle))
                    break
                default:
                    showMedia(this.section, [...this.medias].sort(byDate))
                    console.error('Valeur de tri non renseignée')
            }
        }

        /**
         * Close Lightbox
         */
        function closeLightbox() {
            const modal = document.querySelector('.lightbox__background')
            modal.style.display = 'none'
        }
    }
}

// Photographer's id in $_GET params
const urlParams = new URLSearchParams(window.location.search)
const photographerId = urlParams.get('id')

const app = new App()
app.main(photographerId)

