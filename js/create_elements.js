
const d = document;
const $fragmenttoAddElements = d.createDocumentFragment();

//Tipo imagen
export const createElements = (classTemplateElement, classChildTemplate, classToAddElements, arrayElements, classToSet) => {
    const $templateElement = d.querySelector(classTemplateElement).content;
    const $childTemplate = $templateElement.querySelector(classChildTemplate);

    let counter = 1;
    arrayElements.forEach(element => {
        $childTemplate.setAttribute("src", element);
        $childTemplate.classList.add(classToSet)
        $childTemplate.dataset.id = counter;
        counter++;
        let clone = d.importNode($templateElement, true);
        $fragmenttoAddElements.appendChild(clone);

    });

    d.querySelector(classToAddElements).appendChild($fragmenttoAddElements);


}

// Elemento cart

export const createElementCart = (classTemplateElement, classChildTemplate, classToAddElements, data = {}) => {
    const $templateElement = d.querySelector(classTemplateElement).content;
    const $childTemplate = $templateElement.querySelector(classChildTemplate);
    const $childImage = $childTemplate.querySelector(".element__figure-thumbnail");
    const $childTitle = $childTemplate.querySelector(".element__title");
    const $childPrice = $childTemplate.querySelector(".element__price");
    const $childAmount = $childTemplate.querySelector(".element__amount");
    const $childTotal = $childTemplate.querySelector(".element__total");

    $childTemplate.dataset.title = data["title"];
    $childImage.setAttribute("src", data["img"]);
    $childTitle.textContent = data["title"];
    // $childTitle.textContent = data["title"].length > 15 ? data["title"].substring(0, 15) + "..." :data["title"];
    $childPrice.textContent = `$${data["price"]}`;
    $childAmount.textContent = data["amount"];
    $childTotal.textContent = `$${data["total"]()}`;

    let clone = d.importNode($templateElement, true);

    d.querySelector(classToAddElements).appendChild(clone);

}