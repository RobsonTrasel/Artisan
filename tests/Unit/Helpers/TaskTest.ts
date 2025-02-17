/**
 * @athenna/artisan
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Task } from '#src/Helpers/Task'
import { BeforeEach, Test, TestContext } from '@athenna/test'
import { RunningTaskException } from '#src/Exceptions/RunningTaskException'

export default class TaskTest {
  @BeforeEach()
  public async beforeEach() {
    await Config.loadAll(Path.stubs('config'))
  }

  @Test()
  public async shouldBeAbleToCreateTasksRunner({ assert }: TestContext) {
    let value = 'hello'

    Config.set('logging.channels.console.driver', 'null')

    await new Task()
      .add('Testing 1', async task => {
        assert.equal(task.status, 'running')
        await task.complete()
        assert.equal(task.status, 'complete')
      })
      .add('Testing 2', async task => {
        assert.equal(task.status, 'running')
        await task.fail('Error')
        assert.equal(task.status, 'fail')
      })
      .add('Testing 3', async task => {
        value = null
        await task.complete('Will not be executed.')
      })
      .run()

    assert.equal(value, 'hello')
  }

  @Test()
  public async shouldThrowRunningTaskExceptionIfExecutingCallbackAfterEndingTheTaskWithFail({ assert }: TestContext) {
    Config.set('logging.channels.console.driver', 'null')

    await assert.rejects(
      () =>
        new Task()
          .add('Testing 1', async task => {
            assert.equal(task.status, 'running')
          })
          .run(),
      RunningTaskException,
    )
  }
}
