import { $ } from 'jquery';

(document).ready(() => {
  $('.trigger').click(() => {
    $('.menu').toggleClass('active');
  });
});
