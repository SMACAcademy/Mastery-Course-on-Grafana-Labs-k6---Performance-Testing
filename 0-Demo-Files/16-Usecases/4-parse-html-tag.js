import { parseHTML } from 'k6/html';
import { sleep } from 'k6';

export default function () {
  const content = `
<dl>
  <dt id="term-1">Value term 1</dt>
  <dt id="term-2">Value term 2</dt>
</dl>
  `;
  const sel = parseHTML(content).find('dl').children();

  const el1 = sel.get(0);
  const el2 = sel.get(1);

  console.log(el1.nodeName());
  console.log(el1.id());
  console.log(el1.textContent());

  console.log(el2.nodeName());
  console.log(el2.id());
  console.log(el2.textContent());

  sleep(1);
}
