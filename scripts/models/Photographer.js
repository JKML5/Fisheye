class Photographer {
    constructor(data) {
        this._name = data.name
        this._id = data.id
        this._city = data.city
        this._country = data.country
        this._tagline = data.tagline
        this._price = data.price
        this._portrait = data.portrait
    }

    get picture() {
        return `assets/photographers/${this._portrait}`
    }

    get localization() {
        return `${this._city}, ${this._country}`
    }

    get price() {
        return `${this._price}€/jour`
    }
}
