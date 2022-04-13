/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 * @returns {string}
 */
export default ({ locale, makeSvgIcon }) => `
    <ul class="tui-image-editor-submenu-item">
         <li class="tui-right-panel-heading">
            <div class="tui-heading-text">Logo Settings</div>
        </li>
        <li class="tui-image-editor-partition">
            <div></div>
        </li>
        <li>
            <div class="tui-image-editor-button">
                <div class="tie-insert-logo">
                    ${makeSvgIcon(['normal', 'active'], 'logo-load', true)}
                </div>
                <label> ${locale.localize('Insert Logo')} </label>
            </div>
        </li>
    </ul>
`;
