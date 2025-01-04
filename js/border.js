class Border {
    constructor(x, y, w, h) {
        var options = {
            friction: 0,
            frictionAir: 0,
            restitution: 1,
            isStatic: true
        }
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;

        World.add(world, this.body);
    }

    show() {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        fill(0,255,0);
        noStroke();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
        pop();
    }
}
