import iFlashcard from "./iFlashcard";

class iCategory {
  fundamentals: iFlashcard[];
  frontend: iFlashcard[];
  dsa: iFlashcard[];
  general: iFlashcard[];

  constructor() {
    this.fundamentals = [];
    this.frontend = [];
    this.dsa = [];
    this.general = [];
  }
}

export default iCategory;