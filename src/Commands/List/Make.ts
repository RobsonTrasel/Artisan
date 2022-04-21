/**
 * @athenna/artisan
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Artisan } from 'src/Facades/Artisan'
import { Command } from 'src/Commands/Command'
import { Command as Commander } from 'commander'

export class Make extends Command {
  /**
   * The name and signature of the console command.
   */
  protected signature = 'list:make'

  /**
   * The console command description.
   */
  protected description = 'List all make commands.'

  /**
   * Set additional flags in the commander instance.
   * This method is executed when registering your command.
   *
   * @return {void}
   */
  public addFlags(commander: Commander): Commander {
    return commander
  }

  /**
   * Execute the console command.
   *
   * @return {Promise<void>}
   */
  async handle(): Promise<void> {
    this.simpleLog('[ LISTING MAKE ]', 'bold', 'green')

    const commands =
      'Commands:' +
      Artisan.listCommands(true, 'make')
        .split('\n')
        .map(line => `  ${line}`)
        .join('\n')

    this.simpleLog(commands)
  }
}
