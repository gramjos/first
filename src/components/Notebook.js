/**
 * Notebook Component with Resizable Side Panel
 */
export default function Notebook({ params, query, state }) {
  return `
    <div class="page notebook-page">
      <h1 style="color:blue;">'To be alive is to risk it all' -Rick</h1>
      <h3 style="color:green;">Interactive Notebook</h3>
      
      <button id="togglePanel" class="toggle-btn">☰ Open Notebook</button>

      <div id="sidePanel" class="side-panel">
        <div id="resizeHandle" class="resize-handle"></div>
        <div class="panel-header">
          <h3>Notebook Viewer</h3>
          <button id="closePanel" class="close-btn">✕</button>
        </div>
        <div class="panel-content">
          <iframe
            src="/notebooks/output_dir/index.html"
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  `;
}

/**
 * Initialize side panel functionality after component is mounted
 */
export function initNotebookPanel() {
  const panel = document.getElementById('sidePanel');
  const toggleBtn = document.getElementById('togglePanel');
  const closeBtn = document.getElementById('closePanel');
  const resizeHandle = document.getElementById('resizeHandle');
  
  if (!panel || !toggleBtn || !closeBtn || !resizeHandle) return;
  
  let isResizing = false;
  let startX = 0;
  let startWidth = 0;
  
  // Toggle panel open
  const openHandler = () => {
    panel.classList.add('open');
    toggleBtn.textContent = '☰ Close Notebook';
  };
  
  // Close panel
  const closeHandler = () => {
    panel.classList.remove('open');
    toggleBtn.textContent = '☰ Open Notebook';
  };
  
  // Start resizing
  const mouseDownHandler = (e) => {
    isResizing = true;
    startX = e.clientX;
    startWidth = panel.offsetWidth;
    panel.classList.add('resizing');
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  };
  
  // Resize panel
  const mouseMoveHandler = (e) => {
    if (!isResizing) return;
    
    e.preventDefault();
    
    const deltaX = startX - e.clientX;
    const newWidth = startWidth + deltaX;
    
    const minWidth = 300;
    const maxWidth = window.innerWidth * 0.9;
    
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
    panel.style.width = clampedWidth + 'px';
    panel.style.maxWidth = clampedWidth + 'px';
  };
  
  // End resizing
  const mouseUpHandler = (e) => {
    if (isResizing) {
      isResizing = false;
      panel.classList.remove('resizing');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      if (e) e.preventDefault();
    }
  };
  
  // Mouse leave handler
  const mouseLeaveHandler = () => {
    if (isResizing) {
      isResizing = false;
      panel.classList.remove('resizing');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  };
  
  // Attach event listeners
  toggleBtn.addEventListener('click', openHandler);
  closeBtn.addEventListener('click', closeHandler);
  resizeHandle.addEventListener('mousedown', mouseDownHandler);
  document.addEventListener('mousemove', mouseMoveHandler, { passive: false });
  document.addEventListener('mouseup', mouseUpHandler);
  document.addEventListener('mouseleave', mouseLeaveHandler);
  
  // Cleanup function to remove event listeners
  return () => {
    toggleBtn.removeEventListener('click', openHandler);
    closeBtn.removeEventListener('click', closeHandler);
    resizeHandle.removeEventListener('mousedown', mouseDownHandler);
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    document.removeEventListener('mouseleave', mouseLeaveHandler);
  };
}
