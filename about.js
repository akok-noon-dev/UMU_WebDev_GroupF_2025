document.addEventListener('DOMContentLoaded', function () {
  var signupModalEl = document.getElementById('signupModal');
  var signupForm = document.getElementById('signupForm');
  var nameInput = document.getElementById('suName');
  var emailInput = document.getElementById('suEmail');
  var pwdInput = document.getElementById('suPassword');
  var submitBtn = signupForm ? signupForm.querySelector('button[type="submit"]') : null;

  // Makes  modal fullscreen on very small screens and autofocus name input
  if (signupModalEl) {
    signupModalEl.addEventListener('show.bs.modal', function () {
      var dialog = signupModalEl.querySelector('.modal-dialog');
      if (window.innerWidth < 576) dialog.classList.add('modal-fullscreen');
      else dialog.classList.remove('modal-fullscreen');
      setTimeout(function () { if (nameInput) nameInput.focus(); }, 200);
    });
  }

  // Adjust if window resized while modal open
  window.addEventListener('resize', function () {
    if (!signupModalEl) return;
    var dialog = signupModalEl.querySelector('.modal-dialog');
    if (signupModalEl.classList.contains('show')) {
      if (window.innerWidth < 576) dialog.classList.add('modal-fullscreen');
      else dialog.classList.remove('modal-fullscreen');
    }
  });

  if (!signupForm) return;

  // Enable/disable submit based on validity
  function checkFormValidity() {
    var valid = signupForm.checkValidity();
    if (submitBtn) submitBtn.disabled = !valid;
  }

  signupForm.addEventListener('input', function () {
    signupForm.classList.remove('was-validated');
    checkFormValidity();
  });

  // Submit handling: show spinner, simulate async, show success alert, close modal
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!signupForm.checkValidity()) {
      signupForm.classList.add('was-validated');
      var firstInvalid = signupForm.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    if (!submitBtn) return;

    var originalHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating...';

    // simulate async request
    setTimeout(function () {
      // show success alert inside modal body
      var modalBody = signupForm.querySelector('.modal-body');
      if (modalBody) {
        var alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.role = 'alert';
        alert.textContent = 'Account created (demo).';
        modalBody.prepend(alert);
      }

      // reset form state
      signupForm.reset();
      signupForm.classList.remove('was-validated');
      checkFormValidity();

      // close modal after short delay and cleanup
      setTimeout(function () {
        var bsModal = bootstrap.Modal.getInstance(signupModalEl);
        if (bsModal) bsModal.hide();
        if (submitBtn) submitBtn.innerHTML = originalHtml;
        if (modalBody) {
          var oldAlert = modalBody.querySelector('.alert');
          if (oldAlert) oldAlert.remove();
        }
      }, 1000);
    }, 900);
  });

  // Initial validity check
  checkFormValidity();

  // Small password show/hide toggle appended next to password input
  if (pwdInput) {
    var wrapper = document.createElement('div');
    wrapper.className = 'd-flex align-items-center';
    var parent = pwdInput.parentNode;
    parent.replaceChild(wrapper, pwdInput);
    wrapper.appendChild(pwdInput);
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'btn btn-outline-secondary btn-sm ms-2';
    toggle.textContent = 'Show';
    toggle.addEventListener('click', function () {
      if (pwdInput.type === 'password') { pwdInput.type = 'text'; toggle.textContent = 'Hide'; }
      else { pwdInput.type = 'password'; toggle.textContent = 'Show'; }
    });
    wrapper.appendChild(toggle);
  }
});
