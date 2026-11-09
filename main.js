// Family App — sitio del producto

// ⚠️ Cambiá esto por el correo donde querés recibir los pedidos de aviso,
// o reemplazá el envío por un servicio de formularios (ver README).
const CONTACT_EMAIL = "hola@familyapp.example";

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

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = email.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  email.setAttribute("aria-invalid", valid ? "false" : "true");
  if (!valid) {
    msg.className = "form-msg error";
    msg.textContent = "Revisá el correo: falta la @ o el dominio (por ejemplo nombre@correo.com).";
    email.focus();
    return;
  }
  const subject = encodeURIComponent("Avisame cuando salga Family App");
  const bodyText = encodeURIComponent(`Quiero que me avisen del lanzamiento a: ${value}`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${bodyText}`;
  msg.className = "form-msg ok";
  msg.textContent = "Listo, se abrió tu correo para enviar el pedido.";
});

// ---------- Año del pie ----------
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
