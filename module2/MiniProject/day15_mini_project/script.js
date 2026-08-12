
(function () {
  'use strict';

  const form = document.querySelector('.panel form');
  if (!form) return;

  const nameField = document.getElementById('contact-name');
  const emailField = document.getElementById('contact-email');
  const messageField = document.getElementById('contact-message');
  const submitButton = form.querySelector('button[type="submit"]');

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Build a status region for screen-reader-friendly feedback
  const statusRegion = document.createElement('p');
  statusRegion.className = 'form-status';
  statusRegion.setAttribute('role', 'status');
  statusRegion.setAttribute('aria-live', 'polite');
  form.appendChild(statusRegion);

  function clearFieldError(field) {
    field.removeAttribute('aria-invalid');
    const existing = document.getElementById(field.id + '-error');
    if (existing) existing.remove();
  }

  function setFieldError(field, message) {
    field.setAttribute('aria-invalid', 'true');
    let errorEl = document.getElementById(field.id + '-error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.id = field.id + '-error';
      errorEl.className = 'field-error';
      field.insertAdjacentElement('afterend', errorEl);
    }
    errorEl.textContent = message;

    const describedBy = field.getAttribute('aria-describedby');
    if (!describedBy || !describedBy.includes(errorEl.id)) {
      field.setAttribute(
        'aria-describedby',
        describedBy ? describedBy + ' ' + errorEl.id : errorEl.id
      );
    }
  }

  function validateField(field) {
    const value = field.value.trim();

    if (field.hasAttribute('required') && value === '') {
      setFieldError(field, 'This field is required.');
      return false;
    }

    if (field === emailField && value !== '' && !EMAIL_PATTERN.test(value)) {
      setFieldError(field, 'Please enter a valid email address.');
      return false;
    }

    clearFieldError(field);
    return true;
  }

  [nameField, emailField, messageField].forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const isNameValid = validateField(nameField);
    const isEmailValid = validateField(emailField);
    const isMessageValid = validateField(messageField);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      statusRegion.textContent = 'Please fix the highlighted fields and try again.';
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    statusRegion.textContent = 'Sending your message…';

    // Placeholder for a real submission (e.g. fetch to an API endpoint).
    // Replace this timeout with an actual fetch() call when a backend exists.
    setTimeout(function () {
      form.reset();
      submitButton.disabled = false;
      submitButton.textContent = 'Send message';
      statusRegion.textContent =
        'Thanks! Your message has been sent. We\u2019ll get back to you soon.';
    }, 800);
  });
})();