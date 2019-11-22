import Component from '../Component.js';

class AddNag extends Component {

    onRender(form) {
        const { onAdd, onRemove, loadNag } = this.props;
        console.log('loadNag', loadNag);
        const myTextArea = form.querySelector('textarea');
        loadNag && (myTextArea.value = loadNag.notes);

        form.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(form);//add or update

            const nag = {
                id: formData.get('hidden-id'),
                task: formData.get('nag-name'),
                notes: formData.get('notes'),
                startTime: formData.get('start-time'),
                endTime: formData.get('end-time'),
                interval: parseInt(formData.get('interval')),
                minutesAfterHour: !formData.get('mah-checked') && formData.get('minutes-after-hour'),
                mon: !!formData.get('mon'),
                tue: !!formData.get('tue'),
                wed: !!formData.get('wed'),
                thu: !!formData.get('thu'),
                fri: !!formData.get('fri'),
                sat: !!formData.get('sat'),
                sun: !!formData.get('sun'),
                recurs: form.elements['recurs'][0].checked || false,
                period: 'm',
            };
            console.log('formNag', nag);
            try {
                if (nag.id) {
                    await onRemove(nag);
                }

                await onAdd(nag);

                document.activeElement.blur();
            }
            catch (err) {
                // App will show error, this catch keeps form from clearing
            }
            finally {
                this.update({ loadNag: {
                    task: '',
                    notes: '',
                } });
            }
        });
    }

    renderHTML() {
        const loadNag = this.props.loadNag; 
        return /*html*/`
            <form class="add-nag-form">
                <div class = "add-nag-div">
                    <p>
                        <label for="nag-name">Nag Name</label>
                        <input
                            type="text"
                            id="nag-name"
                            name="nag-name"
                            placeholder="Add Nag Name"
                            value="${loadNag ? loadNag.task : ''}"
                            required>
                    </p>
                    <br>
                    <p>
                        <label for="notes">Notes</label>
                        <textarea
                            id="notes"
                            name="notes"

                            value="${loadNag ? loadNag.notes : ''}"

                            placeholder="Add Notes"></textarea>
                    </p>
                    <br>
                    <p>
                        <label for="startTime">Start Time</label>
                        <input
                            type="time"
                            id="start-time"
                            name="start-time"
                            value="${loadNag ? loadNag.startTime : '12:00:00'}"
                            required>
                    </p>
                    <p>
                        <label for="endTime">End Time</label>
                        <input
                            type="time"
                            id="end-time"
                            name="end-time"
                            value="${loadNag ? loadNag.endTime : ''}">
                    </p>
                    <br>
                    <p>
                        <label for="interval">Interval (in minutes)</label>
                        <input
                            type="number"
                            id="interval"
                            name="interval"
                            min="1"
                            max="720"
                            value="${loadNag ? loadNag.interval : ''}"
                            required>

                    </p>
                    <p>
                        <label for="minutes-after-hour">Minutes after the hour</label>
                        <input
                            type="number"
                            id="minutes-after-hour"
                            name="minutes-after-hour"
                            min="0"
                            max="59"
                            value="${loadNag ? loadNag.minutesAfterHour : ''}">
                            <input type="checkbox" name="mah-checked" value="mah-checked">
                    </p>
                    <p>
                        <input
                            type="hidden"
                            name="hidden-id"
                            value="${loadNag ? loadNag.id : ''}"
                            required>
                    </p>
                    <fieldset><legend>Days of week</legend>
                        <input type="checkbox" name="mon" value="mon" ${loadNag && loadNag.mon && 'checked'}>Monday<br>
                        <input type="checkbox" name="tue" value="tue" ${loadNag && loadNag.tue && 'checked'}>Tueday<br>
                        <input type="checkbox" name="wed" value="wed" ${loadNag && loadNag.wed && 'checked'}>Wednesday<br>
                        <input type="checkbox" name="thu" value="thu" ${loadNag && loadNag.thu && 'checked'}>Thursday<br>
                        <input type="checkbox" name="fri" value="fri" ${loadNag && loadNag.fri && 'checked'}>Friday<br>
                        <input type="checkbox" name="sat" value="sat" ${loadNag && loadNag.sat && 'checked'}>Saturday<br>
                        <input type="checkbox" name="sun" value="sun" ${loadNag && loadNag.sun && 'checked'}>Sunday<br>
                    </fieldset>
                    Is this a recurring task?
                    <input type="radio" name="recurs" value="true" ${loadNag && loadNag.recurs && 'checked'}>Yes
                    <input type="radio" name="recurs" value="false" ${(!loadNag || (loadNag && !loadNag.recurs)) && 'checked'}>No<br>
                    <button class="save-button" type="submit" name='action'>Save</button>
                    <input type="reset" value="Clear" />
                </div>
            </form>
        `;
    }
}

export default AddNag;