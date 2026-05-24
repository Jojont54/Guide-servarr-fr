document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".content pre").forEach(function (block) {
    var wrapper = document.createElement("div");
    var button = document.createElement("button");

    wrapper.className = "code-block";
    button.className = "copy-button";
    button.type = "button";
    button.textContent = "Copier";
    button.setAttribute("aria-label", "Copier le contenu du bloc");

    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(button);
    wrapper.appendChild(block);

    button.addEventListener("click", function () {
      var text = block.innerText;
      var onSuccess = function () {
        button.textContent = "Copié";
        button.classList.add("is-copied");
        window.setTimeout(function () {
          button.textContent = "Copier";
          button.classList.remove("is-copied");
        }, 1600);
      };
      var copyFallback = function () {
        var input = document.createElement("textarea");
        input.value = text;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        onSuccess();
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(copyFallback);
      } else {
        copyFallback();
      }
    });
  });
});
