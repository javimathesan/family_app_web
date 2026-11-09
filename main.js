// Family App — sitio del producto

// ⚠️ CONFIGURACIÓN DEL FORMULARIO (ver README, sección "Formulario Avisame")
// Pegá acá el código de tu formulario de Formspree: lo que va después de /f/
// en la dirección que te da Formspree. Ejemplo: "xyzabcde".
const FORMSPREE_ID = "xljjyvql";

// ---------- Planilla interactiva del hero ----------
const TASKS = ["Hacer la cama", "Poner la mesa", "Lavarse los dientes"];
const DAYS = ["lunes", "martes", "miércoles", "jueves", "viernes"];
const GOAL = 10;
// Marcados de entrada para que la planilla no arranque vacía.
const PRESET = new Set(["0-0", "1-0", "0-1", "2-1"]);

const STAR = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17l-5.7 3.1 1.2-6.4L2.8 9.3l6.4-.8z" fill="#FFC83A" stroke="#1B2235" stroke-width="1.4" stroke-linejoin="round"/></svg>`;

const body = document.getElementById("chart-body");
const fill = document.querySelector(".goal-fill");
const bar = document.querySelector(".goal-bar");
const count = document.getElementById("goal-count");
const goalBox = document.querySelector(".goal");

if (body) {
  TASKS.forEach((task, r) => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "row";
    th.textContent = task;
    tr.appendChild(th);
    DAYS.forEach((day, c) => {
      const td = document.createElement("td");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cell";
      btn.innerHTML = STAR;
      btn.setAttribute("aria-label", `${task}, ${day}`);
      btn.setAttribute("aria-pressed", PRESET.has(`${c}-${r}`) ? "true" : "false");
      btn.style.setProperty("--tilt", `${Math.round(Math.random() * 30 - 15)}deg`);
      btn.addEventListener("click", () => {
        const on = btn.getAttribute("aria-pressed") === "true";
        btn.setAttribute("aria-pressed", on ? "false" : "true");
        update();
      });
      td.appendChild(btn);
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
  update();
}

function update() {
  const pts = document.querySelectorAll('.cell[aria-pressed="true"]').length;
  const shown = Math.min(pts, GOAL);
  fill.style.width = `${(shown / GOAL) * 100}%`;
  bar.setAttribute("aria-valuenow", String(shown));
  const done = pts >= GOAL;
  goalBox.classList.toggle("done", done);
  count.textContent = done
    ? "¡Premio ganado! El viernes elige Sofi."
    : `${pts} de ${GOAL} puntos`;
}

// ---------- Formulario "Avisame" ----------
const form = document.getElementById("signup-form");
const email = document.getElementById("email");
const msg = document.getElementById("form-msg");

function say(text, kind) {
  msg.className = `form-msg ${kind}`;
  msg.textContent = text;
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = email.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  email.setAttribute("aria-invalid", valid ? "false" : "true");
  if (!valid) {
    say("Revisá el correo: falta la @ o el dominio (por ejemplo nombre@correo.com).", "error");
    email.focus();
    return;
  }
  if (!FORMSPREE_ID) {
    say("El formulario todavía no está conectado. Probá de nuevo en unos días.", "error");
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  say("Enviando…", "");

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    if (res.ok) {
      const tester = document.getElementById("tester")?.checked;
      form.reset();
      say(
        tester
          ? "¡Listo! Te mandamos la invitación para probarla en los próximos días."
          : "¡Listo! Te escribimos el día del lanzamiento.",
        "ok"
      );
    } else if (res.status === 429) {
      say("Hubo muchos envíos seguidos. Esperá un minuto y probá de nuevo.", "error");
    } else {
      say("No se pudo enviar. Revisá el correo y probá de nuevo.", "error");
    }
  } catch {
    say("No se pudo enviar: revisá tu conexión a internet y probá de nuevo.", "error");
  } finally {
    button.disabled = false;
  }
});

// ---------- Año del pie ----------
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
