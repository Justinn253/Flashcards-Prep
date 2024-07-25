class iFlashcard {
  title: string;
  subject: string;
  definition: string[];
  hint: string;
  knowledgeLevel: string;
  meta: string;
  category: string;
  id: string

  constructor() {
    this.title = '';
    this.subject = '';
    this.definition = [];
    this.hint = '';
    this.knowledgeLevel = '';
    this.meta = '';
    this.category = '';
    this.id = '';
  }
}

export default iFlashcard;