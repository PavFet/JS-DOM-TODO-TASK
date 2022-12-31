class DoneAndUpdateComponent {
  htmlElement;

  constructor() {
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'd-flex justify-content-between';
    this.htmlElement.innerHTML = `
    <h6>DONE</h6>
  <h6>UPDATE ACTIONS</h6>
    `
  }
}

export default DoneAndUpdateComponent;