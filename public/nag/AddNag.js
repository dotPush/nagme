import Component from '../Component.js';

class AddNag extends Component {

    onRender(form) {
        const { onAdd } = this.props;
        
        form.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(form);

            const nag = {
                task: formData.get('nag-name'),
                notes: formData.get('notes'),
                startTime: formData.get('startTime'),
                interval: parseInt(formData.get('interval')),
                period: 'm',
            };

            try {
                await onAdd(nag);
                // could redirect to detail page here
                // this only runs if no error:
                form.reset();
                document.activeElement.blur();
            }
            catch (err) {
                // nothing to do as App will show error,
                // but will keep form from clearing...
            }
        });
    }

    renderHTML() {
        return /*html*/`
        <form class="add-nag-form">

        <p>
            <label for="nag-name">Nag Name</label>
            <input id="nag-name" name="nag-name" required placeholder="Add Nag Name">
        </p>

        <p>
            <label for="notes">Notes</label>
            <textarea id="notes" name="notes" required placeholder="Add Notes"></textarea>
        </p>

        <p>
            <label for="startTime">Start Time</label>
            <input type="time" id="startTime" name="startTime" required value="12:00">
        </p>

        <p>
            <label for="interval">Interval (in minutes)</label>
            <input type="number" id="text" name="interval" min="1" max="60" required>
        </p>

        <input type="submit" value="Add Nag">
    </form>
        `;
    }
}

export default AddNag;