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

    getCardHome() {
        const article = document.createElement('article');
        article.setAttribute('class', 'photographer');

        const img = document.createElement('img');
        img.setAttribute('class', 'photographer__img');
        img.setAttribute('src', this.picture);
        img.setAttribute('alt', '');

        const h2 = document.createElement('h2');
        h2.textContent = this._name;
        h2.setAttribute('class', 'photographer__name');

        const link = document.createElement('a');
        link.setAttribute('href', './photographer.html?id=' + this._id);
        link.appendChild(img);
        link.appendChild(h2);

        const p_city = document.createElement('p');
        p_city.setAttribute('class', 'photographer__city');
        p_city.textContent = this.localization;

        const p_tagline = document.createElement('p');
        p_tagline.setAttribute('class', 'photographer__tagline');
        p_tagline.textContent = this._tagline;

        const p_price = document.createElement('p');
        p_price.setAttribute('class', 'photographer__price');
        p_price.textContent = this.price;
        
        article.appendChild(link);
        article.appendChild(p_city);
        article.appendChild(p_tagline);
        article.appendChild(p_price);
        return (article);
    }

    getCardPhotographers() {
        const cardDOM = document.createElement('div');

        const blocLeft = document.createElement('div');
        blocLeft.setAttribute('class', 'photograper-header__left');

        const name = document.createElement('h2');
        name.textContent = this._name;
        name.setAttribute('class', 'photographer-header__name');
        blocLeft.appendChild(name);

        const city = document.createElement('p');
        city.setAttribute('class', 'photographer-header__city');
        city.textContent = this.localization;
        blocLeft.appendChild(city);
        
        const tagline = document.createElement('p');
        tagline.setAttribute('class', 'photographer-header__tagline');
        tagline.textContent = this._tagline;
        blocLeft.appendChild(tagline);

        const contactButton = document.createElement('button');
        contactButton.setAttribute('class', 'button');
        contactButton.setAttribute('onclick', 'displayModal()');
        contactButton.textContent = 'Contactez-moi';

        const img = document.createElement('img');
        img.setAttribute('class', 'photographer-header__img');
        img.setAttribute('src', this.picture);
        img.setAttribute('alt', '');

        cardDOM.appendChild(blocLeft);
        cardDOM.appendChild(contactButton);
        cardDOM.appendChild(img);

        return (cardDOM);
    }
}
