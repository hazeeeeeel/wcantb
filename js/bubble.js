var defaultCategory = 0x0001,
    cspCategory = 0x0002,
    ssoCategory = 0x0004;


var defaultColor = '#ffffff',
    colorA = '#063e7b',
    colorB = '#f5d259';

var cspSprite;


var popup_container,
btn_close_popup,
popup_bubble,
p_img,
popup_footnotes;

const ROOT_DIR = "https://hazeeeeeel.github.io/wcantb/";

window.addEventListener('load', function() {
    popup_container = document.getElementById('popup');
    btn_close_popup = document.getElementById('btn-close-popup');
    popup_bubble = document.getElementById('popup-bubble');
    p_img = popup_bubble.querySelector('img');
    popup_footnotes = document.getElementById('popup-footnotes-content');
    
    // console.log(p_img);
    // console.log('load');
})

class Bubble {

    static freezeOn = false;

    static cspCount = 0;
    static ssoCount = 0;
    static cspTotal = 22;
    static ssoTotal = 24;

    constructor(team) {
        this.team = team;
        this.collide = false;

        let category,
            mask_category,
            sprite,
            mask,
            index,
            dimensions,
            x,
            y;
        var cspCount = Bubble.cspCount;
        var ssoCount = Bubble.ssoCount;
        var cspTotal = Bubble.cspTotal;
        var ssoTotal = Bubble.ssoTotal;

        if (team == "csp") {
            category = cspCategory;
            mask_category = ssoCategory;
            x = windowWidth * 0.2;
            y = windowHeight * 0.6;
            if (cspCount < cspTotal) {
                dimensions = bubbleDimensions_csp[cspCount];

                index = cspCount;
                sprite = ROOT_DIR + 'assets/csp/bubbles/' + cspCount + '.png';
                mask = ROOT_DIR + 'assets/csp/bubbles/filter-gray/' + cspCount + '.png';
                Bubble.cspCount++;
            } else {
                dimensions = bubbleDimensions_csp[0];
                index = 0;
                sprite = ROOT_DIR + 'assets/csp/bubbles/0.png';
                mask = ROOT_DIR + 'assets/csp/bubbles/filter-gray/0.png';
                Bubble.cspCount = 1;
            }
        } else if (team == "sso") {
            category = ssoCategory;
            mask_category = cspCategory;
            x = windowWidth * 0.8;
            y = windowHeight * 0.54;
            if (ssoCount < ssoTotal) {
                dimensions = bubbleDimensions_sso[ssoCount];
                index = ssoCount;
                sprite = ROOT_DIR + 'assets/sso/bubbles/' + ssoCount + '.png';
                mask = ROOT_DIR + 'assets/sso/bubbles/filter-gray/' + ssoCount + '.png';
                Bubble.ssoCount++;
            } else {
                dimensions = bubbleDimensions_sso[0];
                index = 0;
                sprite = ROOT_DIR + 'assets/sso/bubbles/0.png';
                mask = ROOT_DIR + 'assets/sso/bubbles/filter-gray/0.png';
                Bubble.ssoCount = 1;
            }
        } else {
            category = defaultCategory;
            color = defaultColor;
            // really should raise error here
        }

        var options = {
            friction: 0,
            frictionAir: 0,
            restitution: 1,
            collisionFilter: {
                    category: category,
                    mask: defaultCategory | mask_category
                },
            render: {
                sprite: {
                            texture: sprite
                        }
                },
            collide: false,
            lastVelocity: Vector.create(0,0),
            }
        this.w = dimensions.x;
        this.h = dimensions.y;
        this.body = Bodies.rectangle(x, y, this.w, this.h, options);
        this.index = index;

        this.sprite = sprite;
        this.mask = mask;

        this.body.lastVelocity = this.setInitialVelocity();
        Body.setInertia(this.body, Infinity);

        this.body.onCollide(function(pair) {
            // console.log('colliding: ' + pair);
            if(!pair.bodyA.collide && (!pair.bodyA.isStatic && !pair.bodyB.isStatic)) {
                pair.bodyA.collide = true;
                pair.bodyB.collide = true;
                pair.bodyA.isStatic = true;
                pair.bodyB.isStatic = true;

                // console.log(Pair.id(pair.bodyA, pair.bodyB));
                calculatePoints(Pair.id(pair.bodyA, pair.bodyB));

                setTimeout(() => {
                    if (!Bubble.freezeOn) {
                        pair.bodyA.isStatic = false;
                        pair.bodyB.isStatic = false;
                    }
                }, "1000");
            }
        })
        this.body.onCollideEnd(function(pair) {
            if(this.collide && (!pair.bodyA.isStatic && !pair.bodyB.isStatic)) {
                pair.bodyA.collide = false;
                pair.bodyB.collide = false;
                // generates an icon
                var cx, cy;
                cx = Math.max(pair.bodyA.bounds.min.x, pair.bodyB.bounds.min.x);
                cy = Math.max(pair.bodyA.bounds.min.y, pair.bodyB.bounds.min.y);
                createIcon(cx, cy);
            }
        })
        World.add(world, this.body);
        console.log(this.body);
    }

