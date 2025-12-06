// Configuración e inicialización
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Cache de iconos locales
const localIcons = {};
[
  'hhha', 'ssasur', 'lab', 'test', 'synapse', 'ray', 'pathient', 'onco', 
  'sangre', 'inthhha', 'otros', 'firma', 'bacteria', 'urgencia', 'tmt', 
  'farmaco', 'embarazo', 'phone'
].forEach(icon => {
  localIcons[icon] = chrome.runtime.getURL(`images/${icon}.png`);
});

// Estructura de menús optimizada
const menuStructure = [
  { icon: '🏥', iconKey: 'hhha', text: 'HIS HHHA', url: 'http://10.6.84.181/login' },
  { icon: '🔐', iconKey: 'ssasur', text: 'SSASUR', url: 'https://login.ssasur.cl/' },
  { icon: '🧪', iconKey: 'lab', text: 'Laboratorio Clínico', url: 'https://labsiel.araucaniasur.cl/' },
  { icon: '📄', iconKey: 'test', text: 'Extractor de Exámenes', url: 'https://notionmedufro.github.io/ExtractorHIS/' },
  { icon: '💻', iconKey: 'synapse', text: 'Synapse', url: 'https://synapsetmc.synapsetimed.cl/SynapseSignOn/sts/login?signin=14a58d1722d1162a247c17de113ea731' },
  { icon: '📷', iconKey: 'ray', text: 'Ovijam', url: 'http://10.7.200.101:8080/oviyam2/' },
  { icon: '🔬', iconKey: 'pathient', text: 'Pathient', url: 'http://10.6.84.155/Pathient/' },
  { icon: '🎗️', iconKey: 'onco', text: 'Cómite Oncológico', url: 'https://sistemas.hhha.cl/#/login' },
  { icon: '🩸', iconKey: 'sangre', text: 'Banco de Sangre', url: 'http://10.6.84.191/proyectos/consultaBancoSangre/' },
  { icon: '📚', iconKey: 'inthhha', text: 'Internado HHHA', url: 'https://inthhha.notion.site/' },
  { 
    icon: '⚙️', iconKey: 'otros', text: 'Otros HHHA', 
    submenu: [
      { icon: '📝', iconKey: 'firma', text: 'Consentimiento Informado', url: 'https://www.hhha.cl/wp-content/uploads/2020/07/Consentimiento-Informado-2.pdf' },
      { icon: '📊', iconKey: 'ray', text: 'RedCap', url: 'https://redcap.hhha.cl/redcap_v14.0.32/DataEntry/record_status_dashboard.php?pid=18' },
      { icon: '📋', iconKey: 'ray', text: 'Informes rayos SUA', url: 'https://redcap.hhha.cl/surveys/?s=47PKX3FFWELPATAX' },
      { icon: '🦠', iconKey: 'bacteria', text: 'Guía ATB HHHA', url: 'https://www.hhha.cl/wp-content/uploads/2024/12/Gu%C3%ADa-clinica-uso-antimicrobianos-Versi%C3%B3n-2-Noviembre-2024.pdf' },
      { icon: '🚨', iconKey: 'urgencia', text: 'Entrega Turno SUA', url: 'https://docs.google.com/spreadsheets/d/1l7C4mnwA4B957BMPo227QONF1bVWZbml/edit?pli=1&gid=2078745477#gid=2078745477' },
      { icon: '🏥', iconKey: 'urgencia', text: 'Página MDU', url: 'https://sites.google.com/view/becaurgenciaufro' },
      { icon: '🦴', iconKey: 'tmt', text: 'Página Traumato', url: 'https://sites.google.com/view/becadosufro/p%C3%A1gina-principal' }
    ]
  },
  { 
    icon: '🏢', iconKey: 'ssasur', text: 'SSANORTE',
    submenu: [
      { icon: '🔍', iconKey: 'ssasur', text: 'ESISSAN', url: 'https://www.esissan.cl/inicio' },
      { icon: '📈', iconKey: 'ssasur', text: 'SIDRA', url: 'https://www.ssanorte.cl/sidra/' },
      { icon: '💊', iconKey: 'ray', text: 'Medicap SSANORTE', url: 'http://10.5.144.154/medicap-victoria/login' },
      { icon: '💊', iconKey: 'ray', text: 'Medicap Angol', url: 'http://10.68.159.47/login' }
    ]
  },
  { 
    icon: '🖼️', iconKey: 'ray', text: 'Imagenología',
    submenu: [
      { icon: '📷', iconKey: 'ray', text: 'Ovijam HHHA', url: 'http://pacs.ssasur.cl:8080/oviyam2/' },
      { icon: '📷', iconKey: 'ray', text: 'Ovijam SSAS', url: 'http://10.7.200.101:8080/oviyam2/' },
      { icon: '📷', iconKey: 'ray', text: 'Ovijam HINI', url: 'http://10.4.37.214:8080/ovijam2/' },
      { icon: '📷', iconKey: 'ray', text: 'Ovijam Pitrufquen', url: 'http://10.4.191.21:8080/oviyam2/' },
      { icon: '📷', iconKey: 'ray', text: 'Ovijam Villarrica', url: 'http://10.63.76.121:8080/oviyam2/' },
      { icon: '📷', iconKey: 'ray', text: 'Zero Footprint Pucón', url: 'https://visualizador.hospitalsanfranciscodepucon.cl/zfp' },
      { icon: '📷', iconKey: 'ray', text: 'Ribik Pitrufquén', url: 'https://imalab.ribik.cl/login' }
    ]
  },
  { 
    icon: '💊', iconKey: 'farmaco', text: 'Farmacología',
    submenu: [
      { icon: '📖', iconKey: 'farmaco', text: 'Vademecum', url: 'https://www.iqb.es/cbasicas/farma/farma04/indicea.htm' },
      { icon: '🤰', iconKey: 'embarazo', text: 'Fármacos en Embarazo', url: 'https://www.araucaniasur.cl/wp-content/uploads/2023/01/GUIA-8-MEDICAMENTOS-EN-EMBARAZO-OK.pdf' },
      { icon: '🦠', iconKey: 'bacteria', text: 'Espectro ATB', url: 'https://drive.google.com/file/d/1gl2hg1aZFHn-r1amCMyeGZZjva9JUks_/view?usp=drive_link' },
      { icon: '🦠', iconKey: 'bacteria', text: 'Susceptibilidad ATB', url: 'https://drive.google.com/file/d/1vOt6XAYlCPnTKUHY92cpRLDSrw6HRYb6/view?usp=drive_link' }
    ]
  },
  { icon: '📱', iconKey: 'phone', text: 'Anexos', url: 'https://inthhha.notion.site/Anexos-1d874625032e801fac39ee717d941f8f' }
];

