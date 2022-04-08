/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 * @returns {string}
 */
export default ({ locale, makeSvgIcon }) => `
    <ul class="tui-image-editor-submenu-item">
        <li style="width:86%; margin: 0 auto" class="tui-image-editor-newline tui-image-editor-number-input-wrap">
            <div class="number-input-row">
                <span class="font-centered-class ">Width</span>  
                <div class="number-input-align-right">
                    <div class="tie-width-input-increase">+</div>
                    <input  class="tie-number-input-width-value" value="0" />
                    <div class="tie-width-input-decrease">-</div>
                </div>
            </div>
            <div class="number-input-row">
                <span class="font-centered-class">Height</span>
                <div class="number-input-align-right">
                    <div class="tie-height-input-increase">+</div>
                    <input  class="tie-number-input-height-value" value="0" />
                    <div class="tie-height-input-decrease">-</div>
                </div>
            </div>       
        </li>
        <li class="tui-image-editor-partition">
            <div></div>
        </li>
        <li style="width:86%; margin: 0 auto" class="tui-image-editor-newline tui-image-editor-number-input-wrap">
            <div style="margin-top: 10px" class="number-input-row">
                <span class="font-centered-class ">Image Style</span>  
                <div class="number-input-align-right image-shape-button">
                    <div class="tie-image-shape rect"></div>
                    <div class="tie-image-shape circle"></div>
                </div>
            </div>
            
        </li>
        <li class="tui-image-editor-partition">
            <div></div>
        </li>
        <li class="tui-image-editor-newline tui-image-editor-range-wrap">
            <span class="font-centered-class ">X</span>        
            <div class="tie-skewx-image-range"></div>
            <input class="tie-skewx-image-range-value tui-image-editor-range-value range-value" value="0" />
            <br/>
            <span class="font-centered-class">Y</span>
            <div class="tie-skewy-image-range"></div>
            <input class="tie-skewy-image-range-value tui-image-editor-range-value range-value" value="0" />
        </li>
        <li>
            <span class="font-centered-class ">Skew</span>
        </li>
        <li class="submenu-buttons">
            <div class="tui-image-editor-button">
                <div>
                    <input type="file" accept="image/*" class="tie-mask-image-file">
                    ${makeSvgIcon(['normal', 'active'], 'image-load', true)}
                </div>
                <label> ${locale.localize('Add New Image')} </label>
            </div>
        </li>
    </ul>
`;
