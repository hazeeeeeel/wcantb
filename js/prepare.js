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
    Vector = Matter.Vector;

var world,
    engine,
    runner,
    // render,
    bubble;
var bubbles = [],
    icons = [];
var border1,
    border2,
    border3,
    border4;
var borderIds = [];

// const video_csp = document.getElementById('video-csp');
// const video_sso = document.getElementById('video-sso');
// var canvas_csp;
// var canvas_sso;
// var context_csp;
// var context_sso;
// var btnCapture_csp;
// var btnCapture_sso;
// var capturedImageURL_csp;
// var btnStart;

var bubble_container,
    mask_container,
    popup_instruction;

var rightPressed = false;
var leftPressed = false;
var mousedown = false;
// const capturedImage_csp = document.getElementById('captured_csp');
// const capturedImage_sso = document.getElementById('captured_sso');

window.onload = function () {
    // -----------for taking profile photos----------------
    // canvas_csp = document.getElementById('canvas_csp');
    // canvas_sso = document.getElementById('canvas_sso');
    // context_csp = canvas_csp.getContext('2d');
    // context_sso = canvas_sso.getContext('2d');
    // btnCapture_csp = document.getElementById('btn-capture-csp');
    // btnCapture_sso = document.getElementById('btn-capture-sso');
    // btnNext = document.getElementById('btn-next');
    // initCamera();
    //
    // btnCapture_csp.addEventListener('click', () => {
    //     console.log("Captured profile pic for csp:");
    //     context_csp.drawImage(video_csp, 0, 0, canvas_csp.width, canvas_csp.height);
    //     capturedImageURL_csp = canvas_csp.toDataURL('image/png');
    //     console.log(capturedImageURL_csp);
    // });
    //
    // btnCapture_sso.addEventListener('click', () => {
    //     console.log("Captured profile pic for sso:");
    //     context_sso.drawImage(video_sso, 0, 0, canvas_sso.width, canvas_sso.height);
    //     capturedImageURL_sso = canvas_sso.toDataURL('image/png');
    //     console.log(capturedImageURL_sso);
    // });
    //
    // btnNext.addEventListener('click', () => {
    //     localStorage.setItem("profile_csp", capturedImageURL_csp);
    //     localStorage.setItem("profile_sso", capturedImageURL_sso);
    //
    //     window.location.href = './argue.html';
    // });

    bubble_container = document.getElementById('bubble-container');
    mask_container = document.getElementById('mask-container');
    popup_instruction = document.getElementById('popup-instruction');
};

// async function initCamera() {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         video_csp.srcObject = stream;
//         video_sso.srcObject = stream;
//         video_csp.play();
//         video_sso.play();
//     } catch (err) {
//         console.error('Error accessing the camera:', err);
//     }
// }

window.addEventListener(
    "mousedown",
    (e) => {
        if (!mousedown){
            createIcon(e.clientX, e.clientY + 80);
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
    icons.push(new Icon(x, y));
    console.log(x,y);
}

window.addEventListener(
  "keydown",
  (e) => {
    switch (e.key) {
        // case 'ArrowUp':
        //     if (Bubble.freezeOn == false) {
        //         runner.enabled = false;
        //         console.log(runner);
        //         Bubble.freezeOn = true;
        //         freezeAll();
        //         console.log("Freeze " + bubbles.length);
        //     } else {
        //         Bubble.freezeOn = false;
        //         runner.enabled = true;
        //         unfreezeAll();
        //         console.log("Unfreeze!");
        //     }
        //     break;
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

// function freezeAll() {
//     for (let i = 0; i < icons.length; i++) {
//         let icon = icons[i];
//         icon.body.isStatic = true;
//     }
// }
//
// function unfreezeAll() {
//     for (let i = 0; i < icons.length; i++) {
//         let icon = icons[i];
//         icon.body.isStatic = false;
//     }
// }

function clearAll() {
    icons = [];
    removeElements();
    world.bodies.splice(4, world.bodies.length - 4);
}

function showPopupInst() {
    popup_instruction.classList.toggle('active');
}

function closePopupInst() {
    popup_instruction.classList.toggle('active');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    engine = Engine.create();
    world = engine.world;
    engine.gravity.scale = 0;
    runner = Runner.create();

    setBorders();
    generateIcons();
    // Runner.run(runner, engine);
}

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

function generateIcons() {
    setInterval(createIcon, 1500, windowWidth / 2 - 25, windowHeight / 3);
}

function draw() {
    // if (!Bubble.freezeOn) {
        removeElements();

        Engine.update(engine);



        border1.show();
        border2.show();
        border3.show();
        border4.show();

        icons.forEach((icon) => {
            icon.show();
        });
    // }



}
