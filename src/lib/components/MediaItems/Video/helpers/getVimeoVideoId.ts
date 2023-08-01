const getVimeoVideoId = (url: string) => {
  const match = /vimeo.*\/(\d+)/i.exec(url);
  if (match) {
    return match[1];
  }
};

export default getVimeoVideoId;
