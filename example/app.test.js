const { createApp, createSuccessAlert, createTitle, createHero } = require('./app');

describe('app:', () => {
  describe('createTitle', () => {
    it('matches the snapshot', () => {
      const result = createTitle('My Test App');
      expect(result).toMatchSnapshot();
    });
  });

  describe('createSuccessAlert', () => {
    it('matches the snapshot', () => {
      const result = createSuccessAlert('Test success alert message');
      expect(result).toMatchSnapshot();
    });
  });

  describe('createHero', () => {
    it('matches the snapshot', () => {
      const result = createHero();
      expect(result).toMatchSnapshot();
    });
  });

  describe('createApp', () => {
    it('matches the snapshot', () => {
      const result = createApp('My Test App', 'Test success alert message');
      expect(result).toMatchSnapshot();
    });
  });
});
