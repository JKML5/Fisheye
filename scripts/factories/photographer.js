function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute('class', 'photographer');

        const img = document.createElement('img');
        img.setAttribute('class', 'photographer__img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', '');

        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute('class', 'photographer__name');

        const link = document.createElement('a');
        link.setAttribute('href', './photographer.html');
        link.appendChild(img);
        link.appendChild(h2);

        const p_city = document.createElement('p');
        p_city.setAttribute('class', 'photographer__city');
        p_city.textContent = city + ', ' + country;

        const p_tagline = document.createElement('p');
        p_tagline.setAttribute('class', 'photographer__tagline');
        p_tagline.textContent = tagline;

        const p_price = document.createElement('p');
        p_price.setAttribute('class', 'photographer__price');
        p_price.textContent = price + '€/jour';
        
        article.appendChild(link);
        article.appendChild(p_city);
        article.appendChild(p_tagline);
        article.appendChild(p_price);
        return (article);
    }

    return { name, picture, getUserCardDOM }
}