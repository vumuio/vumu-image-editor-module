/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 * @returns {string}
 */
export default ({ locale, makeSvgIcon }) => `
    <ul class="tui-image-editor-submenu-item">
        <li class="tie-shape-button">
            <div class="tui-image-editor-button rect">
                <div>
                    ${makeSvgIcon(['normal', 'active'], 'shape-rectangle', true)}
                </div>
                <label> ${locale.localize('Rectangle')} </label>
            </div>
            <div class="tui-image-editor-button circle">
                <div>
                    ${makeSvgIcon(['normal', 'active'], 'shape-circle', true)}
                </div>
                <label> ${locale.localize('Circle')} </label>
            </div>
            <div class="tui-image-editor-button triangle">
                <div>
                    ${makeSvgIcon(['normal', 'active'], 'shape-triangle', true)}
                </div>
                <label> ${locale.localize('Triangle')} </label>
            </div>
        </li>
        <li class="tui-image-editor-partition">
            <div></div>
        </li>
        <li class="tie-shape-color-button">
            <div class="tie-color-fill" title="${locale.localize('Background Color')}"></div>
            <div class="tie-color-stroke" title="${locale.localize('Border Color')}"></div>
        </li>
        <li class="tui-image-editor-partition only-left-right">
            <div></div>
        </li>
        <li class="tui-image-editor-newline tui-image-editor-range-wrap">
            <label class="range">${locale.localize('Stroke')}</label>
            <div class="tie-stroke-range"></div>
            <input class="tie-stroke-range-value tui-image-editor-range-value" value="0" />
        </li>
        <li>
            <span class="font-centered-class ">Stroke Width</span>
        </li>
         <li class="tui-image-editor-partition only-left-right">
            <div></div>
        </li>
        <li class="tui-image-editor-newline tui-image-editor-range-wrap">
            <span class="font-centered-class ">X</span>        
            <div class="tie-skewx-shape-range"></div>
            <input class="tie-skewx-shape-range-value tui-image-editor-range-value range-value" value="0" />
            <br/>
            <span class="font-centered-class">Y</span>
            <div class="tie-skewy-shape-range"></div>
            <input class="tie-skewy-shape-range-value tui-image-editor-range-value range-value" value="0" />
        </li>
        <li>
            <span class="font-centered-class ">Skew</span>
        </li>
    </ul>
`;
