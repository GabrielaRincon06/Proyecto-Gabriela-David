/**
 * ============================================================
 *  Software Cost Estimator — estimator.js
 *  Motor interactivo de cálculo de costos y persistencia de wizard
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const rutaActual = window.location.pathname;

  // ------------------------------------------------------------
  // 1. PASO 2: SELECCIÓN DE PLATAFORMA (index2.html)
  // ------------------------------------------------------------
  if (rutaActual.includes('index2.html')) {
    inicializarPaso2();
  }

  // ------------------------------------------------------------
  // 2. PASO 3: DETALLE DE COSTOS (index3.html)
  // ------------------------------------------------------------
  if (rutaActual.includes('index3.html')) {
    inicializarPaso3();
  }

  // ------------------------------------------------------------
  // 3. PASO 4: RESUMEN Y CONTACTO (index4.html)
  // ------------------------------------------------------------
  if (rutaActual.includes('index4.html')) {
    inicializarPaso4();
  }
});

// COSTOS BASE POR PLATAFORMA (USD)
const PRECIOS_PLATAFORMAS = {
  'Web':     { base: 12000, horas: 180 },
  'iOS':     { base: 16000, horas: 240 },
  'Android': { base: 15000, horas: 220 }
};

function inicializarPaso2() {
  const checkboxes = document.querySelectorAll('.opciones input[type="checkbox"]');
  const guardadas = JSON.parse(sessionStorage.getItem('cotizador_plataformas') || '[]');

  checkboxes.forEach(chk => {
    const card = chk.closest('.Estilo-label')?.querySelector('.card1');
    const titulo = card?.querySelector('h2')?.textContent.trim() || '';

    // Restaurar estado guardado
    if (guardadas.includes(titulo)) {
      chk.checked = true;
      if (card) card.style.borderColor = '#00e5ff';
    }

    chk.addEventListener('change', () => {
      if (card) {
        card.style.borderColor = chk.checked ? '#00e5ff' : '';
        card.style.boxShadow = chk.checked ? '0 0 15px rgba(0, 229, 255, 0.4)' : '';
      }
      guardarPlataformasSeleccionadas();
    });
  });
}

function guardarPlataformasSeleccionadas() {
  const seleccionadas = [];
  document.querySelectorAll('.opciones input[type="checkbox"]').forEach(chk => {
    if (chk.checked) {
      const titulo = chk.closest('.Estilo-label')?.querySelector('.card1 h2')?.textContent.trim();
      if (titulo) seleccionadas.push(titulo);
    }
  });

  // Si no seleccionó ninguna, se asigna 'Web' por defecto
  if (seleccionadas.length === 0) {
    seleccionadas.push('Web');
  }

  sessionStorage.setItem('cotizador_plataformas', JSON.stringify(seleccionadas));
}

function inicializarPaso3() {
  // Asegura que las selecciones existan
  if (!sessionStorage.getItem('cotizador_plataformas')) {
    sessionStorage.setItem('cotizador_plataformas', JSON.stringify(['Web']));
  }
}

function inicializarPaso4() {
  const plataformas = JSON.parse(sessionStorage.getItem('cotizador_plataformas') || '["Web"]');

  // Calcular total dinámico
  let costoTotal = 0;
  let horasTotales = 0;

  plataformas.forEach(p => {
    const item = PRECIOS_PLATAFORMAS[p] || { base: 10000, horas: 150 };
    costoTotal += item.base;
    horasTotales += item.horas;
  });

  // Descuento por stack múltiple si eligió más de 1 plataforma
  let factorSinergia = plataformas.length > 1 ? 0.85 : 1.0;
  costoTotal = Math.round(costoTotal * factorSinergia);
  horasTotales = Math.round(horasTotales * factorSinergia);

  const semanasEstimadas = Math.max(4, Math.ceil(horasTotales / 40));

  // Inyectar tarjeta interactiva de resumen antes del formulario
  const contenedor = document.querySelector('.div1');
  if (contenedor) {
    const resumenCard = document.createElement('div');
    resumenCard.className = 'resumen-cotizacion-dinamico';
    resumenCard.style.background = 'rgba(10, 61, 98, 0.85)';
    resumenCard.style.border = '1px solid #00e5ff';
    resumenCard.style.borderRadius = '12px';
    resumenCard.style.padding = '1.5rem';
    resumenCard.style.marginBottom = '2rem';
    resumenCard.style.color = '#ffffff';
    resumenCard.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';

    resumenCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 0.8rem; margin-bottom: 1rem;">
        <h3 style="color: #00e5ff; margin: 0; font-size: 1.2rem;">📊 Resumen de tu Estimación</h3>
        <span style="background: rgba(0, 229, 255, 0.2); color: #00e5ff; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: bold;">Calculado en tiempo real</span>
      </div>
      <p style="margin-bottom: 0.5rem;"><strong>Plataformas seleccionadas:</strong> ${plataformas.join(', ')}</p>
      <p style="margin-bottom: 0.5rem;"><strong>Tiempo estimado de desarrollo:</strong> ~${semanasEstimadas} semanas (${horasTotales} horas de ingeniería)</p>
      <div style="margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.3); border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 1.1rem; color: #dfe6e9;">Presupuesto Estimado:</span>
        <span style="font-size: 1.6rem; color: #00e5ff; font-weight: bold;">$${costoTotal.toLocaleString('en-US')} USD</span>
      </div>
      <p style="font-size: 0.8rem; color: #b2bec3; margin-top: 0.8rem; margin-bottom: 0;">* Incluye diseño UX/UI, desarrollo frontend, backend y QA.</p>
    `;

    const tituloContacto = contenedor.querySelector('.titulo-seccion');
    if (tituloContacto) {
      contenedor.insertBefore(resumenCard, tituloContacto);
    }
  }

  // Manejo interactivo del formulario
  const form = document.querySelector('.formulario');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre')?.value.trim();
      const correo = document.getElementById('correo')?.value.trim();

      if (!nombre || !correo) {
        alert('Por favor completa tu nombre y correo.');
        return;
      }

      form.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #fff;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
          <h3 style="color: #00e5ff; margin-bottom: 0.5rem;">¡Solicitud Enviada con Éxito!</h3>
          <p style="color: #dfe6e9;">Gracias, <strong>${nombre}</strong>. Hemos generado la estimación preliminar por <strong>$${costoTotal.toLocaleString('en-US')} USD</strong> y enviado el desglose formal a <strong>${correo}</strong>.</p>
          <a href="./index1.html" class="nav-completo" style="display: inline-block; margin-top: 1.5rem; text-decoration: none; padding: 10px 20px; border-radius: 8px; background: #00e5ff; color: #000; font-weight: bold;">Nueva Cotización</a>
        </div>
      `;
    });
  }
}
