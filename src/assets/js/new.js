class MyPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
       <div>My Page</div>`;
  }
}
customElements.define("my-page", MyPage);
