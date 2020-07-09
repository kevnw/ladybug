/*
 * Generate avatar url by Name
 */
exports.generateAvatarUrl = (name) => {
  var names = name.split(" ")
  const url = encodeURI('https://avatar.oxro.io/avatar.svg?name=' + names[0] + '+' + names[names.length - 1] + '&background=fff4e6&color=e5c296')
  return url
}
