class Popup {
    constructor(img) {
        this.img = img;
        let w = windowWidth / 2;
        let h = w * 0.6;
        let popup = createCanvas(w, h);
        popup_canvas.class('pop');
        popup_canvas.hide();
        popup_canvas.position(windowWidth / 2 - w/2, windowHeight / 2 - h/2);
        this.canvas = popup_canvas;
    }

    show() {
        this.canvas.show();
        fill(125);
        let w = windowWidth / 2;
        let h = w * 0.6;
        rectMode(CENTER);
        rect(width / 2, height / 2, width, height);

        // show big bubbleElement

        // show citation info if any

        // close button
    }

    remove() {
        this.canvas.remove();
    }
}
