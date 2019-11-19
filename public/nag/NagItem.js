import Component from '../Component.js';

class NagItem extends Component {

    onRender(dom) {
        const { nag, onUpdate, onRemove } = this.props;
        const checkbox = dom.querySelector('.checkbox');
        checkbox.addEventListener('click', () => {
            nag.complete = !nag.complete;
            onUpdate(nag);
        });
        
        const removeSpan = dom.querySelector('.close');
        removeSpan.addEventListener('click', () => {
            confirm(`Are you sure you want to remove "${nag.task}"?`) &&
            onRemove(nag);
        });
    }

    renderHTML() {
        const { nag } = this.props;
        return /*html*/`
            <li>
                <p>
                    <span class="checkbox"><input type="checkbox" name="checkbox" value="done" ${nag.complete && 'checked'}></span>
                    <span class="task-span${nag.complete && '-strikethrough'}">${nag.task} ${nag.list_id}</span>
                    <span class="close">x</span>
                </p>
            </li>
        `;
    }
}

export default NagItem;
