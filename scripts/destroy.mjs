import mysqlx from '@mysql/xdevapi';

import {
  collectionConfig,
  connectionConfig
} from '../config.mjs';

let session;

try {
  session = await mysqlx.getSession(connectionConfig);

  await session
    .getSchema(connectionConfig.schema)
    .dropCollection(collectionConfig.collection);

} catch (err) {
  const { message, stack } = err;

  console.error(JSON.stringify({ message, stack }));

  process.exitCode = 1;
} finally {
  await session?.close();
}
