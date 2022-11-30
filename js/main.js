import { createElements, createElementCart } from "../js/create_elements.js";
import { fetchData } from "../js/load_data.js";
import { Slider } from "../js/slider.js";

const d = document;
let data;
let mainSlider = new Slider(d, ".images-main", "block");
let secondarySlider = new Slider(d, ".images-secondary", "block");
let cart = [];
let counter = 0;

const addRemoveBorder = (target, classElements, classToAddRemove, withIndex, index = 0) => {

    const $elements = d.querySelectorAll(classElements);
    $elements.forEach((el) => {
        el.classList.remove(classToAddRemove);
    });
    if (!withIndex) {
        target.classList.add(classToAddRemove);
    } else {
        $elements[index - 1].classList.add(classToAddRemove);
    }
}


d.addEventListener("DOMContentLoaded", async e => {

    data = await fetchData();
    createElements(
        ".template-slider__image",
        ".slider__image",
        ".slider__images",
        data.images,
        "images-main");

    createElements(
        ".template-slider__image-thumbnail",
        ".slider__image-thumbnail",
        ".slider__thumbnails",
        data.imagesthumbnail,
        "images-main-th"
    );

    mainSlider.sliders(1);

    createElements(
        ".template-images-sample__image",
        ".images-sample__image",
        ".images-sample__main",
        data.images,
        "images-secondary"
    );

    createElements(
        ".template-images-sample__image-tb",
        ".images-sample__image-tb",
        ".images-sample__thumbnail",
        data.imagesthumbnail,
        "images-secondary-th"
    );

    secondarySlider.sliders(1)

    addRemoveBorder(null, ".images-sample__figure-tb", "thumbnail-border-active", true, 1)

    addRemoveBorder(null, ".slider__figure-tb", "thumbnail-border-active", true, 1)

});

d.addEventListener("click", e => {


    const $cartElements = d.querySelector(".cart-elements");
    const $amountText = d.querySelector(".amount__text");

    if (e.target.matches(".menu__image") || e.target.matches(".menu__image *")) {
        d.querySelector(".nav").classList.add("show-menu");
    }

    if (e.target.matches(".nav__close") ||
        e.target.matches(".nav__close *")) {
        d.querySelector(".nav").classList.remove("show-menu");
    }

    if (!(e.target.matches(".cart-elements") ||
        e.target.matches(".cart-elements *"))) {
        $cartElements.classList.remove("show-element");
    }

    if (e.target.matches(".cart__image") ||
        e.target.matches(".cart__image *")) {
        $cartElements.classList.add("show-element")
    }

    if (e.target.matches(".avatar") ||
        e.target.matches(".avatar *")) {
        d.querySelector(".avatar__image").classList.add("avatar--active")
    }

    if (!(e.target.matches(".avatar") ||
        e.target.matches(".avatar *"))) {
            d.querySelector(".avatar__image").classList.remove("avatar--active")
    }

    if (e.target.matches(".remove")) {

        const $element = e.target.closest(".element");
        let nameElement = $element.dataset.title;

        cart = cart.filter(el => el.title !== nameElement);
        d.querySelector(".cart-elements__list").removeChild($element);

        d.querySelector(".cart-elements__list").classList.remove("cart-elements__list--start")
        d.querySelector(".cart-elements__message").classList.remove("hidden-element");
        d.querySelector(".cart__counter").textContent = cart.length;
        d.querySelector(".cart__counter").classList.remove("show-element"); d.querySelector(".button-checkout").classList.add("button-hidden");

    }

    if (e.target.matches(".images-sample__figure-tb")) {
        addRemoveBorder(e.target, ".images-sample__figure-tb", "thumbnail-border-active", false)
    }

    if (e.target.matches(".slider__figure-tb")) {
        addRemoveBorder(e.target, ".slider__figure-tb", "thumbnail-border-active", false)
    }

    if (e.target.matches(".amount__decrease") ||
        e.target.matches(".amount__decrease *")) {
        if (counter > 0)
            counter--;
        $amountText.textContent = counter;
    }
    if (e.target.matches(".amount__increase") ||
        e.target.matches(".amount__increase *")) {
        counter++;
        $amountText.textContent = counter;
    }

    if (e.target.matches(".button--add") || e.target.matches(".button--add *")) {

        let product = {
            img: data.imagesthumbnail[0],
            title: data.title,
            price: (Math.round((data.price * data.discount | 1) / 100)).toFixed(2),
            amount: counter,
            total: function () {
                return (this.price * this.amount).toFixed(2);
            }
        };

        const addProduct = () => {
            cart.push(product);
        }

        let newProduct = true;

        if (counter === 0)
            return;

        if (cart.length === 0) {

            addProduct();
            d.querySelector(".cart-elements__list").classList.add("cart-elements__list--start")
            d.querySelector(".cart-elements__message").classList.add("hidden-element");
            d.querySelector(".cart__counter").textContent = cart.length;
            d.querySelector(".cart__counter").classList.add("show-element"); d.querySelector(".button-checkout").classList.remove("button-hidden");
            createElementCart(".template-element", ".element", ".cart-elements__list", product);

        } else {
            cart.forEach(el => {
                if (data.title === el.title) {
                    el.amount = el.amount + counter;
                    d.querySelectorAll(["[data-title]"]).
                        forEach(elementCart => {
                            elementCart.querySelector(".element__amount").textContent = el.amount;
                            elementCart.querySelector(".element__total").textContent = el.total();
                        });
                    newProduct = false;
                }
            });

            if (newProduct) {
                addProduct();
            }


        }

        counter = 0;
        $amountText.textContent = counter;
    }

    if (e.target.matches(".button-slider--left") ||
        e.target.matches(".button-slider--left *")) {
        mainSlider.buttonLeft();
        addRemoveBorder(null, ".slider__figure-tb", "thumbnail-border-active", true, mainSlider.initialIndex)
    }
    if (e.target.matches(".button-slider--right") ||
        e.target.matches(".button-slider--right *")) {
        mainSlider.buttonRight();
        addRemoveBorder(null, ".slider__figure-tb", "thumbnail-border-active", true, mainSlider.initialIndex)
    }

    if (e.target.matches(".images-sample__image")) {
        const $slider = d.querySelector(".slider");
        $slider.classList.add("show-element");
    }

    if (e.target.matches(".images-sample__figure-tb")) {
        let id = parseInt(e.target.firstElementChild.dataset.id);
        secondarySlider.initialIndex = id;
        secondarySlider.sliders(id)
    }

    if (e.target.matches(".slider__figure-tb")) {
        let id = parseInt(e.target.firstElementChild.dataset.id);
        mainSlider.initialIndex = id;
        mainSlider.sliders(id)
    }

    if (e.target.matches(".slider__image-close")) {
        const $slider = d.querySelector(".slider");
        $slider.classList.remove("show-element");

    }

});

