const variables = require('./variables.scss');

const createTitle = (titleText) => {
  const text = document.createTextNode(titleText);
  const el = document.createElement('h1');
  el.setAttribute('style', `color: ${variables.brandColor};`); // defined in scss
  el.appendChild(text);
  return el;
};

const createSuccessAlert = (alertText) => {
  const text = document.createTextNode(alertText);
  const message = document.createElement('p');
  message.appendChild(text);
  const el = document.createElement('div');
  el.setAttribute('style', `background-color: ${variables.successColor};`); // defined in scss
  el.appendChild(message);
  return el;
};

const createHero = () => {
  const img = document.createElement('img');
  img.setAttribute('src', variables.heroImage); // defined in scss
  return img;
};

const createApp = (titleText, alertText) => {
  const title = createTitle(titleText);
  const alert = createSuccessAlert(alertText);
  const hero = createHero();
  const container = document.createElement('div');
  container.appendChild(title);
  container.appendChild(alert);
  container.appendChild(hero);
  return container;
};

const renderApp = () => {
  document.body.appendChild(createApp());
};

module.exports.createTitle = createTitle;
module.exports.createSuccessAlert = createSuccessAlert;
module.exports.createHero = createHero;
module.exports.createApp = createApp;
module.exports.renderApp = renderApp;
