import { getTestBed } from '@angular/core/testing';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    <T>(id: string): T;
    keys(): string[];
  };
};

getTestBed().initTestEnvironment(
  platformBrowserDynamicTesting()
);

const context = require.context('./', true, /\.spec\.ts$/);
context.keys().forEach(context);
