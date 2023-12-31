/*
 * (c) 2023 Alberto Marchetti (info@cmaster11.me)
 * GNU General Public License v3.0+ (see COPYING or https://www.gnu.org/licenses/gpl-3.0.txt)
 */

import type { NodeJSExecutableArch } from '../util/downloadNodeDist';
import { NodeJSExecutablePlatform } from '../util/downloadNodeDist';
import { getPackageVersion } from '../util/package';

export async function getNodeJSBundleFileName(
  entryPointName: string,
  nodePlatform: NodeJSExecutablePlatform,
  nodeArch: NodeJSExecutableArch
) {
  const bundleFileName = [entryPointName, nodePlatform, nodeArch, await getPackageVersion()].join('-');
  return bundleFileName + (nodePlatform == NodeJSExecutablePlatform.win ? '.exe' : '');
}
