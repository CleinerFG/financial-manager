import { StatementView } from "../../views/display/StatementView.js";
import pathUtil from "../../utils/PathManager.js";
import { getTheme } from "../../utils/domUtils.js";

export class StatementCtrl {
  #container;
  constructor(container) {
    this.#container = container;
    this.pathManager = pathUtil;
    this.#init();
  }

  pathHandler(state = "off") {
    const theme = getTheme();
    this.pathManager.updatePath(
      "asset",
      "#visibility-icon",
      `icons${theme}`,
      `icon-visibility-${state}.svg`
    );
  }

  #init() {
    const view = new StatementView(this.#container);
    view.render();
    this.pathHandler();
    view.switchVisibility(this.pathHandler.bind(this));
  }
}
