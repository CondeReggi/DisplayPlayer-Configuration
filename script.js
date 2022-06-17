let divs = [];
document.addEventListener(
  'DOMContentLoaded',
  function () {
    divs.push(document.getElementById('uno'));
    divs.push(document.getElementById('dos'));
    divs.push(document.getElementById('tres'));
    divs.push(document.getElementById('cuatro'));
    divs.map((x) => {
      let arr = [];
      arr.push('{');
      arr.push('&nbsp; Url: Any');
      arr.push('&nbsp; Height: ' + x.clientHeight + 'px');
      arr.push('&nbsp; Width: ' + x.clientWidth + 'px');
      arr.push('&nbsp; Top: ' + x.clientTop + 'px');
      arr.push('&nbsp; Left: ' + x.clientLeft + 'px');
      arr.push('}');
      x.childNodes[1].innerHTML = arr.join('<br>');
      return;
    });
  },
  false
);
