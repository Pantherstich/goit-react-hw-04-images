import axios from 'axios';

export default class SearchService {
  constructor(searchQuery, page) {
    this.key = '39907468-6fc82bf280496c4ab5c23ac18';
    this.baseUrl = 'https://pixabay.com/api/';
    this.value = searchQuery;
    this.page = page;
  }

  async fetchImg() {
    try {
      const resp = await axios.get(
        `${this.baseUrl}?q=${this.value}&page=${this.page}&key=${this.key}&image_type=photo&orientation=horizontal&per_page=${this.perPage}`
      );

      this.incrementPage();
      return resp.data;
    } catch (error) {
      throw error;
    }
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
