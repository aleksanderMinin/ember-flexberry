import ListFormController from 'ember-flexberry/controllers/list-form';

export default ListFormController.extend({

  /**
    Flag indicate when component is in the hierarchical mode.

    @property _inHierarchicalMode
    @type Boolean
    @default false
    @private
  */
  inHierarchicalMode: true,

  /**
    Store the attribute parent set by `hierarchyByAttribute`.

    @property _hierarchicalAttribute
    @type String
    @private
  */
  hierarchicalAttribute: 'parent',

  /**
    Name of related edit form route.

    @property editFormRoute
    @type String
    @default 'ember-flexberry-dummy-suggestion-type-edit'
   */
  editFormRoute: 'ember-flexberry-dummy-suggestion-type-edit',

});
