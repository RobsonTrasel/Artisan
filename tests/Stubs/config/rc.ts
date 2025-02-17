/**
 * @athenna/artisan
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { Path, File } from '@athenna/common'

const athennaRc = new File(Path.pwd('package.json')).getContentAsJsonSync().athenna

Config.set('meta', Config.get('meta', import.meta.url))

athennaRc.isInPackageJson = true
athennaRc.meta = Config.get('meta', import.meta.url)

export default athennaRc
