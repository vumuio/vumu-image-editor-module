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
              <div class="tui-image-editor-header" style="${headerStyle}">
                  <div class="tui-image-editor-header-buttons">
                      <div style="${loadButtonStyle}">
                          ${locale.localize('Set Background')}
                          <input type="file" class="tui-image-editor-load-btn" />
                      </div>
                  </div>
              </div>
              <div class="tui-image-editor-main">
                <div class="tui-image-editor-wrap">
                  <div class="tui-image-editor-size-wrap">
                  <div class="tui-image-editor-align-wrap">
                    <div class="tui-image-editor">
                      <div class="flex items-center"> 
                          <ul class="breadcrumbs list-none flex items-center">
                            <li class="active"><a href="#" id="personalized-dashboard">Personalised Dashboard</a></li>
                            <li><input type="text" id="project-title-input" placeholder="Enter project title here..." class="project-title" /></li>
                          </ul>
                      </div>
                    </div>
                  </div>

                    </div>
                    <div class="save-button">
                        <button class="btn-primary tui-image-editor-save-btn">Save & Next</button>
                    </div>
                  </div>
                    <div class="tui-image-editor-submenu"></div>
              </div>
            </div>
          </div>
        </div>
    </div>
`;
