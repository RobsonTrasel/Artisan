/**
 * @athenna/artisan
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { ViewProvider } from '@athenna/view'
import { File, Folder } from '@athenna/common'
import { LoggerProvider } from '@athenna/logger'
import { ExitFaker, AfterEach, BeforeEach } from '@athenna/test'
import { ConsoleKernel, ArtisanProvider, CommanderHandler } from '#src'

export class BaseCommandTest {
  public artisan = Path.pwd('bin/artisan.ts')
  public originalPJson = new File(Path.pwd('package.json')).getContentAsStringSync()

  @BeforeEach()
  public async beforeEach() {
    ExitFaker.fake()

    process.env.ARTISAN_TESTING = 'true'

    await Config.loadAll(Path.stubs('config'))

    new ViewProvider().register()
    new LoggerProvider().register()
    new ArtisanProvider().register()

    const kernel = new ConsoleKernel()

    await kernel.registerExceptionHandler()
    await kernel.registerCommands()
  }

  @AfterEach()
  public async afterEach() {
    Config.clear()
    ioc.reconstruct()
    ExitFaker.release()

    delete process.env.ARTISAN_TESTING

    CommanderHandler.getCommander<any>()._events = {}
    CommanderHandler.getCommander<any>().commands = []
    CommanderHandler.getCommander<any>()._version = undefined

    await Folder.safeRemove(Path.app())
    await Folder.safeRemove(Path.config())
    await Folder.safeRemove(Path.resources())
    await Folder.safeRemove(Path.stubs('storage'))

    await File.safeRemove(Path.pwd('.env'))
    await File.safeRemove(Path.pwd('.env.test'))
    await File.safeRemove(Path.pwd('.env.example'))
    await File.safeRemove(Path.pwd('docker-compose.yml'))

    await new File(Path.pwd('package.json')).setContent(this.originalPJson)
  }
}
