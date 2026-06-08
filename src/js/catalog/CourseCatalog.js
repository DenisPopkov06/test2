import { COURSES } from '../data/courses.js';
import {
  CATEGORY_OPTIONS,
  INITIAL_VISIBLE_COUNT,
} from '../data/constants.js';
import { filterCourses, getCategoryCounts } from '../utils/filterCourses.js';
import { initFilters, renderGrid, renderToggle, updateFilters } from './render.js';

export class CourseCatalog {
  constructor(elements) {
    this.elements = elements;

    this.state = {
      category: 'all',
      search: '',
      visibleCount: INITIAL_VISIBLE_COUNT,
    };

    initFilters(this.elements.filters, CATEGORY_OPTIONS);
    this.bindEvents();
    this.render();
  }

  getFilteredCourses() {
    return filterCourses(COURSES, this.state.category, this.state.search);
  }

  getCategoryCounts() {
    return getCategoryCounts(COURSES, this.state.search);
  }

  bindEvents() {
    this.elements.filters.addEventListener('click', (event) => {
      const button = event.target.closest('.courses__filter');
      if (!button) return;

      this.state.category = button.dataset.category;
      this.state.visibleCount = INITIAL_VISIBLE_COUNT;
      this.render();
    });

    this.elements.search.addEventListener('input', (event) => {
      this.state.search = event.target.value;
      this.state.visibleCount = INITIAL_VISIBLE_COUNT;
      this.render();
    });

    this.elements.toggle.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action]');
      if (!button) return;

      if (button.dataset.action === 'load-more') {
        this.state.visibleCount += INITIAL_VISIBLE_COUNT;
        this.render();
        return;
      }

      if (button.dataset.action === 'collapse') {
        this.state.visibleCount = INITIAL_VISIBLE_COUNT;
        this.render();
      }
    });
  }

  render() {
    const filtered = this.getFilteredCourses();
    const visible = filtered.slice(0, this.state.visibleCount);
    const hasMore = filtered.length > this.state.visibleCount;
    const canCollapse =
      !hasMore && this.state.visibleCount > INITIAL_VISIBLE_COUNT;
    const isEmpty = filtered.length === 0;

    updateFilters(this.elements.filters, {
      category: this.state.category,
      categoryCounts: this.getCategoryCounts(),
    });

    this.elements.empty.hidden = !isEmpty;
    this.elements.grid.hidden = isEmpty;

    if (isEmpty) {
      this.elements.grid.replaceChildren();
    } else {
      renderGrid(this.elements.grid, visible);
    }

    renderToggle(this.elements.toggle, { hasMore, canCollapse });
  }
}
