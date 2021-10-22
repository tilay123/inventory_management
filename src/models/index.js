// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Visibility = {
  "PUBLIC": "PUBLIC",
  "PRIVATE": "PRIVATE"
};

const { Item } = initSchema(schema);

export {
  Item,
  Visibility
};