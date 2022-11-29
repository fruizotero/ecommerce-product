
export class Slider {


    constructor(document = document, classIdElement, valueDisplay) {
        this.initialIndex = 1;
        this.document = document;
        this.classIdElement = classIdElement;
        this.valueDisplay = valueDisplay;
    }

    sliders(index) {

        let $element = this.document.querySelectorAll(this.classIdElement);
        
        if (index > $element.length) {
            this.initialIndex = 1;
        }

        if (index < 1) {
            this.initialIndex = $element.length
        }

        $element.forEach
            (el => el.style.display = "none");

        $element[this.initialIndex - 1].style.display = this.valueDisplay;

    }

    buttonLeft() {
        this.sliders(this.initialIndex -= 1)

    }
    buttonRight() {
        this.sliders(this.initialIndex += 1)

    }

}