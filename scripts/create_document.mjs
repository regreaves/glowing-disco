import mysqlx from '@mysql/xdevapi';

import {
  collectionConfig,
  connectionConfig
} from '../config.mjs';

let session;

try {
  session = await mysqlx.getSession(connectionConfig);

  const collection = await session
    .getSchema(connectionConfig.schema)
    .getCollection(collectionConfig.collection);

  const result = await collection
    .addOrReplaceOne('1', collectionConfig.document);

console.log(result.getAffectedItemsCount());

  const documents = await collection.find().execute();
  console.log(await documents.fetchAll());

} catch (err) {
  const { message, stack } = err;

  console.error(JSON.stringify({ message, stack }));

  process.exitCode = 1;
} finally {
  await session?.close();
}