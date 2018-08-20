import inherits from 'inherits';

import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';

// Require all properties you need from existing providers.
// In this case all available bpmn relevant properties without camunda extensions.
import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
import documentationProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps';
import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';
import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';

import laborProperty from './part/LaborProperty';

// The general tab contains all bpmn relevant properties.
// The properties are organized in groups.
function createGeneralTabGroups(element, bpmnFactory, elementRegistry, translate) {

    var generalGroup = {
        id: 'general',
        label: 'General',
        entries: []
    };
    idProps(generalGroup, element, translate);
    nameProps(generalGroup, element, translate);
    processProps(generalGroup, element, translate);

    var detailsGroup = {
        id: 'details',
        label: 'Details',
        entries: []
    };
    linkProps(detailsGroup, element, translate);
    eventProps(detailsGroup, element, bpmnFactory, elementRegistry, translate);

    var documentationGroup = {
        id: 'documentation',
        label: 'Documentation',
        entries: []
    };

    documentationProps(documentationGroup, element, bpmnFactory, translate);

    return [
        generalGroup,
        detailsGroup,
        documentationGroup
    ];
}

// Create the custom magic tab
function createLaborTabGroups(element, elementRegistry) {

    // Create a group called "labor".
    var laborGroup = {
        id: 'labor-property',
        label: 'Labor',
        entries: []
    };

    // Add the props to the group.
    laborProperty(laborGroup, element);

    return [
        laborGroup
    ];
}

export default function CustomPropertiesProvider(
    eventBus, bpmnFactory, elementRegistry,
    translate) {

    PropertiesActivator.call(this, eventBus);

    this.getTabs = function(element) {

        var generalTab = {
            id: 'general',
            label: 'General',
            groups: [].concat(
                        createGeneralTabGroups(element, bpmnFactory, elementRegistry, translate)
                    ).concat(
                        createLaborTabGroups(element, elementRegistry)
                    )
        };

        // Show general + "labor" tab
        return [
            generalTab
        ];
    };
}

inherits(CustomPropertiesProvider, PropertiesActivator);