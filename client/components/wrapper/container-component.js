class ContainerComponent {
  htmlElement;

  constructor(children) {
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'container  mt-4 bg-light py-2 rounded';
    this.htmlElement.append(...children)
  }
}

export default ContainerComponent;