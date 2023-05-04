function renderNavBar(navbarId, exampleUri) {
  const navbar = $(navbarId).get(0);

  const menuContent = document.createElement("ul");
  navbar.appendChild(menuContent);

  const menuButton = document.createElement("a");
  menuButton.href = "#";
  menuButton.classList.add("button-collapse", "show-on-large");
  menuButton.setAttribute("data-activates", "slide-out");
  navbar.appendChild(menuButton);
}
