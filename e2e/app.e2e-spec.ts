import { NgrxStoreExamplePage } from './app.po';

describe('ngrx-store-example App', () => {
  let page: NgrxStoreExamplePage;

  beforeEach(() => {
    page = new NgrxStoreExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
