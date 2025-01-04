const diamond_url = "./assets/bg/diamond.png";
const tear_url = "./assets/bg/tear.png";


function generateBackground() {
    // create a new div element
    var newDiv = document.createElement("div");

    var newImg = document.createElement('img');
    newImg.src = getImgSrc(id);

    var newId = getNewElementId(id);

    // add the text node to the newly created div
    newDiv.appendChild(newImg);

    // add class and id to the newly created div
    // newDiv.classList.add("bubble");
    // newDiv.id = newId; //???????????necessary?

    return newDiv;
}



setInterval(generateBackground, 100);
