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
                          <li><input type="text" id="project-title-input" placeholder="Enter project title here..." class="project-title" />
                            <span style="cursor: pointer"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.25 10.9375V13.75H3.0625L11.3575 5.45501L8.545 2.64251L0.25 10.9375ZM13.5325 3.28001C13.825 2.98751 13.825 2.51501 13.5325 2.22251L11.7775 0.467513C11.485 0.175013 11.0125 0.175013 10.72 0.467513L9.3475 1.84001L12.16 4.65251L13.5325 3.28001Z" fill="#8492A6"/>
                              </svg></span>
                          </li>
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
