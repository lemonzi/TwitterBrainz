function linkify(text) {
  // Makes links clickable
  var turl = text.match( /(http|https|ftp):\/\/[^\s]*/i );
  if ( turl !== null )
    turl = text.replace( turl[0], '<a href="'+turl[0]+'" target="new">'+turl[0]+'</a>' );
  else
    turl = text;
  return turl;
}

module.exports = {
    linkify: linkify
};