    // Add oscillating effect
    updateVelocity() {
        var ms = millis()/10000, //this will be number of seconds since the program has started.
            amplitude = 1,
            speed = 10;

        var acceleration = amplitude * sin(ms);

        Body.setSpeed(this.body, speed);

        var currentVelocity = Body.getVelocity(this.body);

        var nextVelocity = Vector.create(currentVelocity.x + acceleration, currentVelocity.y);

        Body.setVelocity(this.body, nextVelocity);
    }

    show() {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        // translate(pos.x, pos.y);
        // rectMode(CENTER);
        // imageMode(CENTER);

        var sprite = this.sprite;
        var team = this.team;
        var index = this.index;

        var spriteImg = createImg(this.sprite);
        spriteImg.position(pos.x - this.w / 2, pos.y - this.h / 2);
        spriteImg.size(this.w, this.h);
        spriteImg.class('bubble');
        spriteImg.style('z-index', '20');
        spriteImg.parent(bubble_container);
        spriteImg.attribute('cursor', 'pointer');

        spriteImg.mouseClicked(function() {
            popup(sprite, team, index);
        });

        if (this.body.collide){
            var maskImg = createImg(this.mask);
            maskImg.position(pos.x - this.w / 2, pos.y - this.h / 2);
            maskImg.size(this.w, this.h);
            maskImg.style('opacity', '75%');
            maskImg.class('bubble_mask');
            maskImg.parent(mask_container);
        }

        pop();

    }

    setInitialVelocity() {
        let directionX = random(-1,1) < 0 ? -1 : 1;
        let directionY = random(-1,1) < 0 ? -1 : 1;
        let initialVelocity =
        Vector.create(directionX * random(1, 3), directionY * random(1, 3));

        Body.setVelocity(this.body, initialVelocity);

        return initialVelocity;
    }
}

function popup(sprite, team, index) {
    // popup_container,
    // btn_close_popup,
    // popup_bubble,
    // popup_footnotes;

    p_img.src = sprite;

    if(team == "csp") {
        popup_container.style.backgroundColor = 'rgba(246,150,203,.6)';
    } else {
        popup_container.style.backgroundColor = 'rgba(42,240,52,.6)';
    }

    var footnotes = "./assets/" + team + "/bubbles/" + index + ".txt";
    const url = `${footnotes}`;
    // let cit = popup_footnotes.querySelector('p');

    // Call `fetch()`, passing in the URL.
    fetch(url)
      // fetch() returns a promise. When we have received a response from the server,
      // the promise's `then()` handler is called with the response.
      .then((response) => {
        // Our handler throws an error if the request did not succeed.
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        // Otherwise (if the response succeeded), our handler fetches the response
        // as text by calling response.text(), and immediately returns the promise
        // returned by `response.text()`.
        return response.text();
      })
      // When response.text() has succeeded, the `then()` handler is called with
      // the text, and we copy it into the `poemDisplay` box.
      .then((text) => {
        popup_footnotes.textContent = text;
        popup_footnotes.style.transform = 'scale(1)';
      })
      // Catch any errors that might happen, and display a message
      // in the `poemDisplay` box.
      .catch((error) => {
        // cit.textContent = `Could not fetch verse: ${error}`;
        cit.textContent = '';
        popup_footnotes.style.transform = 'scale(0)';
      });


    // let p_footnotes = document.createElement('p');
    // let p_content = document.createTextNode(index);
    // p_footnotes.appendChild(p_content);
    // popup_footnotes.appendChild(p_footnotes);

    popup_container.classList.toggle('active');
}

function closePopup() {
    popup_container.style.background = 'none';
    popup_container.classList.toggle('active');
    console.log('toggle close');
}

function calculatePoints(pairId) {
    // console.log(pairId);
    var idA = Number(pairId.substring(0, pairId.indexOf(':')));
    var idB = Number(pairId.substring(pairId.indexOf(':') + 1));
    // console.log(idA + " + " + idB);

    if (!idA || !idB) return;

    const winner = (idA > idB) ? idA : idB;

    if (winner.team == 'csp') {
        addPoint(idA);
    } else {
        addPoint(idB);
    }
}