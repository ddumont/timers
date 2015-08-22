if (
  !window.Worker ||
  !("classList" in document.createElement("_"))
) {
  document.body.className = "unsupported";
}
