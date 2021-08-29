export function changeInputValue(input: HTMLInputElement, value: string | number) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )?.set;

  nativeInputValueSetter?.call(input, value);

  const inputEvent = new Event("input", {bubbles: true});
  input.dispatchEvent(inputEvent);
}

export function waitForElmAsync(selector: string) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}