// Funciones auxiliares
const createIcon = (icon, iconKey, isSubmenu = false) => {
  const container = document.createElement('div');
  container.className = isSubmenu ? 'submenu-item-icon-hhha' : 'sidebar-item-icon-hhha';
  
  if (iconKey && localIcons[iconKey]) {
    const img = new Image();
    img.src = localIcons[iconKey];
    img.alt = '';
    img.onerror = () => {
      container.textContent = icon;
      container.classList.remove('icon-loading');
    };
    img.onload = () => container.classList.remove('icon-loading');
    container.classList.add('icon-loading');
    container.appendChild(img);
  } else {
    container.textContent = icon;
  }
  
  return container;
};

// Panel principal
function createFloatingPanel() {
  if (document.querySelector('.floating-panel-btn-hhha')) return;
  
  // Elementos del DOM
  const floatingBtn = document.createElement('button');
  floatingBtn.className = 'floating-panel-btn-hhha';
  const iconUrl = chrome.runtime.getURL("images/hospital.png");
  floatingBtn.innerHTML = `<img src="${iconUrl}" style="width: 30px; height: 30px; vertical-align: middle;">`;
  floatingBtn.title = 'Panel de Accesos Clínicos';
  
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay-hhha';
  
  const sidebar = document.createElement('div');
  sidebar.className = 'custom-sidebar-hhha';
  
  // Header
  sidebar.innerHTML = `
    <div class="sidebar-header-hhha">
      <div class="theme-indicator-hhha"></div>
      <div class="header-content-hhha">
        <div class="ssasur-logo-hhha">
          <div class="logo-blue-hhha"></div>
          <div class="logo-red-hhha"></div>
        </div>
        <h3>ACCESOS CLÍNICOS</h3>
        <p>Sector Araucanía Sur</p>
      </div>
      <button class="sidebar-close-hhha">&times;</button>
    </div>
    <div class="sidebar-content-hhha"></div>
    <div class="sidebar-footer-hhha">
      <div class="credits-text-hhha">
        <img src="${chrome.runtime.getURL('images/medufro.png')}" alt="UFRO" class="ufro-small-logo">
        Hecho por Medicina UFRO. Versión 2.1.1
      </div>
    </div>
  `;
  
  const content = sidebar.querySelector('.sidebar-content-hhha');
  
  // Generar menús
  menuStructure.forEach(item => {
    if (item.separator) {
      const separator = document.createElement('div');
      separator.className = 'separator-hhha with-text';
      separator.innerHTML = `<div class="separator-text-hhha">${item.separator}</div>`;
      content.appendChild(separator);
    } else if (item.submenu) {
      const mainItem = document.createElement('div');
      mainItem.className = 'sidebar-item-hhha has-submenu';
      mainItem.append(createIcon(item.icon, item.iconKey), Object.assign(document.createElement('div'), { 
        className: 'sidebar-item-text-hhha', 
        textContent: item.text 
      }));
      
      const submenu = document.createElement('div');
      submenu.className = 'submenu-hhha';
      
      item.submenu.forEach(subItem => {
        const submenuItem = document.createElement('a');
        submenuItem.className = 'submenu-item-hhha';
        submenuItem.href = '#';
        submenuItem.append(
          createIcon(subItem.icon, subItem.iconKey, true),
          Object.assign(document.createElement('div'), { 
            className: 'submenu-item-text-hhha', 
            textContent: subItem.text 
          })
        );
        
        submenuItem.addEventListener('click', (e) => {
          e.preventDefault();
          if (subItem.url) {
            window.open(subItem.url, '_blank');
            closeSidebar();
          }
        });
        
        submenu.appendChild(submenuItem);
      });
      
      mainItem.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.submenu-hhha.open, .sidebar-item-hhha.open').forEach(el => {
          if (el !== submenu && el !== mainItem) {
            el.classList.remove('open');
          }
        });
        submenu.classList.toggle('open');
        mainItem.classList.toggle('open');
      });
      
      content.append(mainItem, submenu);
    } else {
      const mainItem = document.createElement('div');
      mainItem.className = 'sidebar-item-hhha';
      mainItem.append(
        createIcon(item.icon, item.iconKey),
        Object.assign(document.createElement('div'), { 
          className: 'sidebar-item-text-hhha', 
          textContent: item.text 
        })
      );
      
      mainItem.addEventListener('click', () => {
        if (item.url) {
          window.open(item.url, '_blank');
          closeSidebar();
        }
      });
      
      content.appendChild(mainItem);
    }
  });
  
  // Contenedor principal
  const container = document.createElement('div');
  container.id = 'ssasur-extension-container';
  container.append(floatingBtn, overlay, sidebar);
  document.body.appendChild(container);
  
  // Control del panel
  const openSidebar = () => {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    floatingBtn.style.display = 'none';
    document.body.style.overflow = 'hidden';
  };
  
  const closeSidebar = () => {
    document.querySelectorAll('.submenu-hhha.open, .sidebar-item-hhha.open').forEach(el => {
      el.classList.remove('open');
    });
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    floatingBtn.style.display = 'flex';
    document.body.style.overflow = '';
  };
  
  // Event listeners
  floatingBtn.addEventListener('click', openSidebar);
  overlay.addEventListener('click', closeSidebar);
  sidebar.querySelector('.sidebar-close-hhha').addEventListener('click', closeSidebar);
  document.addEventListener('keydown', (e) => e.key === 'Escape' && closeSidebar());
}

// Inicialización
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(createFloatingPanel, 1000));
} else {
  setTimeout(createFloatingPanel, 1000);
}
