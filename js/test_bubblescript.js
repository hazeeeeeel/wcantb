Matter.use(
    // 'matter-wrap',
    'matter-collision-events'
);

// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector,
    Pair = Matter.Pair;

var world,
    engine,
    runner,
    // render,
    bubble;
var bubbles = [],
    icons = [];
const MAX_ICON = 200;
var border1,
    border2,
    border3,
    border4;
var borderIds = [];
var interface,
    title_csp,
    title_sso;
var bubble_container,
    mask_container,
    popup_instruction,
    point_csp,
    point_sso;;



// var windowWidth = Math.max(document.documentElement.clientwindowWidth || 0, window.innerwindowWidth || 0);
// var windowHeight = Math.max(document.documentElement.clientwindowHeight || 0, window.innerwindowHeight || 0);

var rightPressed = false;
var leftPressed = false;
var mousedown = false;


window.addEventListener(
    "mousedown",
    (e) => {
        if (!mousedown){
            createIcon(e.clientX, e.clientY);
            // console.log((e.offsetX+ ', ' + e.offsetY))
            mousedown = true;
        }
    }, true
);

window.addEventListener(
    "mouseup",
    (e) => {
        mousedown = false;
    }, true
);

function createIcon(x, y) {
    if (icons.length <= MAX_ICON) icons.push(new Icon(x, y));
}

window.addEventListener('load', (e) => {

    bubble_container = document.getElementById('bubble-container');
    mask_container = document.getElementById('mask-container');
    popup_instruction = document.getElementById('popup-instruction');

    point_csp = document.getElementById('point-csp');
    point_sso = document.getElementById('point-sso');

    // popup_container = document.getElementById('popup');
    // btn_close_popup = document.getElementById('btn-close-popup');
    // popup_bubble = document.getElementById('popup-bubble');
    // p_img = popup_bubble.querySelector('img');
    // popup_citations = document.getElementById('popup-citations');
    // console.log(p_img);
    // console.log('load');
})



window.addEventListener(
  "keydown",
  (e) => {
    switch (e.key) {
        case 'ArrowRight':
            if (rightPressed == false) {
                bubbles.push(new Bubble("sso"));
                rightPressed = true;
                // console.log('Right!');
            }
            break;
        case 'ArrowLeft':
            if (leftPressed == false) {
                bubbles.push(new Bubble("csp"));
                // console.log('Left');
                leftPressed = true;
            }
            break;
        case 'ArrowUp':
            if (Bubble.freezeOn == false) {
                runner.enabled = false;
                console.log(runner);
                Bubble.freezeOn = true;
                freezeAll();
                console.log("Freeze " + bubbles.length);
            } else {
                Bubble.freezeOn = false;
                runner.enabled = true;
                unfreezeAll();
                console.log("Unfreeze!");
            }
            break;
        case 'ArrowDown':
            // Clear all
            console.log('clear');
            clearAll();
            break;
        default:
            return ;
    }
    }, true
);

window.addEventListener(
  "keyup",
  (e) => {
    switch (e.key) {
        case 'ArrowRight':
            rightPressed = false;
            break;
        case 'ArrowLeft':
            leftPressed = false;
            break;
        case 'ArrowUp':
            break;
            default:
            return ;
        }

    }, true
);

function showPopupInst() {
    if (!popup_instruction.classList.contains('active')) {
        popup_instruction.classList.toggle('active');
        popup_container.style.backgroundColor = 'rgba(120,120,120,.6)';
    }
}

function closePopupInst() {
    if (popup_instruction.classList.contains('active')) {
        popup_instruction.classList.toggle('active');
        popup_container.style.background = 'none';
    }
}

function freezeAll() {
    for (let i = 0; i < bubbles.length; i++) {
        let bubble = bubbles[i];
        bubble.body.isStatic = true;
    }
}

function unfreezeAll() {
    for (let i = 0; i < bubbles.length; i++) {
        let bubble = bubbles[i];
        bubble.body.isStatic = false;
    }
}

function clearAll() {
    bubbles = [];
    icons = [];
    removeElements();
    // console.log(world);
    world.bodies.splice(4, world.bodies.length - 4);
    Bubble.cspCount = 0;
    Bubble.ssoCount = 0;
    // console.log(world);
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    engine = Engine.create();
    world = engine.world;
    engine.gravity.scale = 0;

    runner = Runner.create();

    setBorders();
    // Runner.run(runner, engine);
}

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
//     borderIds.forEach((id, i) => {
//         let border = Composite.get(world, id, "body");
//         switch(i) {
//             case 1:
//                 border.width = windowWidth+20;
//                 border.position.x = windowWidth/2;
//                 break;
//             case 4:
//                 border.position.x = windowWidth/2;
//                 border.position.y = windowHeight+10;
//                 border.width = windowWidth+20;
//                 break;
//             case 3:
//                 border.height = windowHeight+20;
//                 border.position.y = windowHeight/2;
//             case 2:
//                 border.position.x = windowWidth+10;
//                 border.position.y = windowHeight/2;
//                 border.height = windowHeight+20;
//                 break;
//         }
//     });
//
// }

function setBorders() {
    border1 = new Border(windowWidth / 2 , -10              , windowWidth + 20, 20               );
    border2 = new Border(windowWidth + 10, windowHeight / 2 , 20              , windowHeight + 20);
    border3 = new Border(-10             , windowHeight / 2 , 20              , windowHeight + 20);
    border4 = new Border(windowWidth / 2 , windowHeight + 10, windowWidth + 20, 20               );
    Composite.add(world, border1);
    Composite.add(world, border2);
    Composite.add(world, border3);
    Composite.add(world, border4);
    borderIds = [border1.body.id, border2.body.id, border3.body.id, border4.body.id];
}

function draw() {
    if (!Bubble.freezeOn) {
        removeElements();

        Engine.update(engine);

        bubbles.forEach((bubble) => {
            // bubble.updateVelocity();
            bubble.show();
            // console.log(bubble);
        })

        border1.show();
        border2.show();
        border3.show();
        border4.show();

        icons.forEach((icon) => {
            icon.show();
        });
    }
}

function addPoint(id) {
    console.log('add');
    for (let b of bubbles) {
        if (b.body.id == id) {
            // console.log(b);
            if (b.team == 'csp') {
                point_csp.innerText = Number(point_csp.innerText) + 1;
                point_sso.innerText = Number(point_sso.innerText) - 1 > 0 ? Number(point_sso.innerText) - 1 : 0;
            } else {
                point_sso.innerText = Number(point_sso.innerText) + 1;
                point_csp.innerText = Number(point_csp.innerText) - 1 > 0 ? Number(point_csp.innerText) - 1 : 0;
            }
        }
    }
}
