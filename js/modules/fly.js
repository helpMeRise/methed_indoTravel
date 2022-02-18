const docEl = document.documentElement;
const fly = document.createElement('div');

fly.style.cssText = `
  position: fixed;
  bottom: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background: url('../../img/airplane.svg') center/contain no-repeat;
`;

if (docEl.clientWidth >= 758) document.body.append(fly);

const flyPosition = () => {
  const maxUp = docEl.clientHeight - fly.clientHeight;
  const maxScroll = docEl.scrollHeight - docEl.clientHeight;
  const percentageScroll = (window.pageYOffset * 100) / maxScroll;
  const up = -maxUp * (percentageScroll / 100);

  fly.style.transform = `translateY(${up}px)`;
};

window.addEventListener('scroll', () => {
  requestAnimationFrame(flyPosition);
});

