class Media {
    constructor(data) {
        this._id = data.id
        this._photographerId = data.photographerId
        this._title = data.title
        this._likes = data.likes
        this._date = data.date
        this._price = data.price
    }

    static getType(data) {
        if (typeof(data.image) !== "undefined" && data.image != '') {
            return 'image'
        } else if (typeof(data.video) !== "undefined" && data.video != '') {
            return 'video'
        } else {
            throw 'Unknown type format'
        }
    }
}

class MediaImage extends Media {
    constructor(data) {
        super(data)
        this._image = data.image
    }

    get image() {
        return `assets/media/${this._photographerId}/${this._image}`
    }

    getCardPhotographers() {
        const cardDOM = document.createElement('article')
        cardDOM.setAttribute('class', 'media')

        const img = document.createElement('img')
        img.setAttribute('class', 'media__img')
        img.setAttribute('src', this.image)
        img.setAttribute('alt', '')
        cardDOM.appendChild(img)
        
        const divHeading = document.createElement('div')
        divHeading.setAttribute('class', 'media__heading')

        const divHeadingTitle = document.createElement('h2')
        divHeadingTitle.setAttribute('class', 'media__title')
        divHeadingTitle.textContent = this._title

        const divHeadingLikes = document.createElement('span')
        divHeadingLikes.setAttribute('class', 'media__likes')
        divHeadingLikes.textContent = this._likes + ' ❤'

        divHeading.appendChild(divHeadingTitle)
        divHeading.appendChild(divHeadingLikes)
        cardDOM.appendChild(divHeading)

        return (cardDOM)
    }
}
 
class MediaVideo extends Media {
    constructor(data) {
        super(data)
        this._video = data.video
    }

    get video() {
        return `assets/media/${this._photographerId}/${this._video}`
    }

    getCardPhotographers() {
        const cardDOM = document.createElement('article')
        cardDOM.setAttribute('class', 'media')

        const video = document.createElement('video')
        const videoSource = document.createElement('source')
        const videoLink = document.createElement('a')
        video.setAttribute('controls', '')
        video.setAttribute('crossorigin', '')
        video.setAttribute('playsinline', '')
        video.setAttribute('class', 'media__video')
        videoSource.setAttribute('src', this.video)
        videoSource.setAttribute('type', 'video/mp4')
        videoLink.setAttribute('href', this.video)
        videoLink.setAttribute('download', '')
        videoLink.innerText = 'Télécharger';

        video.appendChild(videoSource)
        video.appendChild(videoLink)
        cardDOM.appendChild(video)

        const divHeading = document.createElement('div')
        divHeading.setAttribute('class', 'media__heading')

        const divHeadingTitle = document.createElement('h2')
        divHeadingTitle.setAttribute('class', 'media__title')
        divHeadingTitle.textContent = this._title

        const divHeadingLikes = document.createElement('span')
        divHeadingLikes.setAttribute('class', 'media__likes')
        divHeadingLikes.textContent = this._likes + ' ❤'

        divHeading.appendChild(divHeadingTitle)
        divHeading.appendChild(divHeadingLikes)
        cardDOM.appendChild(divHeading)

        return (cardDOM)
    }
}