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

export function onElementAddedAsync(selector: string) {
  return new Promise((resolve: (ele: HTMLElement[]) => any) => {
    const observer = new MutationObserver(mutations => {
      mutations
        .filter(mutationRecord => mutationRecord.target.nodeType === Node.ELEMENT_NODE)
        .forEach(mutationRecord => {
          const targetEle = mutationRecord.target as HTMLElement
          console.log(mutationRecord)

          const courseContainerEle : HTMLElement[] = Array.from(targetEle.querySelectorAll(selector))
          // debugger
          if (courseContainerEle.length) {

            resolve(courseContainerEle);
          } else {




          Array.from(mutationRecord.addedNodes)
            .filter(addedNode => addedNode.nodeType === 1)
            .forEach(addedNode => {
              const ele = addedNode as Element
              const courseContainerEle : HTMLElement[] = Array.from(ele.querySelectorAll(selector))
              // debugger
              if (!courseContainerEle.length) return
              console.log('added')

              resolve(courseContainerEle)
            })
          }
        })

    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  })
}
