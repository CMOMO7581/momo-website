function selectNode(node: Node) {
  const r = document.createRange();
  r.selectNodeContents(node);
  const s = getSelection();
  if (!s) return;
  s.removeAllRanges();
  s.addRange(r);
}

// Copies text and briefly relabels the button; if the clipboard is blocked, selects the text instead.
export function copyText(
  text: string,
  button: HTMLButtonElement,
  node: Node | null,
  labels: { copied: string; selected: string },
) {
  const orig = button.textContent;
  const done = () => {
    button.textContent = labels.copied;
    setTimeout(() => { button.textContent = orig; }, 1400);
  };
  const fail = () => {
    if (node) selectNode(node);
    button.textContent = labels.selected;
  };
  try { navigator.clipboard.writeText(text).then(done, fail); } catch { fail(); }
}
