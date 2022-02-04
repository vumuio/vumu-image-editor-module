/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 * @returns {string}
 */
export default ({ locale, makeSvgIcon }) => `
    <ul class="tui-image-editor-submenu-item">
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
