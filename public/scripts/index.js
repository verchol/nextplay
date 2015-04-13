$(function() {
  'use strict';

  var $greatings = $('.js-page-greatings');
  var $camera = $('.js-page-camera');
  var $crop = $('.js-page-crop');
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
    shopCropPage();
  }

  function onClickBackBtn() {
    $crop.addClass('hidden');
    $('#js-crop').cropper('destroy');
    showCameraPage();
  }

  function onClickCropBtn() {
    var canvas = $('#js-crop').cropper('getCroppedCanvas');

    photo = canvas.toDataURL();

    $crop.addClass('hidden');
    $('#js-crop').cropper('destroy');
    shopPersonPage();
  }

  function onClickSkipBtn() {
    $crop.addClass('hidden');
    $('#js-crop').cropper('destroy');
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

  function shopCropPage() {
    $crop.removeClass('hidden');

    $('#js-crop')
      .attr('src', photo)
      .cropper({
        aspectRatio: 4 / 5,
        autoCropArea: 0.65,
        strict: true,
        mouseWheelZoom: false
      });

    $('.js-crop-back-btn').off('click', onClickBackBtn).on('click', onClickBackBtn);
    $('.js-crop-btn').off('click', onClickCropBtn).on('click', onClickCropBtn);
    $('.js-crop-skip-btn').off('click', onClickSkipBtn).on('click', onClickSkipBtn);
  }

  function shopPersonPage() {
    $person.removeClass('hidden');

    $('.js-person-photo').attr('src', photo);

    $('.js-person-back-btn')
      .off('click', onClickPersonBackBtn)
      .on('click', onClickPersonBackBtn);

    $('.js-person-save-btn')
      .off('click', onClickPersonSaveBtn)
      .on('click', onClickPersonSaveBtn);
  }

  function showThanksPage() {
    $thanks.removeClass('hidden');

    setTimeout(function() {
      $thanks.addClass('hidden');
      showCameraPage();
    }, 5000);
  }

  $('#js-camera').scriptcam({
    path                : '../scripts/scriptcam/',
    width               : 640,
    height              : 480,
    showMicrophoneErrors: false,
    cornerRadius        : 0
  });

  setTimeout(init, 3000);
});
