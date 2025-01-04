const speed = 0.05;
const iconCategory = 0x0008;
const ROOT_DIR = "https://hazeeeeeel.github.io/wcantb/";

class Icon {
    
    constructor(x, y) {
        this.id = Math.floor(Math.random() * 5);
        this.sprite = ROOT_DIR + "assets/icon/" + this.id + ".png";
        var options = {
            friction: 0,
            frictionAir: 0,
            restitution: 1,
            render: {
                sprite: {
                            texture: this.sprite
                        }
                },
            collisionFilter: {
                    category: iconCategory,
                },
            collide: false,
            }

        this.w = 50;
        this.h = 50;
        this.body = Bodies.rectangle(x, y, this.w, this.h, options);
        this.setInitialVelocity();
        Body.setAngle(this.body, 0);
        Body.setInertia(this.body, Infinity);

        World.add(world, this.body);
    }


    show() {
        var pos = this.body.position;
        var angle = this.body.angle + deltaTime * speed;
        Body.setAngle(this.body, angle);
        // console.log(this.body.angle);

        var size = sin(frameCount * speed) * 0.3 + 1.4;

        push();

        // rotate(angle);

        var sprite = this.sprite;

        var spriteImg = createImg(this.sprite);
        spriteImg.position(pos.x - this.w / 2, pos.y - this.h / 2);
        spriteImg.size(this.w * size, this.h * size);
        spriteImg.class('icon');
        spriteImg.style('z-index', '20');
        spriteImg.parent(bubble_container);
        spriteImg.attribute('cursor', 'pointer');
        // spriteImg.attribute('transform', 'rotate(' + angle + 'deg)');

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
