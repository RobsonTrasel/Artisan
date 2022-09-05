import { ConsoleKernel } from '#src/Kernels/ConsoleKernel'
import { ArtisanLoader } from '#src/Helpers/ArtisanLoader'

export class Kernel extends ConsoleKernel {
  /**
   * Register the commands for the application.
   *
   * @return {import('#src/index').Command[] | Promise<any[]>}
   */
  get commands() {
    return [...ArtisanLoader.loadCommands()]
  }

  get templates() {
    return [...ArtisanLoader.loadTemplates()]
  }
}
