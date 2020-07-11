import customTableController from "./src/components/customTableController";
import _Vue from "vue";

customTableController.install = Vue => {
  if (!Vue) {
    window.Vue = Vue = _Vue;
  }
  Vue.component(customTableController.name, customTableController);
};
export default customTableController;
