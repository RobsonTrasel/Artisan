export default {
  /*
  |--------------------------------------------------------------------------
  | Default Database Connection Name
  |--------------------------------------------------------------------------
  |
  | Here you may specify which of the database connections below you wish
  | to use as your default connection for all database work. Of course
  | you may use many connections at once using the Database library.
  |
  */
  default: Env('DB_CONNECTION', 'postgres'),

  /*
  |--------------------------------------------------------------------------
  | Database Connections
  |--------------------------------------------------------------------------
  |
  | Here are each of the database connections setup for your application.
  | Of course, examples of configuring each database platform that is
  | supported by Athenna is shown below to make development simple.
  |
  | Supported: "mysql", "postgres" and "mongo".
  |
  */

  connections: {
    postgres: {
      driver: 'postgres',
      host: Env('DB_HOST', '127.0.0.1'),
      port: Env('DB_PORT', 5432),
      debug: Env('DB_DEBUG', false),
      user: Env('DB_USERNAME', 'root'),
      password: Env('DB_PASSWORD', 'root'),
      database: Env('DB_DATABASE', 'database'),
    },
  },

  /*
  |--------------------------------------------------------------------------
  | Migration Repository Table
  |--------------------------------------------------------------------------
  |
  | This table keeps track of all the migrations that have already run for
  | your application. Using this information, we can determine which of
  | the migrations on disk haven't actually been run in the database.
  |
  */

  migrations: Env('DB_MIGRATIONS', 'migrations'),
}
