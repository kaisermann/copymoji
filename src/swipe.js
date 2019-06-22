let firstTouch;
let lastTouch;

const getTouch = e => [e.touches[0].clientX, e.touches[0].clientY];

const listeners = {
  handleEvent(e) {
    return this[`on${e.type}`](e);
  },
  ontouchstart(e) {
    firstTouch = getTouch(e);
  },
  ontouchmove(e) {
    lastTouch = getTouch(e);
  },
  ontouchend() {
    if (!firstTouch || !lastTouch) return;

    const [xDiff, yDiff] = [
      firstTouch[0] - lastTouch[0],
      firstTouch[1] - lastTouch[1],
    ];

    if (
      Math.abs(yDiff) < window.innerHeight / 4 &&
      Math.abs(xDiff) >= window.innerWidth / 3 &&
      Math.abs(xDiff) > Math.abs(yDiff)
    ) {
      if (xDiff > 0) {
        window.location.hash = 'recently';
      } else {
        window.location.hash = 'main';
      }
    }
    firstTouch = null;
    lastTouch = null;
  },
};

export default function() {
  document.addEventListener('touchstart', listeners);
  document.addEventListener('touchmove', listeners);
  document.addEventListener('touchend', listeners);
}
