import { getHelpMenuBarPosition } from '@/util';

export default ({ locale, biImage, loadButtonStyle, downloadButtonStyle, menuBarPosition }) => `
    <div class="tui-image-editor-controls">
        <div class="tui-image-editor-controls-logo">
            <img src="${biImage}" />
        </div>
        <ul class="tui-image-editor-menu"></ul>

        <div class="tui-image-editor-controls-buttons">
            <div style="${loadButtonStyle}">
                ${locale.localize('Load')}
                <input type="file" class="tui-image-editor-load-btn" />
            </div>
            <button class="tui-image-editor-download-btn" style="${downloadButtonStyle}">
                ${locale.localize('Download')}
            </button>
            <button id="save-as-template-btn" class="tui-save-as-template-btn hide-btn" style="${downloadButtonStyle}">
                ${locale.localize('Save as Template')}
            </button>
        </div>
    </div>
`;
