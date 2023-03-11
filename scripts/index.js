const numImagesAvailable = 988  //how many photos are total in the collection
const numItemsToGenerate = 1; //how many photos you want to display
const imageWidth = 480;    //image width in pixels
const imageHeight = 480;   //image height in pixels
const collectionID = 928423  //Beach & Coastal, the collection ID from the original url
const galleryContainer = document.querySelector('.gallery-container')
function renderGalleryItem(randomNumber) {
    fetch(`https://source.unsplash.com/collection/${collectionID}/?sig=${randomNumber}`)
        .then((response) => {
            let galleryItem = document.createElement('span');
            console.log(response.url)
            x = response.url
            $("body").css("background-image", `linear-gradient(0deg, #00000088 30%, #ffffff44 100%), url(${x})`);







            galleryItem.classList.add('gallery-item');
            galleryItem.innerHTML = `
        <img class="gallery-image" src="${response.url}" alt="gallery image"/>
        `
            // galleryContainer.append(galleryItem);
        })
}
for (let i = 0; i < numItemsToGenerate; i++) {
    let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
    renderGalleryItem(randomImageIndex);
}
