import mysqlx from '@mysql/xdevapi';

import {
  collectionConfig,
  connectionConfig
} from './config.mjs';

let session;

try {
  session = await mysqlx.getSession(connectionConfig);

  const schema = await session.getSchema(connectionConfig.schema);

  // Avoid creating collections at runtime.
  const collection = await schema.createCollection(collectionConfig.collection,
    { reuseExisting: true }
  );

  // Avoid unwarranted replacement of documents at runtime.
  await collection.addOrReplaceOne('1', { me: 'ヽ(°〇°)ﾉ' });
  await collection.addOrReplaceOne('2', { me: '⋆｡˚ (¦3ꇤ[▓▓]⋆｡˚✩' });
  await collection.addOrReplaceOne('3', { me: 'ᕕ( ᐛ )ᕗ' });

  const docs = await collection.find().execute();
  const results = await docs.fetchAll();

} catch (err) {
  const { message, stack } = err;

  console.error(JSON.stringify({ message, stack }));

  process.exitCode = 1;
} finally {
  await session?.close();
}