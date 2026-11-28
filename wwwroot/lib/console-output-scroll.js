"use strict";
let observer;
let isObserving = false;
const config = { childList: true };
const callback = function (mutationsList) {
    const targetNode = document.getElementById('console-container');
    if (!targetNode) {
        console.warn("console-container does not exist for some reason");
        return;
    }
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            targetNode.scrollTop = targetNode.scrollHeight;
        }
    }
};
function toggleConsoleOutputBehavior() {
    const targetNode = document.getElementById('console-container');
    if (!targetNode) {
        return;
    }
    if (isObserving) {
        observer.disconnect();
    }
    else {
        observer = new MutationObserver(callback);
        if (targetNode) {
            observer.observe(targetNode, config);
        }
    }
    isObserving = !isObserving;
}
//# sourceMappingURL=console-output-scroll.js.map