console.log("geladen")

const categorieData = {
    productID: 500,
    productModel: {
        productModelNr: 1,
        categorie: {
            categorieNr: 1,
            categorieNaam: "video"
        },
        productModelNaam: "iSense",
        productModelMerk: "3D systems",
        productModelFoto: null,
        productModelBeschrijving: "Dieptecamera"
    },
    productNaam: "youmni",
    status: "beschikbaar"
};

fetch('http://localhost:8080/product/toevoegen', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(categorieData),
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Er is een fout opgetreden bij het toevoegen van de categorie.');
        }
        return response.text();
    })
    .then(data => {
        console.log('Nieuwe categorie toegevoegd:', data);
    })
    .catch(error => {
        console.error('Fout bij toevoegen van categorie:', error);
    });