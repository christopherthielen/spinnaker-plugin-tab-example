import {
  Application,
  ApplicationDataSourceRegistry,
  ApplicationStateProvider,
  IDeckPlugin,
  REST,
} from '@spinnaker/core';

import { ExampleView } from './ExampleView';

export const plugin: IDeckPlugin = {
  initialize(plugin: IDeckPlugin) {
    const injector = (window as any).spinnaker.$injector;
    const applicationState: ApplicationStateProvider = injector.get('applicationState');
    applicationState.addChildState({
      name: 'example',
      url: '/example',
      views: {
        insight: {
          component: ExampleView,
          $type: 'react',
        },
      },
    });

    ApplicationDataSourceRegistry.registerDataSource({
      key: 'example',
      label: 'Example',
      autoActivate: true,
      activeState: '**.example.**',
      visible: true,
      sref: '.example',
      defaultData: [],
      description: 'Example Data Source',
      iconName: 'artifact',
      loader: (application: Application) => REST('/example/data').get(),
      onLoad: (application: Application, data: any) => Promise.resolve(data),
    });
  },
};
