// Generated with: yarn gen -> cmd/schemaGen.ts

import { VarsInterface } from '../components/varsContainer.schema.gen';
/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface ModuleRunResultInterface {
  changed?: boolean;
  exit?: boolean;
  failed?: string;
  vars?: VarsInterface;
}