import getYouTubeVideoId from './getYouTubeVideoId';

describe('getYouTubeVideoId', () => {
  const cases = [
    ['https://www.youtube.com/watch?v=QkB12AuMfpQ', 'QkB12AuMfpQ'],
    ['http://www.youtube.com/watch?v=QkB12AuMfpQ&a=GxdCwVVULXctT2lYDEPllDR0LRTutYfW', 'QkB12AuMfpQ'],
    ['http://www.youtube.com/embed/QkB12AuMfpQ?rel=0', 'QkB12AuMfpQ'],
    ['http://www.youtube.com/v/QkB12AuMfpQ', 'QkB12AuMfpQ'],
    ['http://www.youtube.com/watch?feature=player_embedded&v=QkB12AuMfpQ', 'QkB12AuMfpQ'],
    ['http://youtube.com/v/QkB12AuMfpQ?feature=youtube_gdata_player', 'QkB12AuMfpQ'],
    ['http://youtu.be/QkB12AuMfpQ', 'QkB12AuMfpQ'],
  ];
  test.each(cases)('given %p, returns %p', (input: string, expected: string) => {
    const videoId = getYouTubeVideoId(input);
    expect(videoId).toEqual(expected);
  });
});
