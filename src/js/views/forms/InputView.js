export class InputView {
  #container; // DOM element
  #id; // String
  #inputmode; //String
  #category; // String
  #strictRules; // Array
  #formatter; // String
  #labelText; // String
  #placeholder; // String
  #htmlStr; // String
  #inputElement; // DOM element
  #strictMethods = {
    number: () => {
      this.#inputElement.addEventListener("input", (ev) => {
        let value = ev.target.value.replace(/\D/g, "");
        ev.target.value = value;
      });
    },
  };
  #formatterMethods = {
    monetary: () => {
      this.#inputElement.addEventListener("input", (e) => {
        console.log(e.target.value);
        let value = e.target.value;
        value = (value / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        e.target.value = value;
      });
    },
    percentage: () => {
      // Format in percentage -> 0,00%
    },
  };
  constructor(
    container,
    id,
    inputmode,
    category,
    strictRules,
    formatter,
    labelText,
    placeholder
  ) {
    this.#container = container;
    this.#id = id;
    this.#inputmode = inputmode ?? "text";
    this.#category = category;
    this.#strictRules = strictRules;
    this.#formatter = formatter;
    this.#labelText = labelText;
    this.#placeholder = placeholder;
  }

  get inputElement() {
    return this.#inputElement;
  }

  get #inputCategory() {
    return {
      default: `
        <div class="form-group__input-group">
          <label for="${this.#id}" class="label form-group__label">${this.#labelText
        }</label>
          <input id="${this.#id}" type="text" inputmode="${this.#inputmode}" name="${this.#id
        }" placeholder="${this.#placeholder}" aria-label="${this.#labelText}"
            class="input form-group__input">
          <span id="${this.#id}-error"></span>
        </div>`,

      submit: `
        <input id="${this.#id}" class="btn btn-action" type="submit" value="${this.#labelText
        }">`,

      search: `
        <div class="form-group__input-group">
          <label for="${this.#id}" class="label form-group__label">${this.#labelText
        }</label>
          <div class="input__container">
            <input id="${this.#id}" type="text" name="${this.#id
        }" placeholder="${this.#placeholder}" aria-label="${this.#labelText}"
              class="input form-group__input">
            <ul class="research-list" id="research-list-${this.#id}"></ul>
          </div>
          <span id="${this.#id}-error"></span>
        </div>`,
    };
  }

  #build() {
    this.#htmlStr = this.#inputCategory[this.#category];
  }

  #render() {
    this.#container.insertAdjacentHTML("beforeend", this.#htmlStr);
  }

  #defineGetterDomElement() {
    this.#inputElement = document.getElementById(this.#id);
  }

  #failValidationHandler(method) {
    const actions = {
      add: () => this.#inputElement.classList.add("inp-error"),
      remove: () => this.#inputElement.classList.remove("inp-error"),
    };

    actions[method]();
  }

  #validate(customRule = () => { }) {
    this.#inputElement.addEventListener("blur", (ev) => {
      const value = ev.target.value;
      if (value === "" || customRule(value)) {
        console.log(`Value in ${this.#id} - inside: ${value}`);
        this.#failValidationHandler("add");
        return;
      }
      this.#failValidationHandler("remove");
    });
  }

  #defineStrictRules() {
    if (this.#strictRules) {
      this.#strictRules.forEach((rule) => {
        this.#strictMethods[rule]();
      });
    }
  }

  #defineFormatter() {
    if (this.#formatter) {
      this.#formatterMethods[this.#formatter]();
    }
  }

  init() {
    this.#build();
    this.#render();
    this.#defineGetterDomElement();
    this.#validate();
    this.#defineStrictRules();
    this.#defineFormatter();
  }
}
