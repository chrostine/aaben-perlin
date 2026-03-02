let bg = "#ffffff";
let farve1 = "#da3333ff";
let farve2 = "#52da33ff";
let farve3 = "#3633daff";
let billede;


function getImg(){
    billede = loadImage("https://picsum.photos/200");
    print("succes!")
}

function getColors(){
    bg = billede.get(random(billede.width), random(billede.height));
    farve1 = billede.get(random(billede.width), random(billede.height));
    farve2 = billede.get(random(billede.width), random(billede.height));
    farve3 = billede.get(random(billede.width), random(billede.height));
}