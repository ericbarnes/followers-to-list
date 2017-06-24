const Twitter = require('twitter');
const Promise = require('bluebird');
const config = require('../config.json');

const twitter = new Twitter(config);

function getFollowing(screen_name, cursor) {
  return new Promise((resolve, reject) => {
    twitter.get('followers/list', { screen_name, cursor }, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

function createList(name) {
  return new Promise((resolve, reject) => {
    twitter.post('lists/create', { name:name, mode:'private' }, (err, res) => {
      if (err) {
        return reject(err);
      }

      return resolve(res);
    });
  });
}

function addToList(list, user) {
  const params = { slug: list.slug, owner_screen_name: list.user.screen_name, screen_name: user.screen_name };

  return new Promise((resolve, reject) => {
    twitter.post('lists/members/create', params, (err, body, res) => {
      if (err) {
        console.log(err, res)
        return reject(err);
      }

      return resolve(body);
    });
  });
}

function sleep(timeout) {
  let id;
  return () => new Promise((resolve, reject) => {
    id = setTimeout(resolve, timeout);
  }).then(() => clearTimeout(id));
}

module.exports = (name) => getFollowing(name)
  .then((users) => createList(`${name}-following`).then((list) => [list, users]))
  .spread((list, users) => {
    const promises = [];

    for (i = 0; i <= (users.length - 1); i++) {
      promises.push(addToList(list, users[i]).then(sleep(1000)))
    }

    return Promise.all(promises);
  });
