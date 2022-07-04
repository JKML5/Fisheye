    async function getPhotographers() {
        fetch("../data/photographers.json")
            .then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function(data) {
                displayData(data.photographers);
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes et les affiche
        await getPhotographers();
    };
    
    init();
    