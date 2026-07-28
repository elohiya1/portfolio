document.addEventListener('DOMContentLoaded', function () {
  var openers = document.querySelectorAll('[data-modal]');
  var closers = document.querySelectorAll('[data-close]');

  function closeAll() {
    document.querySelectorAll('.lightbox').forEach(function (m) {
      m.hidden = true;
    });
    document.body.style.overflow = '';
  }

  openers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = document.getElementById('modal-' + btn.getAttribute('data-modal'));
      if (modal) {
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closers.forEach(function (el) {
    el.addEventListener('click', closeAll);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });
});
