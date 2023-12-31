/*
 * (c) 2023 Alberto Marchetti (info@cmaster11.me)
 * GNU General Public License v3.0+ (see COPYING or https://www.gnu.org/licenses/gpl-3.0.txt)
 */

import { describe, expect, test } from '@jest/globals';
import { ModuleSwitch } from './index';

import type { ModuleSwitchCaseFullInterface, ModuleSwitchInterface } from './schema.gen';

import { getTestRunContext } from '../../components/inventory.testutils';
import type { ModuleRunResult } from '../abstractModuleBase';
import type { VarsInterface } from '../../components/varsContainer.schema.gen';
import { testExamples } from '../../util/testUtils';

interface ModuleSwitchTest {
  args: ModuleSwitchInterface;
  expect?: ModuleRunResult<VarsInterface>;
}

describe('switch module', () => {
  testExamples(__dirname);

  const debug = '${{ __switchValue }}';
  const casesSimple = {
    hello: {
      debug,
      out: 'debug',
    },
    world: {
      debug,
      out: 'debug',
    },
    two: [
      {
        debug,
        out: 'debug',
      },
      {
        debug,
        out: 'debug2',
      },
    ],
  };
  const defaultSimple = {
    debug,
    out: 'debug',
  };
  const casesComplex: ModuleSwitchCaseFullInterface[] = [
    {
      if: '__switchValue == "one"',
      task: {
        debug,
        out: 'debug',
      },
    },
    {
      if: '__switchValue == "two"',
      task: {
        debug,
        out: 'debug',
      },
      fallthrough: true,
    },
    {
      task: {
        debug,
        out: 'debugFallthrough',
      },
    },
  ];

  const tests: ModuleSwitchTest[] = [
    {
      args: {
        value: 'hello',
        cases: casesSimple,
      },
      expect: {
        vars: { debug: 'hello' },
        changed: false,
      },
    },
    {
      args: {
        cases: casesSimple,
        default: defaultSimple,
      },
      expect: {
        vars: { debug: undefined },
        changed: false,
      },
    },
    {
      args: {
        value: 123,
        cases: casesSimple,
        default: defaultSimple,
      },
      expect: {
        vars: { debug: '123' },
        changed: false,
      },
    },
    {
      args: {
        value: 'two',
        cases: casesSimple,
        default: defaultSimple,
      },
      expect: {
        vars: {
          debug: 'two',
          debug2: 'two',
        },
        changed: false,
      },
    },
    {
      args: {
        value: 'one',
        cases: casesComplex,
      },
      expect: {
        vars: { debug: 'one' },
        changed: false,
      },
    },
    {
      args: {
        value: 'two',
        cases: casesComplex,
      },
      expect: {
        vars: {
          debug: 'two',
          debugFallthrough: 'two',
        },
        changed: false,
      },
    },
  ];

  test.each(tests)('$#', async (t) => {
    const runContext = getTestRunContext();
    const module = new ModuleSwitch(t.args);

    await expect(module.run(runContext)).resolves.toEqual(t.expect);
  });
});
