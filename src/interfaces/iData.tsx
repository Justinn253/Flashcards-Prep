import iCategory from "./iCategory";

class iData {
  categories: iCategory;

  constructor() {
    this.categories = new iCategory();
  }
}

export default iData;