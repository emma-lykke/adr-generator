// Plugin main thread — runs in Figma's sandboxed environment.
// Has access to figma.* API but no fetch/DOM.

figma.showUI(__html__, { width: 480, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "get-selection") {
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.ui.postMessage({ type: "error", text: "Vælg en frame eller et lag først." });
      return;
    }

    const node = selection[0];
    figma.ui.postMessage({
      type: "selection",
      nodeId: node.id,
      nodeName: node.name,
      fileKey: figma.fileKey || null,
    });
  }

  if (msg.type === "close") {
    figma.closePlugin();
  }
};
