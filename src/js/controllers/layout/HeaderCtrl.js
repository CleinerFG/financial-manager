import { LayoutCtrl } from "./LayoutCtrl.js";
import { HeaderView } from "../../views/layout/HeaderView.js";
import { getTheme } from "../../utils/domUtils.js";

export class HeaderCtrl extends LayoutCtrl {
  constructor() {
    super(new HeaderView());
  }

  #defineAssetpath() {
    const theme = getTheme();
    this.pathManager.updatePath(
      "asset",
      ".header__menu-icon",
      `icons${theme}`,
      "icon-menu.svg"
    );

    this.pathManager.updatePath(
      "asset",
      "#theme-icon",
      `icons${theme}`,
      `icon-theme.svg`
    );
  }

  #defineHtmlPath() {
    this.pathManager.updatePath(
      "html",
      ".header__brand-name",
      "home",
      "index.html"
    );
  }

  _pathHandler() {
    this.#defineAssetpath();
    this.#defineHtmlPath();
  }

  _listenersHandler() {
    this.layoutView.menuHandler();
  }
}
