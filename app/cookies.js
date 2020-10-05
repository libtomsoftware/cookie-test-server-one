const webcookies = [];

const add = (cookie) => {
  webcookies.push(cookie);
};

const getAll = () => {
  return webcookies;
};

const remove = (cookieName) => {
  let index;

  webcookies.forEach((webcookie, idx) => {
    if (webcookie.name === cookieName) {
      index === idx;
    }
  });

  if (!!index || index === 0) {
    webcookies.splice(index, 1);
  }
};

module.exports = {
  add,
  getAll,
  remove,
};
