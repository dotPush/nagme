import Component from '../Component.js';
import NagItem from './NagItem.js';

class NagList extends Component {

    onRender(list) {
        this.props.nags
            .forEach(nag => list
                .appendChild(
                    new NagItem({ nag, ...this.props })
                        .renderDOM()
                )
            ); // not sure if my refactor here is better or just uglier
    }
    renderHTML() {
        return /*html*/`
            <ul class="nags-ul"></ul>
        `;
    }
}

export default NagList;
