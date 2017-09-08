import View from '../../view/View';

class InformerInfo extends View {
    /**
     *
     * @param {string} viewName - It is template name
     */
    constructor(viewName) {
        super(viewName);

        /**
         * Template name
         *
         * @type {string}
         * @private
         */
        this._viewName = viewName;
    }

    /**
     * Paste view info to the block
     *
     * @param {UIElement|Element|string} blockElement - String is selector
     * @param {Array|string} messages - It is messages. Can be string
     * @param {boolean} autoClean - default is true
     * @returns {InformerInfo}
     */
    pasteTo(blockElement, messages, autoClean = true) {
        this.viewOptions = {messages: (typeof messages === 'string') ? [messages] : messages};
        this
            .autoCleanElement(autoClean)
            .updateContainer(blockElement)
            .build(this._viewName)
            .show();
    }
}

export default InformerInfo;
