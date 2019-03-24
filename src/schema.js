import { normalize } from './utils';

export default {
  document: {
    last: { type: 'paragraph' },
    normalize
  },
  blocks: {
    image: {
      isVoid: true
    }
  }
};
