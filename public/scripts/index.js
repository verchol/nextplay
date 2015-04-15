$(function() {
  'use strict';

  var $greatings = $('.js-page-greatings');
  var $camera = $('.js-page-camera');
  var $person = $('.js-page-person');
  var $thanks = $('.js-page-thanks');
  var photo;

  function init() {
    $greatings
      .removeClass('hidden')
      .addClass('animated fadeOut')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', onInit);
  }

  function onInit() {
    $greatings.addClass('hidden');
    showCameraPage();
  }

  function onTakePhoto() {
    photo = 'data:image/png;base64,' + $.scriptcam.getFrameAsBase64();

    $camera.addClass('hidden');
    shopPersonPage();
  }

  function onClickPersonBackBtn() {
    $person.addClass('hidden');
    showCameraPage();
  }

  function onClickPersonSaveBtn() {
    function onComplete() {
      $person.addClass('hidden');
      showThanksPage();
    }

    $.post('/trivia/photo', { photo: photo }, onComplete);
  }

  function showCameraPage() {
    $camera.removeClass('hidden');

    $('.js-take-photo-btn').off('click', onTakePhoto).on('click', onTakePhoto);
  }

  function shopPersonPage() {
    $person.removeClass('hidden');

    $('.js-person-photo').attr('src', photo);

    $('.js-person-save-btn')
      .off('click', onClickPersonBackBtn)
      .on('click', onClickPersonBackBtn);

    $('.js-person-back-btn')
      .off('click', onClickPersonSaveBtn)
      .on('click', onClickPersonSaveBtn);
  }

  function showThanksPage() {
    $thanks.removeClass('hidden');
  }

  $('#js-camera').scriptcam({
    path                : '../scripts/scriptcam/',
    width               : 400,
    height              : 500,
    showMicrophoneErrors: false,
    cornerRadius        : 0
  });

  setTimeout(init, 3000);
});
