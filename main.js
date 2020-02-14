

window.addEventListener("load", function (event) {

  function shouldRevert(dropped, droppedOn) {
    if (droppedOn === false) {
      return true;

    } else {

      var droppableId = parseInt(droppedOn.attr('data-id'), 10);
      var draggableId = parseInt(dropped.attr('data-id'), 10);

      var bothEven = draggableId % 2 == 0 && droppableId % 2 == 0;
      var bothOdd = draggableId % 2 != 0 && droppableId % 2 != 0;

      if (bothEven || bothOdd) {
        return false;
      } else {
        return true;
      }
    }
  }

  $(".transport").draggable({
    cursor: "crosshair",
    revert: function (droppableObj) {
      return shouldRevert($(this), $(droppableObj));
    }
  });

  $(".bay").droppable({
    accept: ".transport",

    drop: function (event, ui) {
      $(this).removeClass("border").removeClass("over");
      var dropped = $(ui.draggable);
      var droppedOn = $(this);

      var revert = shouldRevert(dropped, droppedOn);
      if (!revert) {
        dropped.detach().css({ top: 0, left: 0 }).appendTo(droppedOn);
      }
    },

    over: function (event, elem) {
      $(this).addClass("over");
    },

    out: function (event, elem) {
      $(this).removeClass("over");
    },


  });

  $("#drop").sortable();

  $(".sidebar").droppable({
    accept: ".transport", drop: function (event, ui) {
      $(this).removeClass("border").removeClass("over");
      var dropped = ui.draggable;
      var droppedOn = $(this);
      $(dropped).detach().css({ top: 0, left: 0 }).appendTo(droppedOn);
    }
  });

});
