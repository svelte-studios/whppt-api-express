const assert = require('assert');
const { unPublishCallBack } = require(`${process.cwd()}/whppt.config.js`);

module.exports = {
  exec({ $mongo: { $unpublish, $db } }, { _id }) {
    assert(_id, 'A Page Id must be provided.');
    return $db
      .collection('pages')
      .updateOne({ _id }, { $set: { published: false } })
      .then(() => {
        return $unpublish('pages', _id).then(() => {
          return $unpublish('listings', _id).then(() => {
            if (!unPublishCallBack) return;
            return unPublishCallBack(_id);
          });
        });
      });
  },
};
