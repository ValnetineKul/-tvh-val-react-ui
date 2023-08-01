import getVimeoVideoId from './getVimeoVideoId';

describe('getVimeoVideoId', () => {
  const cases = [
    ['https://vimeo.com/639899860', '639899860'],
    ['https://vimeo.com/channels/test/423630087', '423630087'],
    ['https://vimeo.com/showcase/7008411/video/007943600', '007943600'],
    ['https://player.vimeo.com/video/111111111?title=0&byline=0&portrait=0', '111111111'],
  ];
  test.each(cases)('given %p, returns %p', (input: string, expected: string) => {
    const videoId = getVimeoVideoId(input);
    expect(videoId).toEqual(expected);
  });
});
