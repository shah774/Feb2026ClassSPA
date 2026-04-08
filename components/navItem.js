import html from 'html-literal';

export default item => html`
<li><a href="${item.url}">${item.text}</a></li>
`