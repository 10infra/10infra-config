/*
 * (c) 2023 Alberto Marchetti (info@cmaster11.me)
 * GNU General Public License v3.0+ (see COPYING or https://www.gnu.org/licenses/gpl-3.0.txt)
 */

import type { ParseArgsConfig } from 'node:util';
import { version10InfraConfig } from './build';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getArgDefault(argsConfig: ParseArgsConfig, key: string): any {
  return argsConfig.options![key].default;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getArgDefaultFromOptions(options: ParseArgsOptionsConfig, key: string, _default?: any): any {
  return _default ?? options![key].default;
}

export function checkVersionCommand() {
  const args = process.argv.slice(2);
  if (args.length && args[0] == 'version') {
    process.stdout.write(version10InfraConfig);
    process.exit(0);
  }
}
