/*
 * (c) 2023 Alberto Marchetti (info@cmaster11.me)
 * GNU General Public License v3.0+ (see COPYING or https://www.gnu.org/licenses/gpl-3.0.txt)
 */

import '../src/util/loadAllRegistryEntries.gen';
import type { ParseArgsConfig } from 'node:util';
import { parseArgs } from 'node:util';
import { joiValidateSyncFSExists } from '../src/util/joi';
import Joi from 'joi';
import { runESBuild } from '../src/commands/esbuild';
import { setupUncaughtHandler } from '../src/util/uncaught';
import { joiParseArgsLogOptionsSchema, newLoggerFromParseArgs, parseArgsLogOptions } from '../src/util/logger';

const argsConfig: ParseArgsConfig = {
  allowPositionals: false,
  strict: true,
  options: {
    ...parseArgsLogOptions,
    entryPoint: {
      type: 'string',
      short: 'e',
    },
    outFile: {
      type: 'string',
      short: 'o',
    },
  },
};

async function main() {
  const { values } = parseArgs(argsConfig);

  const { entryPoint, outFile, ...otherArgs } = Joi.attempt(
    values,
    joiParseArgsLogOptionsSchema.append({
      entryPoint: Joi.string().custom(joiValidateSyncFSExists).required(),
      outFile: Joi.string().required(),
    }),
    'Error evaluating command args:'
  );
  const logger = newLoggerFromParseArgs(otherArgs);
  setupUncaughtHandler(logger);

  await runESBuild(entryPoint, outFile);
}

void main();
