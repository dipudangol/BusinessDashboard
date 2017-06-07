import { FirebaseAnglarPage } from './app.po';

describe('firebase-anglar App', () => {
  let page: FirebaseAnglarPage;

  beforeEach(() => {
    page = new FirebaseAnglarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
