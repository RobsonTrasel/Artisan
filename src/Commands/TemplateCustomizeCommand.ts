/**
 * @athenna/artisan
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { BaseCommand } from '#src'
import { Exec, File } from '@athenna/common'
import { resolve, isAbsolute } from 'node:path'

export class TemplateCustomizeCommand extends BaseCommand {
  public static signature(): string {
    return 'template:customize'
  }

  public static description(): string {
    return 'Export all the templates files registered in "rc.templates" to the "resources/templates" path.'
  }

  public async handle(): Promise<void> {
    this.logger.simple('({bold,green} [ MOVING TEMPLATES ])\n')

    const templates: any = {}
    const paths = Config.get('rc.templates')

    await Exec.concurrently(Object.keys(paths), async key => {
      let path = paths[key]

      if (!isAbsolute(path)) {
        path = resolve(path)
      }

      const file = new File(path)

      await file.copy(Path.resources(`templates/${file.base}`))

      templates[key] = `./resources/templates/${file.base}`
    })

    await this.rc.setTo('view.templates', templates).save()

    this.logger.success(
      `Athenna RC updated: ({dim,yellow} { view.templates = ${JSON.stringify(
        templates,
        null,
        2,
      )} })`,
    )

    this.logger.success(
      'Template files successfully moved to ({yellow} resources/templates) folder.',
    )
  }
}
