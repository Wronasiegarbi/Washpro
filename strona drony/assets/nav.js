// WashPro — drobne interakcje
(function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var a = item.querySelector('.faq-a');
      var open = item.classList.toggle('open');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : null;
    });
  });

  // Gallery filter chips
  var chips = document.querySelectorAll('.chip');
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var cat = chip.dataset.cat;
        document.querySelectorAll('.gallery-item').forEach(function (item) {
          var show = cat === 'all' || item.dataset.cat === cat;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // Contact form (demo)
  var form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if (note) note.classList.add('show');
      form.querySelector('button[type="submit"]').textContent = 'Wysłano ✓';
    });
  }
})();
