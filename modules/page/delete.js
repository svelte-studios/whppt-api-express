const assert = require('assert');

module.exports = {
  exec({ $mongo: { $delete } }, { _id }) {
    assert(_id, 'A Page Id must be provided.');

    return $delete('pages', _id);
  },
};
