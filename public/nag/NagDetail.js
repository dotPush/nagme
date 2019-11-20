import Component from '../component.js';

class NagDetail extends Component {
    renderHTML() {
        const { nag } = this.props;
        const json = JSON.stringify(nag, true, 4);
        return /* html */`
            <pre>${json}</pre>
        `;
    }
}

export default NagDetail;