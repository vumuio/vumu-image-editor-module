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
        <div class="left-panel"></div>
        <div id="content">
          <div class="main-container">
              <div class="tui-image-editor-header" style="${headerStyle}">
                  <div class="tui-image-editor-header-buttons">
                      <div style="${loadButtonStyle}">
                          ${locale.localize('Load')}
                          <input type="file" class="tui-image-editor-load-btn" />
                      </div>
                      <button class="tui-image-editor-download-btn" style="${downloadButtonStyle}">
                          ${locale.localize('Download')}
                      </button>
                  </div>
              </div>
              <div class="tui-image-editor-main">
                  <div class="tui-image-editor-submenu">
                      <div class="tui-image-editor-submenu-style" style="${submenuStyle}"></div>
                  </div>
                  <div class="tui-image-editor-wrap">
                      <ul class="breadcrumbs list-none flex items-center">
                        <li class="active"><a href="#">Personalised Dashboard</a></li>
                        <li>Canvas</li>
                      </ul>
                      <div class="tui-image-editor-size-wrap">
<!--                      <ul class="custom-buttons list-none flex flex-wrap">-->
<!--                        <li>-->
<!--                          <div class="holder flex flex-column">-->
<!--                            <img src="../../../../img/image-icon.svg" alt="#" />-->
<!--                            <span>add Image</span>-->
<!--                          </div>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                          <div class="holder flex flex-column">-->
<!--                            <img src="../../../../img/text-icon.svg" alt="#" />-->
<!--                            <span>add Text</span>-->
<!--                          </div>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                          <div class="holder flex flex-column">-->
<!--                            <img src="../../../../img/website-icon.svg" alt="#" />-->
<!--                            <span>add Website</span>-->
<!--                          </div>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                          <div class="holder flex flex-column">-->
<!--                            <img src="../../../../img/shape-icon.svg" alt="#" />-->
<!--                            <span>add Shape</span>-->
<!--                          </div>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                          <div class="holder flex flex-column">-->
<!--                            <img src="../../../../img/map-icon.svg" alt="#" />-->
<!--                            <span>add Map</span>-->
<!--                          </div>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                          <div class="holder flex flex-column">-->
<!--                            <img src="../../../../img/logo-icon.svg" alt="#" />-->
<!--                            <span>add Logo</span>-->
<!--                          </div>-->
<!--                        </li>-->
<!--                      </ul>-->
                      <div class="tui-image-editor-align-wrap">
                          <div class="tui-image-editor">
                            <input type="text" placeholder="Enter project title here..." class="project-title" />
                          </div>
                          <div class="save-button">
                            <button class="btn-primary">Save & Next</button>
                          </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </div>
`;
