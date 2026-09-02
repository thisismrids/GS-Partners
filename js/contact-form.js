document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('contact-submit');

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  const fields = {
    name: {
      el: document.getElementById('name'),
      validate: (v) => v.trim().length > 0,
      message: 'Please enter your name.',
    },
    email: {
      el: document.getElementById('email'),
      validate: (v) => v.trim().length > 0 && isValidEmail(v),
      message: 'Please enter a valid email address.',
    },
    company: {
      el: document.getElementById('company'),
      validate: (v) => v.trim().length > 0,
      message: 'Please tell us your company and category.',
    },
  };

  function showError(name, message) {
    fields[name].el.classList.add('invalid');
    const errorEl = document.getElementById(name + '-error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(name) {
    fields[name].el.classList.remove('invalid');
    const errorEl = document.getElementById(name + '-error');
    if (errorEl) errorEl.textContent = '';
  }

  function validateField(name) {
    const field = fields[name];
    if (!field.validate(field.el.value)) {
      showError(name, field.message);
      return false;
    }
    clearError(name);
    return true;
  }

  Object.keys(fields).forEach((name) => {
    const el = fields[name].el;
    el.addEventListener('blur', () => validateField(name));
    el.addEventListener('input', () => {
      if (el.classList.contains('invalid')) validateField(name);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let allValid = true;
    Object.keys(fields).forEach((name) => {
      if (!validateField(name)) allValid = false;
    });

    status.className = 'form-status';
    status.textContent = '';

    if (!allValid) {
      status.textContent = 'Please fix the highlighted fields.';
      status.className = 'form-status error';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        status.textContent = "Thanks, that's in. We'll reply within two business days.";
        status.className = 'form-status success';
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      status.textContent = 'Something went wrong. Please email us directly at hello@gspartners.co.';
      status.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send it over';
    }
  });
});
