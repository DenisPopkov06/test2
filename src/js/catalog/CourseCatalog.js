import { COURSES } from '../data/courses.js';
import {
  ALL_CATEGORY_ID,
  CATEGORIES,
  INITIAL_VISIBLE_COUNT,
} from '../data/constants.js';
import { filterCourses, getCategoryCounts } from '../utils/filterCourses.js';
import { debounce } from '../utils/debounce.js';
import {
  initFilters,
  renderGrid,
  appendGrid,
  renderEmpty,
  setGridBusy,
  renderToggle,
  updateFilters,
} from './render.js';

export class CourseCatalog {
  constructor(elements) {
    this.elements = elements;

    this.state = {
      category: ALL_CATEGORY_ID,
      search: '',
      visibleCount: INITIAL_VISIBLE_COUNT,
    };

    this.lastRenderedCount = 0;

    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);

    initFilters(this.elements.filters, CATEGORIES);

    this.applySearch = debounce((value) => {
      this.state.search = value;
      this.state.visibleCount = INITIAL_VISIBLE_COUNT;
      this.render();
    });

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
    this.elements.filters.addEventListener('click', this.handleFilterClick);
    this.elements.search.addEventListener('input', this.handleSearchInput);
    this.elements.toggle.addEventListener('click', this.handleToggleClick);
  }

  destroy() {
    this.elements.filters.removeEventListener('click', this.handleFilterClick);
    this.elements.search.removeEventListener('input', this.handleSearchInput);
    this.elements.toggle.removeEventListener('click', this.handleToggleClick);
  }

  handleFilterClick(event) {
    const button = event.target.closest('.courses__filter');
    if (!button) return;

    this.state.category = button.dataset.category;
    this.state.visibleCount = INITIAL_VISIBLE_COUNT;
    this.render();
  }

  handleSearchInput(event) {
    this.applySearch(event.target.value);
  }

  handleToggleClick(event) {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    if (button.dataset.action === 'load-more') {
      const appendFrom = this.lastRenderedCount;
      this.state.visibleCount += INITIAL_VISIBLE_COUNT;
      this.render({ appendFrom });
      return;
    }

    if (button.dataset.action === 'collapse') {
      this.state.visibleCount = INITIAL_VISIBLE_COUNT;
      this.render({ scrollToSection: true });
    }
  }

  render({ appendFrom, scrollToSection } = {}) {
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

    setGridBusy(this.elements.grid, true);
    renderEmpty(this.elements.empty, this.elements.grid, isEmpty);

    if (isEmpty) {
      this.elements.grid.replaceChildren();
      this.lastRenderedCount = 0;
    } else if (
      appendFrom != null &&
      appendFrom > 0 &&
      appendFrom < visible.length
    ) {
      appendGrid(this.elements.grid, visible, appendFrom);
      this.lastRenderedCount = visible.length;
    } else {
      renderGrid(this.elements.grid, visible);
      this.lastRenderedCount = visible.length;
    }

    setGridBusy(this.elements.grid, false);
    renderToggle(this.elements.toggle, { hasMore, canCollapse });

    if (scrollToSection && this.elements.section) {
      this.elements.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
