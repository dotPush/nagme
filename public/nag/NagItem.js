import Component from '../Component.js';

class NagItem extends Component {

    //onRender(dom) {
        // const { nag, onUpdate, onRemove } = this.props;
        // const checkbox = dom.querySelector('.checkbox');
        // checkbox.addEventListener('click', () => {
        //     nag.complete = !nag.complete;
        //     onUpdate(nag);
        // });
        
        // const removeSpan = dom.querySelector('.close');
        // removeSpan.addEventListener('click', () => {
        //     confirm(`Are you sure you want to remove "${nag.task}"?`) &&
        //     onRemove(nag);
        // });
    //}

    renderHTML() {
        const { nag } = this.props;
        return /*html*/`
            <li id="${nag.id}">
                <p>
                    <!-- <span class="checkbox"><input type="checkbox" name="checkbox" value="done" ${nag.complete && 'checked'}></span> -->
                    <!-- <span class="task-span${nag.complete && '-strikethrough'}">${nag.task}</span> -->
                    <span class="task-span">${nag.task}</span>
                    <!-- <span class="close">x</span> -->
                </p>
                <p class="notes-span" hidden>${nag.notes}</p>
            </li>
        `;
    }
}

export default NagItem;
