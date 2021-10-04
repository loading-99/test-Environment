import $ from 'jquery';

document.querySelector('body');

$(document).ready(() => {
  $('.trigger').click(() => {
    $('.menu').toggleClass('active');
  });
});
