
const refactorNums = (tableId) => {
  $(`#${tableId} td:nth-child(1)`).each((item, value) => {
    $(value).html(item+1);
  });
}

const dropAndDown = (tableId) => {

  $(`#${tableId} tbody`).sortable({
      start: function (e, ui) {
          let elements = ui.item.siblings('.selected.hidden').not('.ui-sortable-placeholder');
          ui.item.data('items', elements);
          ui.item.addClass("selected");

      },
      update: function (e, ui) {
          ui.item.after(ui.item.data("items"));
          ui.item.removeClass("selected");

      },
      stop: function (e, ui) {
          ui.item.siblings('.selected').removeClass('hidden');
          $('tr.selected').removeClass('selected');
          refactorNums(tableId);  
      }
  });

}

const copy = (item) => {
  const tr = item.parentNode.parentNode;
  const clone = tr.cloneNode(true);
  const tbody = tr.parentNode;
  tbody.insertBefore(clone, tr.nextElementSibling);
  refactorNums(tbody.parentNode.id);
}

const del = (item) => {
  const tr = item.parentNode.parentNode;
  const tbody = tr.parentNode;
  if (tbody.rows.length > 1)
    tbody.removeChild(tr); 
  refactorNums(tbody.parentNode.id);
}

(() => {
  dropAndDown('cartTable');
  dropAndDown('cartTable2');
})();
