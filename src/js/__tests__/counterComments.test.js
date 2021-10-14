import { populateCounter, countComments } from '../counterComments.js';

describe('Testing Counter 2 items', () => {
  const modalMock = document.createElement('div');
  modalMock.classList.add('modal');
  modalMock.innerHTML = `s
  <p id="cont-comments"> </p>
  <p>
  UserName:  comment <br>
  <span class="valid-comments">2021-10-14<span>
  </p>
  <p>
  UserName:  comment <br>
  <span class="valid-comments">2021-10-14<span>
  </p>`;
  test('Test CounterComments', () => {
    expect(countComments(modalMock)).toBe(2);
  });
  test('Testing PopulateCounter', () => {
    populateCounter(modalMock);
    expect(modalMock.querySelector('#cont-comments').innerText).toBe('2 comments');
  });
});

describe('Testing Counter 0 items', () => {
  const modalMock = document.createElement('div');
  modalMock.classList.add('modal');
  modalMock.innerHTML = `s
  <p id="cont-comments"> </p>
  <p>
  </p>`;
  test('Test CounterComments', () => {
    expect(countComments(modalMock)).toBe(0);
  });
  test('Testing PopulateCounter', () => {
    populateCounter(modalMock);
    expect(modalMock.querySelector('#cont-comments').innerText).toBe('0 comments');
  });
});