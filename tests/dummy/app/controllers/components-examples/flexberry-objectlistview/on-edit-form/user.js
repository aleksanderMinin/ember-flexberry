import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import EditFormControllerOperationsIndicationMixin from '../../../../mixins/edit-form-controller-operations-indication';
import { StringPredicate, ComplexPredicate } from 'ember-flexberry-data/query/predicate';

export default EditFormController.extend(EditFormControllerOperationsIndicationMixin, {
  /**
   Route name for transition after close edit form.

   @property parentRoute
   @type String
   @default 'ember-flexberry-dummy-application-user-list'
  */
  parentRoute: 'components-examples/flexberry-objectlistview/on-edit-form',

  store: Ember.inject.service(),

  getCellComponent: null,

  /**
    Name of related to FOLV edit form route.

    @property folvEditFormRoute
    @type String
    @default 'ember-flexberry-dummy-localization-edit'
   */
  folvEditFormRoute: 'ember-flexberry-dummy-localization-edit',

  /**
    Name of FOLV model.

    @property folvModelName
    @type String
    @default 'ember-flexberry-dummy-localization'
   */
  folvModelName: 'ember-flexberry-dummy-localization',

  /**
    Name of FOLV projection.

    @property folvProjection
    @type String
    @default 'LocalizationL'
   */
  folvProjection: 'LocalizationL',

  objectListViewLimitPredicate: function(options) {
    let methodOptions = Ember.merge({
      modelName: undefined,
      projectionName: undefined,
      params: undefined
    }, options);

    if (methodOptions.modelName === this.get('folvModelName') &&
    methodOptions.projectionName === this.get('folvProjection')) {
      let limitFunction = new ComplexPredicate('or',
        new StringPredicate('name').contains('1'),
        new StringPredicate('name').contains('Тест'));
      return limitFunction;
    }

    return undefined;
  },

  /**
    Property to form array of special structures of custom user buttons.

    @property customButtons
    @type Array
   */
  customButtons: Ember.computed('i18n.locale', function() {
    let i18n = this.get('i18n');
    return [{
      buttonName: i18n.t('forms.components-examples.flexberry-objectlistview.on-edit-form.add-button-name'),
      buttonAction: 'userButtonAddAction',
      buttonClasses: 'my-add-user-button add-click-button positive'
    }];
  }),

  actions: {
    /**
      Handler for click on custom user button.

      @method userButtonAddAction
     */
    userButtonAddAction: function() {
      let thisUrl = this.get('target.url');
      this.transitionToRoute('ember-flexberry-dummy-localization-edit.new')
      .then((newRoute) => {
        newRoute.controller.set('parentRoute', thisUrl);
      });
    },

    componentForFilter(type, relation) {
      switch (type) {
        case 'string': return { name: 'flexberry-textbox', properties: { class: 'compact fluid' } };
        default: return {};
      }
    },

    conditionsByType(type) {
      switch (type) {
        case 'file':
          return null;

        case 'date':
        case 'number':
          return ['eq', 'neq', 'le', 'ge'];

        case 'string':
          return ['eq', 'neq', 'like'];

        case 'boolean':
          return ['eq'];

        default:
          return ['eq', 'neq'];
      }
    },
  },

});
