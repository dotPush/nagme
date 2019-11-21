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
                form.reset();
                document.activeElement.blur();
            }
            catch (err) {
                // App will show error, this catch keeps form from clearing
            }
        });
    }

    renderHTML() {
        return /*html*/`
 
       
        <form class="add-nag-form">
        <p>
            <label for="nag-name">Nag Name</label>
            <input
                type="text"
                id="nag-name"
                name="nag-name"
                placeholder="Add Nag Name"
                required>
        </p>
        <p>
            <label for="notes">Notes</label>
            <textarea
                id="notes"
                name="notes"
                placeholder="Add Notes">
            </textarea>
        </p>
        <p>
            <label for="startTime">Start Time</label>
            <input
                type="time"
                id="startTime"
                name="startTime"
                value="12:00"
                required>
        </p>
        <p>
            <label for="interval">Interval (in minutes)</label>
            <input
           
                type="number"
                id="interval"
                name="interval"
                min="1"
                max="60"
                required>

        </p>
        <input id="submit" type="submit" value="Add Nag">
       
    </form>

 
        `;
    }
}

export default AddNag;