/**
  @module ember-flexberry
*/

import $ from 'jquery';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';

/**
  ModalDialog component for Semantic UI.

  @example
    ```handlebars
    {{#modal-dialog
      title='Title'
      sizeClass='large'
      close='removeModalDialog'
      created='createdModalDialog'
      useOkButton=false
      useCloseButton=false
    }}
      {{outlet 'modal-content'}}
    {{/modal-dialog}}
    ```

  @class ModalDialog
  @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
*/
export default Component.extend({
  /**
    Size of Semantic UI modal.
    Possible variants:
    - 'small'
    - 'large'
    - 'fullscreen'

    @property sizeClass
    @type String
    @default 'small'
  */
  sizeClass: 'small',

  /**
    Flag indicates whether an image content is viewed at modal dialog or not.

    @property viewImageContent
    @type Boolean
    @default false
  */
  viewImageContent: false,

  /**
    Flag indicates whether to show apply button or not.

    @property useOkButton
    @type Boolean
    @default true
  */
  useOkButton: true,

  /**
    Flag indicates whether to show close button or not.

    @property useCloseButton
    @type Boolean
    @default true
  */
  useCloseButton: true,

  /**
    Flag indicates toolbar visibility, `true` if at least one of buttons is visible.

    @property toolbarVisible
    @type Boolean
    @readOnly
  */
  toolbarVisible: computed('useOkButton', 'useCloseButton', function () {
    return this.get('useOkButton') || this.get('useCloseButton');
  }),

  /**
    Semantic UI Modal settings, [more info here](http://semantic-ui.com/modules/modal.html#settings).

    @property settings
    @type Object
    @default {}
  */
  settings: {},

  /**
    Service that triggers lookup events.

    @property lookupEventsService
    @type Service
  */
  lookupEventsService: service('lookup-events'),

  /**
    Used to identify lookup on the page.

    @property componentName
    @type String
  */
  componentName: undefined,

  /**
    Initializes DOM-related component's logic.
  */
  didInsertElement() {
    let _this = this;
    let componentName = this.get('componentName');
    let modalSettings = $.extend({
        observeChanges: true,
        detachable: false,
        allowMultiple: true,
        context: '.ember-application > .ember-view',

        onApprove: function () {
          // Call to 'lookupDialogOnHiddenTrigger' causes asynchronous animation, so Ember.run is necessary.
          run(() => {
            _this.sendAction('ok');
            _this.get('lookupEventsService').lookupDialogOnHiddenTrigger(componentName);
          });
        },
        onHidden: function () {
          run(() => {
            _this.sendAction('close');

            // IE doesn't support "this.remove()", that's why "Ember.$(this).remove()" is used.
            $(this).remove();
            _this.get('lookupEventsService').lookupDialogOnHiddenTrigger(componentName);
          });
        },
        onVisible: function () {
          // Handler of 'created' action causes asynchronous animation, so Ember.run is necessary.
          run(() => {
            _this.sendAction('created', $(this));
          });
        }
      },
      _this.get('settings'));

    this.$('.ui.modal').modal(modalSettings).modal('show');
  },
});
