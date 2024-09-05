export class InputView {
  #element;
  #htmlStr;
  constructor(container, id, labelText, placeholder) {
    this.container = container;
    this.id = id;
    this.labelText = labelText;
    this.placeholder = placeholder;
    this.#element = document.getElementById(id);
  }

  buildDefault() {
    this.#htmlStr = `
    <div class="form-group__input-group">
      <label for="${this.id}" class="label form-group__label">${this.labelText}</label>
      <input id="${this.id}" type="${this.type}" name="${this.id}" placeholder="${this.placeholder}" aria-label="${this.labelText}"
      class="input form-group__input">
      <span id="${this.id}-error"></span>
    </div>
    `;
  }

  buildSubmit() {
    this.#htmlStr = `
    <input id="${id}" class="btn btn-action" type="submit" value="${this.labelText}">
    `;
  }

  buildSearch() {
    this.#htmlStr = `
    <div class="form-group__input-group">
      <label for="${this.id}" class="label form-group__label">${this.labelText}</label>
      <div class="input__container">
        <input id="${this.id}" type="text" name="${this.id}" placeholder="${this.placeholder}" aria-label="${this.labelText}"
        class="input form-group__input">
        <ul class="research-list" id="research-list-${this.id}"></ul>
      </div>
      <span id="${this.id}-error"></span>
    </div>
    `;
  }

  validateFail(callBackValidator) {
    this.#element.addEventListener("blur", (e) => {
      const value = e.target.value;
      console.log(callBackValidator(value));
      if (callBackValidator(value)) {
        e.target.classList.add("inp-error");
        return;
      }
      e.target.classList.remove("inp-error");
    });
  }

  validateMonetary() {
    this.#element.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      value = (value / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      e.target.value = value;
    });
  }

  render() {
    this.container.insertAdjacentHTML("beforeend", this.#htmlStr);
  }
}
