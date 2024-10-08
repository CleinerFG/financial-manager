import { PageView } from "../../../../js/views/PageView.js";
import { capitalize } from "../../../../js/utils/stringUtils.js";

export class HomePageView extends PageView {
  _buidStatement() {
    return `
    <section class="section statement">
      <h1 class="section__h1 statement__title">Financial Statement</h1>
      <div class="statement__container"></div>
    </section>
    `;
  }

  _buildActionSection(name) {
    return `
    <section class="section ${name}">
      <h2 class="section__h2">${capitalize(name)}</h2>
      <div class="cards-container">
        <div class="cards ${name}__cards">
        </div>
      </div>
    </section>
    `;
  }

  _buildEventsSection(name) {
    return `
    <section class="section events">
      <h2 class="section__h2">Events</h2>
      <div class="cards events__cards">
      </div>
    </section>
    `;
  }

  _build() {
    const actionSections = ["loans", "investments"];
    const statement = this._buidStatement();
    const actions = actionSections
      .map((sec) => this._buildActionSection(sec))
      .join("");
    const events = this._buildEventsSection();
    return statement + actions + events;
  }

  _pageContent() {
    const content = `
      ${this._build()}
    `;
    return content;
  }
}
