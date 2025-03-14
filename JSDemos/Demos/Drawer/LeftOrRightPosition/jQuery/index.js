$(() => {
  $('#content').html(text);

  const drawer = $('#drawer').dxDrawer({
    opened: true,
    height: 400,
    closeOnOutsideClick: true,
    template() {
      const $list = $('<div>').width(200).addClass('panel-list');

      return $list.dxList({
        dataSource: navigation,
        hoverStateEnabled: false,
        focusStateEnabled: false,
        activeStateEnabled: false,
        elementAttr: { class: 'dx-theme-accent-as-background-color' },
      });
    },
  }).dxDrawer('instance');

  $('#toolbar').dxToolbar({
    items: [{
      widget: 'dxButton',
      location: 'before',
      options: {
        icon: 'menu',
        onClick() {
          drawer.toggle();
        },
      },
    }],
  });

  $('#reveal-mode').dxRadioGroup({
    items: ['slide', 'expand'],
    layout: 'horizontal',
    value: 'slide',
    onValueChanged(e) {
      drawer.option('revealMode', e.value);
    },
  });

  $('#opened-state-mode').dxRadioGroup({
    items: ['push', 'shrink', 'overlap'],
    layout: 'horizontal',
    value: 'shrink',
    onValueChanged(e) {
      drawer.option('openedStateMode', e.value);
      $('#reveal-mode-option').css('visibility', e.value !== 'push' ? 'visible' : 'hidden');
    },
  });

  $('#position-mode').dxRadioGroup({
    items: ['left', 'right'],
    layout: 'horizontal',
    value: 'left',
    onValueChanged(e) {
      drawer.option('position', e.value);
    },
  });
});
