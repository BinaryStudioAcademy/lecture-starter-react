import { mainData } from '../../data/data';
import { Main as MainActions } from '../../page-actions/page-actions';
import { Main as MainPage } from '../../page-objects/page-objects';

const mainPage = new MainPage();
const mainActions = new MainActions();

describe('User', async () => {
  before(async () => {
    await mainActions.openPage();
  });

  it('can filter cards by search', async () => {
    const { search } = mainData;

    await mainActions.searchByTitle(search);
    const titles = await mainPage.TripCards.map((e) =>
      e.$('.trip-info__title').getText(),
    );
    const results = titles.map((title) => title.search(search) !== -1);

    expect(results).not.toContain(false);
  });

  it('can filter cards by level', async () => {
    const { level } = mainData;

    await mainActions.selectLevel(level);
    const levels = await mainPage.TripCards.map((e) =>
      e.$('.trip-info__level').getText(),
    );
    const results = levels.map((cardLevel) => cardLevel === level);

    expect(results).not.toContain(false);
  });

  it('can filter cards by duration', async () => {
    const { duration } = mainData;
    const range = duration.split('_x_');

    await mainActions.selectDuration(duration);
    const durations = await mainPage.TripCards.map((e) =>
      e.$('.trip-info__duration').getText(),
    );
    const results = durations.map((duration) => {
      const value = parseFloat(duration);
      return value >= +range[0] && value < +range[1];
    });
    const cardsLength = await mainPage.TripCards.length;

    expect(cardsLength).toEqual(results.length);
  });
});
