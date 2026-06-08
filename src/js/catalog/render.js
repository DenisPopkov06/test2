import { CATEGORY_LABELS } from '../data/constants.js';
import { getInstructorImage } from '../utils/images.js';

export function createCourseCard(course) {
  const item = document.createElement('li');
  item.className = 'courses__item course-card';

  item.innerHTML = `
    <article class="course-card__inner">
      <div class="course-card__image">
        <img
          class="course-card__photo"
          src="${getInstructorImage(course.author, course.id)}"
          alt="${course.author}"
          loading="lazy"
          width="360"
          height="240"
        />
      </div>
      <div class="course-card__body">
        <span class="course-card__badge course-card__badge--${course.category}">
          ${CATEGORY_LABELS[course.category]}
        </span>
        <h3 class="course-card__title">${course.title}</h3>
        <footer class="course-card__footer">
          <span class="course-card__price">$${course.price}</span>
          <span class="course-card__divider"></span>
          <span class="course-card__author">by ${course.author}</span>
        </footer>
      </div>
    </article>
  `;

  return item;
}

export function initFilters(container, categoryOptions) {
  container.innerHTML = categoryOptions
    .map(
      ({ id, label }) => `
        <button
          type="button"
          class="courses__filter"
          data-category="${id}"
        >
          ${label}<sup class="courses__filter-count" data-count="${id}">0</sup>
        </button>
      `,
    )
    .join('');
}

export function updateFilters(container, { category, categoryCounts }) {
  container.querySelectorAll('.courses__filter').forEach((button) => {
    const isActive = button.dataset.category === category;
    button.classList.toggle('courses__filter--active', isActive);

    const countEl = button.querySelector('.courses__filter-count');
    if (countEl) {
      countEl.textContent = categoryCounts[button.dataset.category] ?? 0;
    }
  });
}

export function renderGrid(container, courses) {
  const fragment = document.createDocumentFragment();

  courses.forEach((course) => {
    fragment.appendChild(createCourseCard(course));
  });

  container.replaceChildren(fragment);
}

export function renderToggle(container, { hasMore, canCollapse }) {
  if (hasMore) {
    container.innerHTML = `
      <button class="courses__toggle" type="button" data-action="load-more">
        <span class="courses__toggle-icon">
          <img class="courses__toggle-img" src="src/assets/Load.svg" alt="" width="16" height="16" />
        </span>
        Load more
      </button>
    `;
    return;
  }

  if (canCollapse) {
    container.innerHTML = `
      <button class="courses__toggle" type="button" data-action="collapse">
        <span class="courses__toggle-icon courses__toggle-icon--collapsed">
          <img class="courses__toggle-img" src="src/assets/Load.svg" alt="" width="16" height="16" />
        </span>
        Show less
      </button>
    `;
    return;
  }

  container.innerHTML = '';
}
