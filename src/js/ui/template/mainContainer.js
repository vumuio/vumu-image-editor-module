export default ({
  locale,
  commonStyle,
  headerStyle,
  loadButtonStyle,
  downloadButtonStyle,
  submenuStyle,
}) => ` 
    <div class="tui-image-editor-main-container" style="${commonStyle}">
    
      <div class="page-container">
        <div id="content">
          <div class="main-container">
              <div class="tui-image-editor-main">
                <div class="flex items-center breadcrumbs-area">
                  <ul class="breadcrumbs list-none flex items-center">
                    <li class="active"><a href="#" id="personalized-dashboard">Personalized Dashboard</a></li>
                    <li><input type="text" id="project-title-input" placeholder="Enter project title here..." class="project-title" />
                    </li>
                  </ul>
                  <div class="buttons-area">
                      <div class="pan-holder">
                        <ul class="tui-image-editor-help-menu top"></ul>
                      </div>
                      <button class="btn-primary relative setBgButton">
                        ${locale.localize('Set Background')}
                        <input type="file" class="tui-image-editor-load-btn" id="setBg" />
                      </button>
                      <button class="btn-primary tui-image-editor-save-btn pointer">Save & Next <img src="https://pcontent.vumu.io/assets/next-arrow.svg" alt="#" /> </button>
                  </div>
                </div>
                <div class="editor-area">
                  <div class="tui-image-editor-wrap">
                    <div class="tui-image-editor-size-wrap">
                    <div class="tui-image-editor-align-wrap">
                      <div class="tui-image-editor">
                      </div>
                    </div>
                      </div>
                    </div>
                  <div class="tui-image-editor-submenu"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
`;
