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

  // Contact form → Web3Forms (wysyłka na biuro@washpro.pl)
  var form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var note = form.querySelector('.form-note');
      var original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Wysyłanie…';
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.success) {
            btn.textContent = 'Wysłano ✓';
            if (note) { note.textContent = 'Dziękujemy! Twoje zapytanie zostało wysłane — odezwiemy się wkrótce.'; note.classList.add('show'); }
            form.reset();
          } else {
            btn.disabled = false;
            btn.textContent = original;
            if (note) { note.textContent = 'Nie udało się wysłać. Zadzwoń: 536 138 985 lub napisz na biuro@washpro.pl.'; note.classList.add('show'); }
          }
        })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = original;
          if (note) { note.textContent = 'Błąd połączenia. Zadzwoń: 536 138 985 lub napisz na biuro@washpro.pl.'; note.classList.add('show'); }
        });
    });
  }
})();
