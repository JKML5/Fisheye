class Media {
    constructor(data) {
        this._id = data.id
        this._photographerId = data.photographerId
        this._title = data.title
        this._likes = data.likes
        this._date = data.date
        this._price = data.price
    }

    get mediaUrl() {
        return `assets/media/${this._photographerId}/`
    }
}

class MediaImage extends Media {
    constructor(data) {
        super(data)
        this._type = 'image'
        this._image = this.mediaUrl + data.image
    }

    getCardPhotographers() {
        const cardDOM = document.createElement('article')
        cardDOM.setAttribute('class', 'media')

        const imgLink = document.createElement('a')
        imgLink.setAttribute('class', 'media__link')
        imgLink.setAttribute('href', '#')
        imgLink.setAttribute('data-id', this._id)
        imgLink.setAttribute('data-type', 'image')

        const img = document.createElement('img')
        img.setAttribute('class', 'media__img')
        img.setAttribute('src', this._image)
        img.setAttribute('alt', '')
        imgLink.appendChild(img)
        cardDOM.appendChild(imgLink)
        
        const divMediaHeading = document.createElement('div')
        divMediaHeading.setAttribute('class', 'media__heading')

        const divMediaHeadingTitle = document.createElement('h2')
        divMediaHeadingTitle.setAttribute('class', 'media__title')
        divMediaHeadingTitle.textContent = this._title

        const spanMediaHeadingLikesValue = document.createElement('span')
        spanMediaHeadingLikesValue.setAttribute('class', 'media__likes media__likes--value')
        spanMediaHeadingLikesValue.textContent = this._likes
        
        const linkMediaHeadingLikes = document.createElement('a')
        linkMediaHeadingLikes.setAttribute('href', '#')
        linkMediaHeadingLikes.setAttribute('class', 'media__link--likes')

        const spanHeadingHeart = document.createElement('span')
        spanHeadingHeart.setAttribute('class', 'media__likes')
        spanHeadingHeart.textContent = '❤'
        linkMediaHeadingLikes.appendChild(spanHeadingHeart)

        divMediaHeading.appendChild(divMediaHeadingTitle)
        divMediaHeading.appendChild(spanMediaHeadingLikesValue)
        divMediaHeading.appendChild(linkMediaHeadingLikes)
        cardDOM.appendChild(divMediaHeading)

        return (cardDOM)
    }
}
 
class MediaVideo extends Media {
    constructor(data) {
        super(data)
        this._type = 'video'
        this._video = this.mediaUrl + data.video
    }

    getCardPhotographers() {
        const cardDOM = document.createElement('article')
        cardDOM.setAttribute('class', 'media')

        const videoLink = document.createElement('a')
        videoLink.setAttribute('class', 'media__link')
        videoLink.setAttribute('href', '#')
        videoLink.setAttribute('data-id', this._id)
        videoLink.setAttribute('data-type', 'video')

        const video = document.createElement('video')
        video.setAttribute('src', this._video)
        video.setAttribute('class', 'media__video')
        videoLink.appendChild(video)
        cardDOM.appendChild(videoLink)

        const divMediaHeading = document.createElement('div')
        divMediaHeading.setAttribute('class', 'media__heading')

        const divMediaHeadingTitle = document.createElement('h2')
        divMediaHeadingTitle.setAttribute('class', 'media__title')
        divMediaHeadingTitle.textContent = this._title

        const spanMediaHeadingLikesValue = document.createElement('span')
        spanMediaHeadingLikesValue.setAttribute('class', 'media__likes media__likes--value')
        spanMediaHeadingLikesValue.textContent = this._likes

        const linkMediaHeadingLikes = document.createElement('a')
        linkMediaHeadingLikes.setAttribute('href', '#')
        linkMediaHeadingLikes.setAttribute('class', 'media__link--likes')

        const spanHeadingHeart = document.createElement('span')
        spanHeadingHeart.setAttribute('class', 'media__likes')
        spanHeadingHeart.textContent = '❤'
        linkMediaHeadingLikes.appendChild(spanHeadingHeart)

        divMediaHeading.appendChild(divMediaHeadingTitle)
        divMediaHeading.appendChild(spanMediaHeadingLikesValue)
        divMediaHeading.appendChild(linkMediaHeadingLikes)
        cardDOM.appendChild(divMediaHeading)

        return (cardDOM)
    }
}