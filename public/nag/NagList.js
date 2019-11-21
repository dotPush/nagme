import Component from '../Component.js';
import NagItem from './NagItem.js';

class NagList extends Component {
    
    onRender(list) {
        const { nags, onUpdate, onRemove } = this.props;
        nags
            .map(nag => new NagItem({ nag, onUpdate, onRemove }))
            .map(nagItem => nagItem.renderDOM())
            .forEach(dom => list.appendChild(dom));
    }
    renderHTML() {
        return /*html*/`
            <ul class="nags-ul"></ul>
        `;
    }
}

export default NagList;
