class App {
    constructor() {
        this.photographersSection = document.querySelector('.photographer_section')
        this.photographersApi = new PhotographerApi('./data/photographers.json')
    }

    async main() {
        const photographersData = await this.photographersApi.getPhotographers()

        const photographersInfosData = photographersData.photographers;
        const photographersMediasData = photographersData.media;

        photographersInfosData
            .map(photographer => new Photographer(photographer))
            .forEach(photographer => {
                const photographerModel = photographerFactory(photographer);
                const userCardDOM = photographerModel.getUserCardDOM();
                this.photographersSection.appendChild(userCardDOM);
            })
    }
}

const app = new App()
app.main()