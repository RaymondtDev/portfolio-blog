const extractCloudinaryIds = (content) => {
  const regex = /https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/(?:v\d+\/)?([^"'\s>]+)/g;
  const matches = [];
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    matches.push(match[1]); // public_id with folder (e.g. "myfolder/abc123.jpg")
  }

  return matches;
}

module.exports = extractCloudinaryIds;